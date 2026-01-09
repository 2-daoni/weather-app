import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/shared/api/weather";

export const useWeather = (lat: number, lon: number) => {
  return useQuery({
    queryKey: ["weather", lat, lon],
    queryFn: () => getWeather(lat, lon),
    enabled: !!lat && !!lon, // 값 있을 때만 호출
  });
};
