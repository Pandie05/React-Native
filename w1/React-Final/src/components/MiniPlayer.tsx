import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View, Image, useColorScheme } from 'react-native';
import { usePlayer } from '@/context/PlayerContext';
import { theme } from '@/theme';

export function MiniPlayer({ onOpen }: { onOpen: () => void }) {
  const { current, isPlaying, pause, resume, stop, positionMillis, durationMillis } = usePlayer();
  const translateY = useRef(new Animated.Value(80)).current;
  const scheme = useColorScheme();
  const t = scheme === 'dark' ? theme.dark : theme.light;

  useEffect(() => {
    Animated.timing(translateY, { toValue: current ? 0 : 80, duration: 220, useNativeDriver: true }).start();
  }, [current, translateY]);

  if (!current) return null;

  const progress = durationMillis ? positionMillis / durationMillis : 0;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY }] }, { backgroundColor: t.card, borderColor: t.border }]}>
      <Pressable style={styles.content} onPress={onOpen}>
        <Image
          source={{ uri: current.artworkUrl100 || 'https://placehold.co/64x64?text=No+Art' }}
          style={styles.artwork}
        />
        <View style={styles.info}>
          <Text style={[styles.title, { color: t.text }]} numberOfLines={1}>{current.trackName}</Text>
          <Text style={[styles.artist, { color: t.muted }]} numberOfLines={1}>{current.artistName}</Text>
          <View style={[styles.progressBar, { backgroundColor: t.border }]}>
            <View style={[styles.progress, { width: `${progress * 100}%`, backgroundColor: theme.shared.primary }]} />
          </View>
        </View>
      </Pressable>
      <View style={styles.controls}>
        <Pressable onPress={isPlaying ? pause : resume} style={[styles.button, { backgroundColor: theme.shared.primary }]}>
          <Text style={styles.buttonText}>{isPlaying ? '⏸' : '▶️'}</Text>
        </Pressable>
        <Pressable onPress={stop} style={[styles.button, { backgroundColor: '#111827' }]}>
          <Text style={styles.buttonText}>⏹</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: theme.shared.radius,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.shared.spacing(1),
    gap: theme.shared.spacing(1),
    ...theme.shared.shadow
  },
  content: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  artwork: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: '#D1D5DB',
    marginRight: theme.shared.spacing(2)
  },
  info: { flex: 1, justifyContent: 'center' },
  title: { fontWeight: '700', fontSize: 16 },
  artist: { fontSize: 14, marginBottom: theme.shared.spacing(1) / 2 },
  progressBar: { height: 4, borderRadius: 2, overflow: 'hidden' },
  progress: { height: 4, borderRadius: 2 },
  controls: { flexDirection: 'row', alignItems: 'center', marginLeft: theme.shared.spacing(2) },
  button: { padding: theme.shared.spacing(1), marginHorizontal: 2, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' }
});
