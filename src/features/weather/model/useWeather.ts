import { useQuery } from "@tanstack/react-query";
import { getWeather, getWeatherBundleByCoords, getWeatherBundleByQuery } from "@/shared/api/weather";

export const useWeather = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => {
      if (lat === null || lon === null) {
        throw new Error("위치 정보 없음");
      }
      return getWeather({ lat, lon });
    },
    enabled: !!lat && !!lon, // 값 있을 때만 호출
  });
};

export const useWeatherByCoords = (lat: number | null, lon: number | null) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => {
      if (lat === null || lon === null) {
        throw new Error("위치 정보 없음");
      }
      return getWeatherBundleByCoords({ lat, lon });
    },
    enabled: !!lat && !!lon, // 값 있을 때만 호출
  });
};

export const useWeatherByQuery = (query: string | null) =>
  useQuery({
    queryKey: ["weather", "query", query],
    queryFn: () => {
      if (query === null) {
        return;
      }
      return getWeatherBundleByQuery(query);
    },
    enabled: !!query,
  });
