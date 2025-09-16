import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { usePlayer } from '@/context/PlayerContext';
import { theme } from '@/theme';

export function MiniPlayerModal() {
  const { current, isPlaying, pause, resume, stop } = usePlayer();
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  if (!current) {
    return (
      <View style={[styles.center, { backgroundColor: t.bg }]}>
        <Text style={{ color: t.muted }}>Nothing playing.</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: t.bg }]}>
      <Text style={[styles.title, { color: t.text }]}>{current.trackName}</Text>
      <Text style={{ color: t.muted }}>{current.artistName}</Text>

      <View style={styles.row}>
        <Pressable style={[styles.btn, { backgroundColor: theme.shared.primary }]} onPress={isPlaying ? pause : resume}>
          <Text style={styles.btnText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </Pressable>
        <Pressable style={[styles.btn, { backgroundColor: '#111827' }]} onPress={stop}>
          <Text style={styles.btnText}>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.shared.spacing(2), gap: theme.shared.spacing(2) },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '900' },
  row: { flexDirection: 'row', gap: theme.shared.spacing(1) },
  btn: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12 },
  btnText: { color: 'white', fontWeight: '800' }
});
