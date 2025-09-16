import { Track } from '@/types/navigation';

type ITunesTrackRaw = {
  trackId: number;
  trackName: string;
  artistName: string;
  previewUrl?: string;
  artworkUrl100?: string;
  collectionName?: string;
  primaryGenreName?: string;
};

export async function searchTracks(term: string, limit = 25, offset = 0): Promise<Track[]> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=musicTrack&limit=${limit}&offset=${offset}&country=US`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Network error');
  const json: { resultCount: number; results: ITunesTrackRaw[] } = await res.json();
  return json.results
    .filter((t) => t.trackId && t.trackName && t.artistName)
    .map((t) => ({
      trackId: t.trackId,
      trackName: t.trackName,
      artistName: t.artistName,
      previewUrl: t.previewUrl ?? null,
      artworkUrl100: t.artworkUrl100 ?? '',
      collectionName: t.collectionName,
      primaryGenreName: t.primaryGenreName
    }));
}
