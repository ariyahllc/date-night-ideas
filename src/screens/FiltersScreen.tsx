import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { useFilters } from '../context/FiltersContext';
import { FilterChip } from '../components/FilterChip';
import { Button } from '../components/Button';
import { CloseIcon } from '../components/Icons';
import { RootStackScreenProps } from '../navigation/types';
import { activityLabels, activityOptions, budgetOptions, distanceLabels, distanceOptions, moodLabels, moodOptions } from '../data/labels';

export function FiltersScreen({ navigation }: RootStackScreenProps<'Filters'>) {
  const { colors } = useTheme();
  const { filters, filteredIdeas, toggleBudget, toggleDistance, toggleActivityType, toggleMood, clearAll } =
    useFilters();

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
      <View style={[styles.handle, { backgroundColor: colors.border }]} />
      <View style={styles.top}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>Filters</Text>
        <Pressable
          style={[styles.closeBtn, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
          onPress={() => navigation.goBack()}
        >
          <CloseIcon size={14} color={colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView style={styles.body} contentContainerStyle={{ gap: 26, paddingBottom: 20 }}>
        <Section label="Budget" colorMuted={colors.textMuted}>
          {budgetOptions.map((v) => (
            <FilterChip key={v} label={v} selected={filters.budgets.includes(v)} onPress={() => toggleBudget(v)} />
          ))}
        </Section>

        <Section label="Distance" colorMuted={colors.textMuted}>
          {distanceOptions.map((v) => (
            <FilterChip
              key={v}
              label={distanceLabels[v]}
              selected={filters.distances.includes(v)}
              onPress={() => toggleDistance(v)}
            />
          ))}
        </Section>

        <Section label="Activity type" colorMuted={colors.textMuted}>
          {activityOptions.map((v) => (
            <FilterChip
              key={v}
              label={activityLabels[v]}
              selected={filters.activityTypes.includes(v)}
              onPress={() => toggleActivityType(v)}
            />
          ))}
        </Section>

        <Section label="Mood" colorMuted={colors.textMuted}>
          {moodOptions.map((v) => (
            <FilterChip key={v} label={moodLabels[v]} selected={filters.moods.includes(v)} onPress={() => toggleMood(v)} />
          ))}
        </Section>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.surface }]}>
        <Button label={`Show ${filteredIdeas.length} results`} onPress={() => navigation.goBack()} />
        <Pressable onPress={clearAll}>
          <Text style={[styles.clearLink, { color: colors.textMuted }]}>Clear all</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function Section({ label, children, colorMuted }: { label: string; children: React.ReactNode; colorMuted: string }) {
  return (
    <View>
      <Text style={[styles.sectionLabel, { color: colorMuted }]}>{label}</Text>
      <View style={styles.chipRow}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  handle: { width: 36, height: 4, borderRadius: 999, alignSelf: 'center', marginTop: 8 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 12, paddingBottom: 8 },
  title: { fontSize: 20, fontWeight: '800' },
  closeBtn: { width: 32, height: 32, borderRadius: 999, alignItems: 'center', justifyContent: 'center', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 10, elevation: 2 },
  body: { flex: 1, paddingHorizontal: 20 },
  sectionLabel: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 12 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  footer: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, alignItems: 'center', gap: 10, borderTopWidth: 1 },
  clearLink: { fontSize: 14, fontWeight: '700' },
});
