import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { Track } from '@/types/navigation';

type PlayerState = {
  current?: Track;
  isPlaying: boolean;
  positionMillis: number;
  durationMillis: number;
  play: (track: Track) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  stop: () => Promise<void>;
};

const Ctx = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const soundRef = useRef<Audio.Sound | null>(null);
  const [current, setCurrent] = useState<Track | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPosition] = useState(0);
  const [durationMillis, setDuration] = useState(0);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      shouldDuckAndroid: true
    });
  }, []);

  async function unload() {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
      soundRef.current.setOnPlaybackStatusUpdate(null);
      soundRef.current = null;
    }
  }

  async function play(track: Track) {
    if (!track.previewUrl) return;
    await unload();
    const { sound } = await Audio.Sound.createAsync(
      { uri: track.previewUrl },
      { shouldPlay: true },
      (status) => {
        if (!status.isLoaded) return;
        setIsPlaying(status.isPlaying ?? false);
        setPosition(status.positionMillis ?? 0);
        setDuration(status.durationMillis ?? 0);
      }
    );
    soundRef.current = sound;
    setCurrent(track);
    setIsPlaying(true);
    Haptics.selectionAsync();
  }

  async function pause() {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  }

  async function resume() {
    if (soundRef.current) {
      await soundRef.current.playAsync();
      setIsPlaying(true);
      Haptics.selectionAsync();
    }
  }

  async function stop() {
    await unload();
    setIsPlaying(false);
    setCurrent(undefined);
  }

  const value = useMemo<PlayerState>(
    () => ({ current, isPlaying, positionMillis, durationMillis, play, pause, resume, stop }),
    [current, isPlaying, positionMillis, durationMillis]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePlayer() {
  const v = useContext(Ctx);
  if (!v) throw new Error('usePlayer must be used within PlayerProvider');
  return v;
}
