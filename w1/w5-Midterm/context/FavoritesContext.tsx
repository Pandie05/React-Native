// context/FavoritesContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { FavoriteProduct } from "../types/navigation";

const STORAGE_KEY = "@favorites_products";

type Ctx = {
  favorites: FavoriteProduct[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (p: FavoriteProduct) => Promise<void>;
  removeFavorite: (id: number) => Promise<void>;
};

const FavoritesContext = createContext<Ctx | null>(null);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setFavorites(JSON.parse(raw));
      } catch {}
    })();
  }, []);

  const persist = async (list: FavoriteProduct[]) => {
    setFavorites(list);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  };

  const isFavorite = (id: number) => favorites.some(f => f.id === id);

  const toggleFavorite = async (p: FavoriteProduct) => {
    if (isFavorite(p.id)) {
      await persist(favorites.filter(f => f.id !== p.id));
    } else {
      await persist([p, ...favorites]);
    }
  };

  const removeFavorite = async (id: number) => {
    await persist(favorites.filter(f => f.id !== id));
  };

  const value = useMemo(() => ({ favorites, isFavorite, toggleFavorite, removeFavorite }), [favorites]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};
