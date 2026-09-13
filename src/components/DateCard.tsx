import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';
import { DateIdea } from '../types';
import { categoryGradients } from '../theme/tokens';
import { activityLabels, formatDistance, moodLabels } from '../data/labels';
import { ActivityIcon } from './Icons';
import { Tag } from './Tag';

export function DateCard({ idea }: { idea: DateIdea }) {
  const { colors, radii } = useTheme();
  const [from, to] = categoryGradients[idea.activityType];
  const mood = idea.moods[0] ? moodLabels[idea.moods[0]] : undefined;

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderRadius: radii.card, shadowColor: colors.shadow }]}>
      <LinearGradient colors={[from, to]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.photo}>
        <ActivityIcon type={idea.activityType} size={56} color="#FBF6F3" />
        <View style={styles.tierBadge}>
          <Text style={styles.tierBadgeText}>{idea.priceTier}</Text>
        </View>
        <View style={styles.distanceBadge}>
          <Text style={styles.distanceBadgeText}>{formatDistance(idea.distanceMiles)}</Text>
        </View>
      </LinearGradient>
      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
          {idea.title}
        </Text>
        <Text style={[styles.blurb, { color: colors.textSecondary }]} numberOfLines={2}>
          {idea.blurb}
        </Text>
        <View style={styles.tags}>
          <Tag label={activityLabels[idea.activityType]} />
          {mood && <Tag label={mood} tone="mood" />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 6,
  },
  photo: {
    width: '100%',
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(28,15,23,0.55)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  tierBadgeText: { color: '#FBF6F3', fontSize: 12, fontWeight: '700' },
  distanceBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255,253,251,0.85)',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  distanceBadgeText: { color: '#2B1620', fontSize: 12, fontWeight: '700' },
  body: { padding: 18, gap: 8 },
  title: { fontSize: 19, fontWeight: '800', letterSpacing: -0.3 },
  blurb: { fontSize: 14, fontWeight: '500', lineHeight: 20 },
  tags: { flexDirection: 'row', gap: 8, marginTop: 2 },
});
