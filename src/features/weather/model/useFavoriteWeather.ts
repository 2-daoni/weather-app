import { useEffect, useState } from "react";
import { useFavoriteStore } from "@/store/useFavoriteStore";

type FavoriteWeather = {
  name: string;
  lat: number;
  lon: number;
  weather: any | null;
};

export const useFavoritesWeather = () => {
  const { favorites } = useFavoriteStore();
  const [data, setData] = useState<FavoriteWeather[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (favorites.length === 0) {
      setData([]);
      return;
    }

    const fetchAll = async () => {
      setLoading(true);

      const results = await Promise.all(
        favorites.map(async (fav) => {
          const res = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${fav.lat}&lon=${fav.lon}&units=metric&lang=kr&appid=${
              import.meta.env.VITE_OPEN_WEATHER_MAP
            }`
          );
          const weather = await res.json();

          return {
            ...fav,
            weather,
          };
        })
      );

      setData(results);
      setLoading(false);
    };

    fetchAll();
  }, [favorites]);

  return { data, loading };
};
