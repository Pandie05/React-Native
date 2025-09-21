import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator, useColorScheme } from 'react-native';
import { SearchStackParams, Track } from '@/types/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { searchTracks } from '@/api/itunes';
import { TrackRow } from '@/components/TrackRow';
import { theme } from '@/theme';

const PAGE = 25;

type Props = NativeStackScreenProps<SearchStackParams, 'Results'>;
export function ResultsScreen({ route, navigation }: Props) {
  const { q } = route.params;
  const [items, setItems] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [end, setEnd] = useState(false);

  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setOffset(0);
    setEnd(false);
    (async () => {
      const res = await searchTracks(q, PAGE, 0);
      if (!mounted) return;
      setItems(res);
      setLoading(false);
      setOffset(PAGE);
      if (res.length < PAGE) setEnd(true);
    })();
    return () => { mounted = false; };
  }, [q]);

  async function loadMore() {
    if (loadingMore || end) return;
    setLoadingMore(true);
    const res = await searchTracks(q, PAGE, offset);
    setItems((prev) => [...prev, ...res]);
    setOffset((o) => o + PAGE);
    if (res.length < PAGE) setEnd(true);
    setLoadingMore(false);
  }

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: t.bg }]}>
        <ActivityIndicator />
        <Text style={[styles.muted, { color: t.muted }]}>Loading…</Text>
      </View>
    );
  }

  if (!items.length) {
    return (
      <View style={[styles.center, { backgroundColor: t.bg }]}>
        <Text style={[styles.title, { color: t.text }]}>No results</Text>
        <Text style={{ color: t.muted }}>Try another search term.</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: t.bg }}
      data={items}
      keyExtractor={(it) => String(it.trackId)}
      renderItem={({ item }) => (
        <TrackRow track={item} onPress={() => navigation.navigate('TrackDetails', { trackId: item.trackId, from: 'results' })} />
      )}
      onEndReachedThreshold={0.6}
      onEndReached={loadMore}
      ListFooterComponent={loadingMore ? <View style={styles.footer}><ActivityIndicator /></View> : null}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.shared.spacing(2) },
  muted: { marginTop: 8 },
  title: { fontSize: 18, fontWeight: '800' },
  footer: { padding: theme.shared.spacing(2) }
});
