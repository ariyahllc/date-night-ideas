import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Path } from 'react-native-svg';
import { useTheme } from '../theme/ThemeProvider';
import { PinIcon } from './Icons';

/** A stylized abstract map — no network tiles, just enough geography to read as "location". */
export function MapPlaceholder() {
  const { colors, radii } = useTheme();
  return (
    <View style={[styles.wrap, { backgroundColor: colors.surfaceAlt, borderRadius: radii.card }]}>
      <Svg width="100%" height="100%" viewBox="0 0 350 140" preserveAspectRatio="none">
        <Rect width={350} height={140} fill={colors.surfaceAlt} />
        <Path d="M0 40 H350 M0 95 H350 M60 0 V140 M230 0 V140" stroke={colors.border} strokeWidth={2} />
        <Path d="M0 70 H350" stroke={colors.border} strokeWidth={6} />
      </Svg>
      <View style={styles.pin}>
        <PinIcon size={28} color={colors.plum700} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', height: 140, overflow: 'hidden' },
  pin: { position: 'absolute', left: '50%', top: '50%', marginLeft: -14, marginTop: -26 },
});
