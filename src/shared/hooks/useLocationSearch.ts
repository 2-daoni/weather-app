import { useState } from "react";

const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0";

export const fetchGeoLocation = async (q: string) => {
  if (!q) return [];

  const res = await fetch(
    `${GEO_BASE_URL}/direct?q=${q}&limit=5&appid=${import.meta.env.VITE_OPEN_WEATHER_MAP}&lang=kr`
  );

  if (!res.ok) throw new Error("Geo fetch failed");

  return res.json();
};

export const useLocationSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchLocation = async (q: string) => {
    if (!q) return;

    setLoading(true);
    try {
      const data = await fetchGeoLocation(q);
      setResults(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    searchLocation,
    setResults,
    loading,
  };
};
