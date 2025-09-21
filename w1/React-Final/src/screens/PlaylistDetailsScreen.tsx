import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, FlatList, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { LibraryStackParams, Playlist } from '../types/navigation';
import { loadPlaylists, savePlaylists } from '@/storage/persistence';
import { TrackRow } from '@/components/TrackRow';
import { theme } from '@/theme';

type Props = NativeStackScreenProps<LibraryStackParams, 'PlaylistDetails'>;
export function PlaylistDetailsScreen({ route, navigation }: Props) {
  const { playlistId } = route.params;
  const [pl, setPl] = useState<Playlist | null>(null);
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
      const lists = await loadPlaylists();
      setPl(lists.find((p) => p.id === String(playlistId)) ?? null);
    });
    return unsub;
  }, [navigation, playlistId]);

  async function removeTrack(idx: number) {
    if (!pl) return;
    const next: Playlist = { ...pl, tracks: pl.tracks.filter((_, i) => i !== idx) };
    const lists = await loadPlaylists();
    const updated = lists.map((p) => (p.id === pl.id ? next : p));
    await savePlaylists(updated);
    setPl(next);
  }

  if (!pl) {
    return <View style={[styles.center, { backgroundColor: t.bg }]}><Text style={{ color: t.muted }}>Playlist not found.</Text></View>;
  }

  return (
    <FlatList
      style={{ backgroundColor: t.bg }}
      data={pl.tracks}
      keyExtractor={(it, i) => `${it.trackId}-${i}`}
      renderItem={({ item, index }) => (
        <TrackRow
          track={item}
          onPress={() => navigation.navigate('TrackDetails', { trackId: item.trackId, from: 'playlist' })}
          right={<Pressable onPress={() => removeTrack(index)}><Text style={styles.remove}>Remove</Text></Pressable>}
        />
      )}
      ListHeaderComponent={
        <View style={[styles.header, { borderBottomColor: t.border }]}>
          <Text style={[styles.title, { color: t.text }]}>{pl.name}</Text>
          <Text style={{ color: t.muted }}>{pl.tracks.length} tracks</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { padding: theme.shared.spacing(2), borderBottomWidth: 1 },
  title: { fontSize: 22, fontWeight: '800' },
  remove: { color: theme.shared.danger, fontWeight: '700' }
});
