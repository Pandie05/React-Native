
export type ScannerStackParamList = {
  Scanner: undefined;
  ProductDetail: { url: string }; // pass the QR product URL
};

export type RootTabParamList = {
  ScannerTab: undefined;   // contains the Scanner stack
  FavoritesTab: undefined; // standalone screen
};

export type FavoriteProduct = {
  id: number;
  title: string;
  price: number;
  image: string; // first image/thumbnail
  url: string;   // product URL (for deep navigation)
};
