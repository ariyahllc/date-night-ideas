import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export function FilterChip({ label, selected, onPress }: Props) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        { borderColor: colors.border, backgroundColor: colors.surface },
        selected && { backgroundColor: colors.plum700, borderColor: colors.plum700 },
      ]}
    >
      {selected && <View style={styles.dot} />}
      <Text style={[styles.label, { color: colors.textSecondary }, selected && { color: colors.bg }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1.5,
  },
  dot: { width: 6, height: 6, borderRadius: 999, backgroundColor: '#E8A33D' },
  label: { fontSize: 14, fontWeight: '700' },
});
