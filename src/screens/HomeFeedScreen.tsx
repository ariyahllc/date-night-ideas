import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { useFilters } from '../context/FiltersContext';
import { useSaved } from '../context/SavedContext';
import { SwipeDeck, SwipeDeckHandle } from '../components/SwipeDeck';
import { DateCard } from '../components/DateCard';
import { Button } from '../components/Button';
import { CloseIcon, FilterIcon, HeartIcon, InfoIcon, PinIcon } from '../components/Icons';
import { MainTabScreenProps } from '../navigation/types';
import { DateIdea } from '../types';

export function HomeFeedScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { colors } = useTheme();
  const { filteredIdeas, activeCount } = useFilters();
  const { save } = useSaved();
  const deckRef = useRef<SwipeDeckHandle>(null);
  const [topIdea, setTopIdea] = useState<DateIdea | undefined>(filteredIdeas[0]);

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.wordmark, { color: colors.textPrimary }]}>Ember</Text>
        <View style={styles.headerActions}>
          <View style={[styles.pillBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
            <PinIcon size={14} color={colors.tagText} />
            <Text style={[styles.pillText, { color: colors.textSecondary }]}>Within 5 mi</Text>
          </View>
          <Pressable
            style={[styles.iconBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
            onPress={() => navigation.navigate('Filters')}
          >
            <FilterIcon size={16} color={colors.plum700} />
            {activeCount > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.coral500 }]}>
                <Text style={styles.badgeText}>{activeCount}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      <View style={styles.stackWrap}>
        <SwipeDeck
          ref={deckRef}
          ideas={filteredIdeas}
          renderCard={(idea) => <DateCard idea={idea} />}
          onTopChange={setTopIdea}
          onSwipeLeft={() => {}}
          onSwipeRight={(idea) => save(idea.id)}
          renderEmpty={() => (
            <View style={styles.empty}>
              <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>That's everything nearby</Text>
              <Text style={[styles.emptyBody, { color: colors.textSecondary }]}>
                Try widening your filters, or check your Date Jar for what you've already saved.
              </Text>
              <Button label="Adjust filters" variant="ghost" onPress={() => navigation.navigate('Filters')} />
            </View>
          )}
        />
      </View>

      <View style={styles.actionRow}>
        <Pressable
          style={[styles.actionBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
          onPress={() => deckRef.current?.swipeLeft()}
        >
          <CloseIcon size={22} color={colors.coral500} />
        </Pressable>
        <Pressable
          style={[styles.actionBtn, styles.infoBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
          onPress={() => {
            if (topIdea) navigation.navigate('Detail', { ideaId: topIdea.id });
          }}
        >
          <InfoIcon size={18} color={colors.plum700} />
        </Pressable>
        <Pressable style={[styles.actionBtn, styles.saveBtn]} onPress={() => deckRef.current?.swipeRight()}>
          <HeartIcon size={22} color="#2B1620" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  wordmark: { fontSize: 22, fontWeight: '800', letterSpacing: -0.4 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  pillBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, height: 36, paddingHorizontal: 12, borderRadius: 999, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10, elevation: 2 },
  pillText: { fontSize: 13, fontWeight: '700' },
  iconBtn: { width: 36, height: 36, borderRadius: 999, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10, elevation: 2 },
  badge: { position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16, borderRadius: 999, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 },
  badgeText: { color: '#FBF6F3', fontSize: 10, fontWeight: '800' },
  stackWrap: { flex: 1, marginHorizontal: 20, marginTop: 8 },
  actionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, paddingVertical: 16 },
  actionBtn: { width: 56, height: 56, borderRadius: 999, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 1, shadowRadius: 14, elevation: 4 },
  infoBtn: { width: 44, height: 44, alignSelf: 'center' },
  saveBtn: { backgroundColor: '#E8A33D', shadowColor: 'rgba(232,115,95,0.5)', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 1, shadowRadius: 16, elevation: 5 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '800' },
  emptyBody: { fontSize: 14, fontWeight: '500', textAlign: 'center', lineHeight: 20 },
});
