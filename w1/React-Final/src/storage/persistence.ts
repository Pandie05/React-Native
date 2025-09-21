import AsyncStorage from '@react-native-async-storage/async-storage';
import { Playlist, Track } from '@/types/navigation';

const FAVORITES_KEY = 'favorites';
const PLAYLISTS_KEY = 'playlists';

export async function loadFavorites(): Promise<Record<number, Track>> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  return raw ? (JSON.parse(raw) as Record<number, Track>) : {};
}

export async function saveFavorites(map: Record<number, Track>): Promise<void> {
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(map));
}

export async function loadPlaylists(): Promise<Playlist[]> {
  const raw = await AsyncStorage.getItem(PLAYLISTS_KEY);
  return raw ? (JSON.parse(raw) as Playlist[]) : [];
}

export async function savePlaylists(list: Playlist[]): Promise<void> {
  await AsyncStorage.setItem(PLAYLISTS_KEY, JSON.stringify(list));
}

export function newPlaylist(name: string, initial?: Track): Playlist {
  return { id: String(Date.now()), name, tracks: initial ? [initial] : [] };
}
