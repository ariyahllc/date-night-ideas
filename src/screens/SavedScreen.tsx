import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Share, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';
import { useSaved } from '../context/SavedContext';
import { categoryGradients } from '../theme/tokens';
import { activityLabels, formatDistance, moodLabels } from '../data/labels';
import { ActivityIcon, JarIcon, ShareIcon } from '../components/Icons';
import { Button } from '../components/Button';
import { DateIdea } from '../types';
import { MainTabScreenProps } from '../navigation/types';

export function SavedScreen({ navigation }: MainTabScreenProps<'DateJar'>) {
  const { colors, radii } = useTheme();
  const { savedIdeas, remove } = useSaved();

  async function handleShare(idea: DateIdea) {
    try {
      await Share.share({ message: `${idea.title} — ${idea.blurb}\n${idea.bookingUrl}`, url: idea.bookingUrl });
    } catch {
      // dismissed
    }
  }

  function confirmRemove(idea: DateIdea) {
    Alert.alert(idea.title, 'Remove from your Date Jar?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => remove(idea.id) },
    ]);
  }

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.bg }]} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <JarIcon size={24} color={colors.plum700} />
          <Text style={[styles.h1, { color: colors.textPrimary }]}>Date Jar</Text>
        </View>
        <Text style={[styles.count, { color: colors.textMuted }]}>
          {savedIdeas.length} saved {savedIdeas.length === 1 ? 'idea' : 'ideas'}
        </Text>
      </View>

      {savedIdeas.length > 0 && (
        <LinearGradient colors={[colors.plum700, colors.plum600]} style={[styles.banner, { borderRadius: radii.card }]}>
          <Text style={styles.bannerText}>Not sure which one?{'\n'}Let us plan the night.</Text>
          <Pressable style={[styles.bannerCta, { backgroundColor: colors.gold500 }]} onPress={() => navigation.navigate('Surprise')}>
            <Text style={styles.bannerCtaText}>Surprise Me</Text>
          </Pressable>
        </LinearGradient>
      )}

      <FlatList
        data={savedIdeas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>Your jar is empty</Text>
            <Text style={[styles.emptyBody, { color: colors.textSecondary }]}>
              Swipe right on ideas you like from the home feed and they'll show up here.
            </Text>
            <Button label="Browse date ideas" onPress={() => navigation.navigate('Home')} />
          </View>
        }
        renderItem={({ item }) => {
          const [from, to] = categoryGradients[item.activityType];
          return (
            <Pressable
              style={[styles.row, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}
              onPress={() => navigation.navigate('Detail', { ideaId: item.id })}
              onLongPress={() => confirmRemove(item)}
            >
              <LinearGradient colors={[from, to]} style={styles.thumb}>
                <ActivityIcon type={item.activityType} size={26} color="#FBF6F3" />
              </LinearGradient>
              <View style={styles.rowBody}>
                <Text style={[styles.rowTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={[styles.rowMeta, { color: colors.textMuted }]}>
                  {item.priceTier} · {formatDistance(item.distanceMiles)}
                </Text>
                {item.moods[0] && (
                  <Text style={[styles.rowTag, { backgroundColor: colors.surfaceAlt, color: colors.tagText }]}>
                    {moodLabels[item.moods[0]]}
                  </Text>
                )}
              </View>
              <Pressable style={[styles.shareBtn, { backgroundColor: colors.bg }]} onPress={() => handleShare(item)}>
                <ShareIcon size={15} color={colors.plum700} />
              </Pressable>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  h1: { fontSize: 26, fontWeight: '800', letterSpacing: -0.4 },
  count: { fontSize: 13, fontWeight: '700', marginTop: 2 },
  banner: { marginHorizontal: 20, marginTop: 14, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  bannerText: { color: '#FBF6F3', fontSize: 13, fontWeight: '700', lineHeight: 18, flex: 1 },
  bannerCta: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 999 },
  bannerCtaText: { color: '#2B1620', fontSize: 12, fontWeight: '800' },
  list: { padding: 20, gap: 12, flexGrow: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, borderRadius: 18, padding: 12, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 1, shadowRadius: 14, elevation: 3 },
  thumb: { width: 64, height: 64, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rowBody: { flex: 1, gap: 4 },
  rowTitle: { fontSize: 15, fontWeight: '800' },
  rowMeta: { fontSize: 12, fontWeight: '700' },
  rowTag: { alignSelf: 'flex-start', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.4, paddingVertical: 3, paddingHorizontal: 8, borderRadius: 999, overflow: 'hidden' },
  shareBtn: { width: 34, height: 34, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  empty: { alignItems: 'center', justifyContent: 'center', gap: 12, paddingTop: 80, paddingHorizontal: 24, flex: 1 },
  emptyTitle: { fontSize: 18, fontWeight: '800' },
  emptyBody: { fontSize: 14, fontWeight: '500', textAlign: 'center', lineHeight: 20 },
});
