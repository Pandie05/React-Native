import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Alert, Pressable, useColorScheme } from 'react-native';
import { Track } from '@/types/navigation';
import { loadFavorites, saveFavorites } from '@/storage/persistence';
import { TrackRow } from '@/components/TrackRow';
import { theme } from '@/theme';

export function FavoritesScreen({ navigation }: any) {
  const [map, setMap] = useState<Record<number, Track>>({});
  const items = Object.values(map);
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  useEffect(() => { (async () => setMap(await loadFavorites()))(); }, []);

  function remove(trackId: number) {
    Alert.alert('Remove favorite?', 'This will remove the track from favorites.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: async () => {
        const next = { ...map }; delete next[trackId]; await saveFavorites(next); setMap(next);
      }}
    ]);
  }

  if (!items.length) {
    return (
      <View style={[styles.center, { backgroundColor: t.bg }]}>
        <Text style={[styles.muted, { color: t.muted }]}>No favorites yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: t.bg }}
      data={items}
      keyExtractor={(it) => String(it.trackId)}
      renderItem={({ item }) => (
        <TrackRow
          track={item}
          onPress={() => navigation.navigate('TrackDetails', { trackId: item.trackId, from: 'favorites' })}
          right={<Pressable onPress={() => remove(item.trackId)}><Text style={styles.remove}>Remove</Text></Pressable>}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { },
  remove: { color: theme.shared.danger, fontWeight: '700' }
});
