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
  addFavorite: (location: FavoriteLocation) => boolean;
  removeFavorite: (lat: number, lon: number) => void;
  isFavorite: (lat: number, lon: number) => boolean;
  updateFavoriteNickname: (lat: number, lon: number, nickname?: string) => void;
  getFavoriteNickname: (lat: number, lon: number) => string | undefined;
};

const MAX_FAVORITES = 6;

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (location) => {
        const { favorites } = get();

        const exists = favorites.some((f) => f.lat === location.lat && f.lon === location.lon);
        if (exists) return true;

        if (favorites.length >= MAX_FAVORITES) {
          return false;
        }

        set({ favorites: [...favorites, location] });
        return true;
      },

      removeFavorite: (lat, lon) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => !(f.lat === lat && f.lon === lon)),
        })),

      isFavorite: (lat, lon) => get().favorites.some((f) => f.lat === lat && f.lon === lon),

      updateFavoriteNickname: (lat, lon, nickname) =>
        set((state) => ({
          favorites: state.favorites.map((f) => (f.lat === lat && f.lon === lon ? { ...f, nickname } : f)),
        })),

      getFavoriteNickname: (lat: number, lon: number) =>
        get().favorites.find((f) => f.lat === lat && f.lon === lon)?.nickname,
    }),
    {
      name: "favorite-locations",
    }
  )
);
