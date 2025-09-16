import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { LibraryStackParams, Playlist } from '@/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { loadPlaylists } from '@/storage/persistence';
import { theme } from '@/theme';

type Props = NativeStackScreenProps<LibraryStackParams, 'Playlists'>;
export function PlaylistsScreen({ navigation }: Props) {
  const [lists, setLists] = useState<Playlist[]>([]);
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  useEffect(() => {
    const unsub = navigation.addListener('focus', async () => {
      setLists(await loadPlaylists());
    });
    return unsub;
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: t.bg }}>
      <FlatList
        data={lists}
        keyExtractor={(it) => it.id}
        renderItem={({ item }) => (
          <Pressable style={[styles.row, { borderBottomColor: t.border }]} onPress={() => navigation.navigate('PlaylistDetails', { playlistId: Number(item.id) })}>
            <Text style={[styles.title, { color: t.text }]}>{item.name}</Text>
            <Text style={{ color: t.muted }}>{item.tracks.length} tracks</Text>
          </Pressable>
        )}
        ListEmptyComponent={<View style={styles.center}><Text style={{ color: t.muted }}>No playlists yet.</Text></View>}
      />
      <Pressable style={styles.fab} onPress={() => navigation.navigate({ name: 'CreatePlaylistModal', params: {} }) }>
        <Text style={styles.fabText}>+ New</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { padding: theme.shared.spacing(2), borderBottomWidth: 1 },
  title: { fontWeight: '800', fontSize: 16, marginBottom: 2 },
  center: { alignItems: 'center', padding: theme.shared.spacing(2) },
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
