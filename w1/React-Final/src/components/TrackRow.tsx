import React from 'react';
import { Pressable, StyleSheet, Text, View, Image, useColorScheme } from 'react-native';
import { Track } from '@/types/navigation';
import { theme } from '@/theme';

type Props = { track: Track; onPress: () => void; right?: React.ReactNode };
export function TrackRow({ track, onPress, right }: Props) {
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.row,
      { borderBottomColor: t.border, backgroundColor: pressed ? (scheme === 'dark' ? '#17181C' : '#F9FAFB') : 'transparent' }
    ]}>
      <Image source={{ uri: track.artworkUrl100 }} style={styles.art} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={[styles.title, { color: t.text }]}>{track.trackName}</Text>
        <Text numberOfLines={1} style={[styles.artist, { color: t.muted }]}>{track.artistName}</Text>
      </View>
      {right}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.shared.spacing(1.25),
    paddingHorizontal: theme.shared.spacing(2),
    gap: theme.shared.spacing(1),
    borderBottomWidth: 1
  },
  art: { width: 56, height: 56, borderRadius: 10 },
  info: { flex: 1 },
  title: { fontWeight: '700', fontSize: 15 },
  artist: { marginTop: 2, fontSize: 13 }
});
