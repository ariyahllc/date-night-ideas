import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Linking, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';
import { useSaved } from '../context/SavedContext';
import { dateIdeas } from '../data/dateIdeas';
import { categoryGradients } from '../theme/tokens';
import { activityLabels, formatDistance, moodLabels } from '../data/labels';
import { ActivityIcon, BackIcon, HeartIcon, ShareIcon } from '../components/Icons';
import { Tag } from '../components/Tag';
import { MapPlaceholder } from '../components/MapPlaceholder';
import { Button } from '../components/Button';
import { RootStackScreenProps } from '../navigation/types';

export function DetailScreen({ route, navigation }: RootStackScreenProps<'Detail'>) {
  const { colors, radii } = useTheme();
  const { isSaved, toggleSaved } = useSaved();
  const idea = dateIdeas.find((d) => d.id === route.params.ideaId);

  if (!idea) {
    return (
      <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]}>
        <Text style={{ color: colors.textPrimary, padding: 20 }}>That date idea isn't available anymore.</Text>
      </SafeAreaView>
    );
  }

  const [from, to] = categoryGradients[idea.activityType];
  const saved = isSaved(idea.id);

  async function handleShare() {
    try {
      await Share.share({
        message: `${idea!.title} — ${idea!.blurb}\n${idea!.bookingUrl}`,
        url: idea!.bookingUrl,
      });
    } catch {
      // Share sheet dismissed or unavailable — nothing to recover from here.
    }
  }

  async function handleBook() {
    const canOpen = await Linking.canOpenURL(idea!.bookingUrl);
    if (canOpen) Linking.openURL(idea!.bookingUrl);
    else Alert.alert('Booking link', idea!.bookingUrl);
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]} edges={['bottom']}>
      <ScrollView bounces={false}>
        <LinearGradient colors={[from, to]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroIcon}>
            <ActivityIcon type={idea.activityType} size={64} color="#FBF6F3" />
          </View>
          <SafeAreaView edges={['top']} style={styles.heroTop}>
            <Pressable style={styles.roundBtn} onPress={() => navigation.goBack()}>
              <BackIcon size={16} color={colors.textPrimary} />
            </Pressable>
            <View style={styles.heroActions}>
              <Pressable style={styles.roundBtn} onPress={handleShare}>
                <ShareIcon size={15} color={colors.textPrimary} />
              </Pressable>
              <Pressable style={styles.roundBtn} onPress={() => toggleSaved(idea.id)}>
                <HeartIcon size={15} color={colors.coral500} filled={saved} />
              </Pressable>
            </View>
          </SafeAreaView>
        </LinearGradient>

        <View style={styles.content}>
          <View>
            <View style={styles.titleRow}>
              <Text style={[styles.h1, { color: colors.textPrimary }]}>{idea.title}</Text>
              <View style={[styles.pricePill, { backgroundColor: colors.moodBg }]}>
                <Text style={[styles.pricePillText, { color: colors.moodText }]}>{idea.priceTier}</Text>
              </View>
            </View>
            <View style={styles.metaRow}>
              <Tag label={activityLabels[idea.activityType]} />
              {idea.moods[0] && <Tag label={moodLabels[idea.moods[0]]} tone="mood" />}
              <Tag label={`${formatDistance(idea.distanceMiles)} away`} />
            </View>
          </View>

          <View>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>About</Text>
            <Text style={[styles.desc, { color: colors.textSecondary }]}>{idea.description}</Text>
          </View>

          <View>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Hours</Text>
            <View style={styles.hoursRow}>
              <View style={[styles.dotOpen, { backgroundColor: colors.sage500 }]} />
              <Text style={[styles.hoursText, { color: colors.textSecondary }]}>{idea.hours}</Text>
            </View>
          </View>

          <View>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Photos</Text>
            <View style={styles.photoRow}>
              {[categoryGradients[idea.activityType], ['#E8A33D', '#E8735F'] as [string, string], ['#7A1942', '#CE8A28'] as [string, string]].map(
                (g, i) => (
                  <LinearGradient key={i} colors={g} style={[styles.thumb, { borderRadius: radii.sm + 4 }]} />
                ),
              )}
            </View>
          </View>

          <View>
            <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>Location</Text>
            <MapPlaceholder />
            <Text style={[styles.address, { color: colors.textSecondary }]}>{idea.address}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: colors.border, backgroundColor: colors.surface }]}>
        <Button
          label="Directions"
          variant="ghost"
          style={{ flex: 1 }}
          onPress={() => Linking.openURL(`https://maps.apple.com/?q=${encodeURIComponent(idea.address)}`)}
        />
        <Button label="Book Now" variant="primary" style={{ flex: 2 }} onPress={handleBook} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  hero: { width: '100%', height: 260, alignItems: 'center', justifyContent: 'center' },
  heroIcon: { position: 'absolute' },
  heroTop: { position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 },
  heroActions: { flexDirection: 'row', gap: 8 },
  roundBtn: { width: 36, height: 36, borderRadius: 999, backgroundColor: 'rgba(255,253,251,0.85)', alignItems: 'center', justifyContent: 'center' },
  content: { padding: 20, gap: 22 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  h1: { fontSize: 24, fontWeight: '800', letterSpacing: -0.4, flex: 1 },
  pricePill: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 999 },
  pricePillText: { fontSize: 13, fontWeight: '800' },
  metaRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', marginTop: 10 },
  sectionLabel: { fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 },
  desc: { fontSize: 15, lineHeight: 22, fontWeight: '500' },
  hoursRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  dotOpen: { width: 8, height: 8, borderRadius: 999 },
  hoursText: { fontSize: 14, fontWeight: '600' },
  photoRow: { flexDirection: 'row', gap: 10 },
  thumb: { flex: 1, height: 72 },
  address: { marginTop: 10, fontSize: 14, fontWeight: '600' },
  footer: { flexDirection: 'row', gap: 10, padding: 20, borderTopWidth: 1 },
});
