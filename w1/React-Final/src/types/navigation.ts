export type Track = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100?: string;
  collectionName?: string;
  primaryGenreName?: string;
  previewUrl?: string;
};

export type Playlist = {
  id: string;       // string so it’s easy to use Date.now().toString() in persistence
  name: string;
  tracks: Track[];
};

export type SearchStackParams = {
  Search: undefined;
  Results: { q: string };
  TrackDetails: { trackId: number; from: 'results' | 'favorites' | 'playlist' };
  MiniPlayerModal: undefined;
};

export type LibraryStackParams = {
  Favorites: undefined;
  Playlists: undefined;
  PlaylistDetails: { playlistId: number };
  TrackDetails: { trackId: number; from: 'results' | 'favorites' | 'playlist' };
  CreatePlaylistModal: { initialTrack?: Track } | undefined;
};