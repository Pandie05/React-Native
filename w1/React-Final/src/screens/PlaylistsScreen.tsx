import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Alert, Pressable, useColorScheme } from 'react-native';
import { LibraryStackParams, Playlist } from '../types/navigation'; 
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadPlaylists, savePlaylists } from '../storage/persistence'; 
import { theme } from '../theme'; 

type Props = NativeStackScreenProps<LibraryStackParams, 'Playlists'>;
export function PlaylistsScreen({ navigation }: Props) {
  const [playlists, setPlaylists] = useState<Record<number, Playlist>>({});
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  useEffect(() => {
    (async () => {
      const arr = await loadPlaylists(); // arr: Playlist[]
      const obj = Object.fromEntries(arr.map(p => [p.id, p]));
      setPlaylists(obj);
    })();
  }, []);

  function remove(playlistId: number) {
    Alert.alert('Remove playlist?', 'This will delete the playlist.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => {
        const next = { ...playlists };
        delete next[playlistId];
        await savePlaylists(Object.values(next)); 
        setPlaylists(next);
      }}
    ]);
  }

  const items = Object.values(playlists);

  if (!items.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>No playlists yet.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <FlatList
        data={items}
        keyExtractor={(it) => String(it.id)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Pressable onPress={() => navigation.navigate('PlaylistDetails', { playlistId: Number(item.id) })}>
              <Text style={[styles.title, { color: t.text }]}>{item.name}</Text>
            </Pressable>
            <Pressable onPress={() => remove(Number(item.id))}>
              <Text style={styles.remove}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
      <Pressable style={styles.fab} onPress={() => navigation.navigate('CreatePlaylistModal', {})}>
        <Text style={styles.fabText}>+ New</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { color: '#888' }, 
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  title: { fontWeight: '700', fontSize: 16 },
  remove: { color: theme.shared.danger, fontWeight: '700' },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: theme.shared.primary,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  fabText: { color: 'white', fontWeight: '800' }
});
