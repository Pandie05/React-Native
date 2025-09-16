export type Track = {
  trackId: number;
  trackName: string;
  artistName: string;
  previewUrl: string | null;
  artworkUrl100: string;
  collectionName?: string;
  primaryGenreName?: string;
};

export type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
};

export type SearchStackParams = {
  Search: undefined;
  Results: { q: string };
  TrackDetails: { trackId: number; from?: 'results' | 'favorites' | 'playlist' };
  MiniPlayerModal: undefined;
};

export type LibraryStackParams = {
  Favorites: undefined;
  Playlists: undefined;
  PlaylistDetails: { playlistId: number };
  CreatePlaylistModal: { initialTrack?: Track };
  TrackDetails: { trackId: number; from: string }; 
};
