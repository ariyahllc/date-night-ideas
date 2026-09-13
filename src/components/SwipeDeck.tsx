import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Animated, PanResponder, StyleSheet, View, Dimensions } from 'react-native';
import { DateIdea } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.28;
const SWIPE_OUT_DURATION = 220;

export interface SwipeDeckHandle {
  swipeLeft: () => void;
  swipeRight: () => void;
}

interface Props {
  ideas: DateIdea[];
  renderCard: (idea: DateIdea) => React.ReactNode;
  onSwipeLeft: (idea: DateIdea) => void;
  onSwipeRight: (idea: DateIdea) => void;
  onTopChange?: (idea: DateIdea | undefined) => void;
  renderEmpty: () => React.ReactNode;
}

/** A Tinder-style card stack: drag the top card, or call swipeLeft/swipeRight via ref. */
export const SwipeDeck = forwardRef<SwipeDeckHandle, Props>(function SwipeDeck(
  { ideas, renderCard, onSwipeLeft, onSwipeRight, onTopChange, renderEmpty },
  ref,
) {
  const [index, setIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  // Reset to the top of the deck whenever the underlying list changes shape
  // (e.g. filters change) so we never point past the end of a shorter list.
  useEffect(() => {
    setIndex(0);
    position.setValue({ x: 0, y: 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ideas]);

  useEffect(() => {
    onTopChange?.(ideas[index]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, ideas]);

  function forceSwipe(direction: 'left' | 'right') {
    const x = direction === 'right' ? SCREEN_WIDTH * 1.4 : -SCREEN_WIDTH * 1.4;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION,
      useNativeDriver: false,
    }).start(() => onSwipeComplete(direction));
  }

  function onSwipeComplete(direction: 'left' | 'right') {
    const idea = ideas[index];
    position.setValue({ x: 0, y: 0 });
    setIndex((i) => i + 1);
    if (idea) {
      if (direction === 'right') onSwipeRight(idea);
      else onSwipeLeft(idea);
    }
  }

  function resetPosition() {
    Animated.spring(position, { toValue: { x: 0, y: 0 }, friction: 6, useNativeDriver: false }).start();
  }

  useImperativeHandle(ref, () => ({
    swipeLeft: () => forceSwipe('left'),
    swipeRight: () => forceSwipe('right'),
  }));

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 4 || Math.abs(g.dy) > 4,
        onPanResponderMove: Animated.event([null, { dx: position.x, dy: position.y }], { useNativeDriver: false }),
        onPanResponderRelease: (_, g) => {
          if (g.dx > SWIPE_THRESHOLD) forceSwipe('right');
          else if (g.dx < -SWIPE_THRESHOLD) forceSwipe('left');
          else resetPosition();
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index],
  );

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  if (index >= ideas.length) {
    return <View style={styles.stack}>{renderEmpty()}</View>;
  }

  const visible = ideas.slice(index, index + 3);

  return (
    <View style={styles.stack}>
      {visible
        .map((idea, i) => {
          const isTop = i === 0;
          if (isTop) {
            return (
              <Animated.View
                key={idea.id}
                style={[styles.cardLayer, { transform: [...position.getTranslateTransform(), { rotate }] }]}
                {...panResponder.panHandlers}
              >
                {renderCard(idea)}
              </Animated.View>
            );
          }
          const scale = 1 - i * 0.05;
          const translateY = i * 12;
          return (
            <View
              key={idea.id}
              style={[styles.cardLayer, { transform: [{ scale }, { translateY }], opacity: 1 - i * 0.25 }]}
              pointerEvents="none"
            >
              {renderCard(idea)}
            </View>
          );
        })
        .reverse()}
    </View>
  );
});

const styles = StyleSheet.create({
  stack: { flex: 1 },
  cardLayer: { position: 'absolute', left: 0, right: 0, top: 0 },
});
