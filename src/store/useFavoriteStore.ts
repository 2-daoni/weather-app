import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FavoriteLocation = {
  name: string;
  lat: number;
  lon: number;
  nickname?: string;
};

type FavoriteState = {
  favorites: FavoriteLocation[];
  addFavorite: (location: FavoriteLocation) => void;
  removeFavorite: (lat: number, lon: number) => void;
  isFavorite: (lat: number, lon: number) => boolean;
  updateFavoriteNickname: (lat: number, lon: number, nickname: string) => void;
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (location) =>
        set((state) => {
          const exists = state.favorites.some((f) => f.lat === location.lat && f.lon === location.lon);
          if (exists) return state;
          return { favorites: [...state.favorites, location] };
        }),

      removeFavorite: (lat, lon) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => !(f.lat === lat && f.lon === lon)),
        })),

      isFavorite: (lat, lon) => get().favorites.some((f) => f.lat === lat && f.lon === lon),

      updateFavoriteNickname: (lat, lon, nickname) =>
        set((state) => ({
          favorites: state.favorites.map((f) => (f.lat === lat && f.lon === lon ? { ...f, nickname } : f)),
        })),
    }),
    {
      name: "favorite-locations",
    }
  )
);
