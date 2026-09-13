import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';
import { useFilters } from '../context/FiltersContext';
import { useSaved } from '../context/SavedContext';
import { generatePlan, NightPlan } from '../utils/surprise';
import { categoryGradients } from '../theme/tokens';
import { formatDistance } from '../data/labels';
import { ActivityIcon, EmberFlameIcon } from '../components/Icons';
import { Button } from '../components/Button';
import { MainTabScreenProps } from '../navigation/types';

export function SurpriseScreen({ navigation }: MainTabScreenProps<'Surprise'>) {
  const { colors } = useTheme();
  const { filters } = useFilters();
  const { savedIdeas, save } = useSaved();
  const [plan, setPlan] = useState<NightPlan | null>(null);

  function buildPlan(excludeCurrent: boolean) {
    const exclude = excludeCurrent && plan ? [plan.dinner.id, plan.activity.id] : [];
    const next = generatePlan(filters, savedIdeas, exclude);
    setPlan(next);
  }

  function handleSavePlan() {
    if (!plan) return;
    save(plan.dinner.id);
    save(plan.activity.id);
    Alert.alert('Saved to your Date Jar', `${plan.dinner.title} + ${plan.activity.title}`, [
      { text: 'Keep planning', style: 'cancel' },
      { text: 'View Date Jar', onPress: () => navigation.navigate('DateJar') },
    ]);
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]} edges={['top']}>
      <View style={styles.header}>
        {plan && (
          <>
            <Text style={[styles.h1, { color: colors.textPrimary }]}>Your Night Plan</Text>
            <Text style={[styles.sub, { color: colors.textMuted }]}>Built from your filters + past saves</Text>
          </>
        )}
      </View>

      {!plan && (
        <View style={styles.prompt}>
          <LinearGradient colors={[colors.gold500, colors.coral500]} style={styles.sparkBadge}>
            <EmberFlameIcon size={40} color="#2B1620" />
          </LinearGradient>
          <Text style={[styles.promptTitle, { color: colors.textPrimary }]}>Let us plan your night</Text>
          <Text style={[styles.promptBody, { color: colors.textSecondary }]}>
            Pick your filters, tell us the mood, and we'll build a dinner + activity plan in seconds.
          </Text>
        </View>
      )}

      {plan && (
        <View style={styles.plan}>
          <PlanStep timeLabel="6:30 PM · Dinner" idea={plan.dinner} showLine />
          <PlanStep timeLabel="8:30 PM · Activity" idea={plan.activity} />
        </View>
      )}

      <View style={styles.footer}>
        {!plan ? (
          <Button label="Surprise Me" onPress={() => buildPlan(false)} style={{ flex: 1 }} />
        ) : (
          <>
            <Button label="Shuffle" variant="ghost" onPress={() => buildPlan(true)} />
            <Button label="Save Plan" onPress={handleSavePlan} style={{ flex: 1 }} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

function PlanStep({ timeLabel, idea, showLine }: { timeLabel: string; idea: NightPlan['dinner']; showLine?: boolean }) {
  const { colors } = useTheme();
  const [from, to] = categoryGradients[idea.activityType];
  return (
    <View style={styles.step}>
      <View style={styles.rail}>
        <View style={[styles.railDot, { backgroundColor: colors.plum700, borderColor: colors.moodBg }]} />
        {showLine && <View style={[styles.railLine, { backgroundColor: colors.border }]} />}
      </View>
      <View style={styles.stepBody}>
        <Text style={[styles.stepTime, { color: colors.gold600 }]}>{timeLabel}</Text>
        <View style={[styles.stepCard, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
          <LinearGradient colors={[from, to]} style={styles.stepThumb}>
            <ActivityIcon type={idea.activityType} size={22} color="#FBF6F3" />
          </LinearGradient>
          <View style={{ flex: 1 }}>
            <Text style={[styles.stepTitle, { color: colors.textPrimary }]} numberOfLines={1}>
              {idea.title}
            </Text>
            <Text style={[styles.stepMeta, { color: colors.textMuted }]}>
              {idea.priceTier} · {formatDistance(idea.distanceMiles)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingTop: 8, paddingHorizontal: 20, alignItems: 'center' },
  h1: { fontSize: 22, fontWeight: '800', letterSpacing: -0.3 },
  sub: { fontSize: 13, fontWeight: '600', marginTop: 4 },
  prompt: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 18, paddingHorizontal: 40 },
  sparkBadge: { width: 96, height: 96, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  promptTitle: { fontSize: 20, fontWeight: '800', textAlign: 'center' },
  promptBody: { fontSize: 14, fontWeight: '500', lineHeight: 20, textAlign: 'center' },
  plan: { flex: 1, paddingHorizontal: 20, paddingTop: 12 },
  step: { flexDirection: 'row', gap: 14 },
  rail: { alignItems: 'center' },
  railDot: { width: 14, height: 14, borderRadius: 999, borderWidth: 3, marginTop: 4 },
  railLine: { width: 2, flex: 1, marginVertical: 4 },
  stepBody: { flex: 1, paddingBottom: 22 },
  stepTime: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 },
  stepCard: { flexDirection: 'row', gap: 12, alignItems: 'center', borderRadius: 16, padding: 12, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 1, shadowRadius: 14, elevation: 3 },
  stepThumb: { width: 52, height: 52, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  stepTitle: { fontSize: 14, fontWeight: '800' },
  stepMeta: { fontSize: 12, fontWeight: '700', marginTop: 2 },
  footer: { flexDirection: 'row', gap: 10, padding: 20 },
});
