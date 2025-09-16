import React, { useEffect, useMemo, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View, Pressable, Alert, useColorScheme } from 'react-native';
import { SearchStackParams, Track } from '@/types/navigation';
import { usePlayer } from '@/context/PlayerContext';
import { theme } from '@/theme';
import { loadFavorites, saveFavorites, loadPlaylists, savePlaylists, newPlaylist } from '@/storage/persistence';
import { searchTracks } from '@/api/itunes';

function useTrackById(trackId: number) {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const guess = await searchTracks(String(trackId));
      const found = guess.find((t) => t.trackId === trackId) || null;
      if (mounted) {
        setTrack(found);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [trackId]);
  return { track, loading };
}

type Props = NativeStackScreenProps<SearchStackParams, 'TrackDetails'>;
export function TrackDetailsScreen({ route, navigation }: Props) {
  const { trackId } = route.params;
  const { track, loading } = useTrackById(trackId);
  const { current, isPlaying, play, pause } = usePlayer();
  const [favMap, setFavMap] = useState<Record<number, Track>>({});
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  useEffect(() => { (async () => setFavMap(await loadFavorites()))(); }, []);
  const isFav = useMemo(() => !!favMap[trackId], [favMap, trackId]);

  async function toggleFav() {
    if (!track) return;
    const next = { ...favMap };
    if (isFav) delete next[track.trackId]; else next[track.trackId] = track;
    await saveFavorites(next);
    setFavMap(next);
  }

  async function addToNewPlaylist() {
    if (!track) return;
    const lists = await loadPlaylists();
    const name = `${track.artistName} – ${track.trackName}`.slice(0, 40);
    const pl = newPlaylist(name, track);
    await savePlaylists([pl, ...lists]);
    Alert.alert('Added', `Created playlist "${pl.name}" with this track.`);
  }

  if (loading || !track) {
    return (
      <View style={[styles.center, { backgroundColor: t.bg }]}>
        <ActivityIndicator />
      </View>
    );
  }

  const playingThis = current?.trackId === track.trackId && isPlaying;

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: t.bg }]}>
      <Image source={{ uri: track.artworkUrl100 }} style={styles.hero} />
      <Text style={[styles.title, { color: t.text }]}>{track.trackName}</Text>
      <Text style={[styles.artist, { color: t.muted }]}>{track.artistName}</Text>
      {track.collectionName ? <Text style={{ color: t.muted }}>{track.collectionName}</Text> : null}
      {track.primaryGenreName ? <Text style={{ color: t.muted }}>{track.primaryGenreName}</Text> : null}

      <View style={styles.actions}>
        <Pressable
          style={[styles.primary, { backgroundColor: theme.shared.primary }]}
          onPress={() => (playingThis ? pause() : play(track))}
        >
          <Text style={styles.primaryText}>{playingThis ? 'Pause' : 'Play Preview'}</Text>
        </Pressable>
        <Pressable
          style={[styles.secondary, { borderColor: t.border, backgroundColor: isFav ? (scheme === 'dark' ? '#1B1C22' : '#EEF2FF') : 'transparent' }]}
          onPress={toggleFav}
        >
          <Text style={[styles.secondaryText, { color: t.text }]}>{isFav ? 'Unfavorite' : 'Favorite'}</Text>
        </Pressable>
      </View>

      <Pressable style={styles.ghost} onPress={addToNewPlaylist}>
        <Text style={[styles.ghostText, { color: theme.shared.primary }]}>Add to New Playlist</Text>
      </Pressable>

      <Pressable style={styles.ghost} onPress={() => navigation.navigate('MiniPlayerModal') }>
        <Text style={[styles.ghostText, { color: theme.shared.primary }]}>Open Mini Player</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: theme.shared.spacing(2), gap: theme.shared.spacing(1) },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { width: 260, height: 260, borderRadius: 20, marginTop: theme.shared.spacing(2) },
  title: { fontSize: 24, fontWeight: '900', textAlign: 'center', marginTop: theme.shared.spacing(2) },
  artist: { marginBottom: theme.shared.spacing(1) },
  actions: { flexDirection: 'row', gap: theme.shared.spacing(1.25), marginTop: theme.shared.spacing(2) },
  primary: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
  primaryText: { color: 'white', fontWeight: '800' },
  secondary: { borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12 },
  secondaryText: { fontWeight: '700' },
  ghost: { padding: 12 },
  ghostText: { fontWeight: '800' }
});
