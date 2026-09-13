import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export function Tag({ label, tone = 'default' }: { label: string; tone?: 'default' | 'mood' }) {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        styles.tag,
        { backgroundColor: colors.surfaceAlt, color: colors.tagText },
        tone === 'mood' && { backgroundColor: colors.moodBg, color: colors.moodText },
      ]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  tag: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
