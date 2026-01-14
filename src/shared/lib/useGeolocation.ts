import { useEffect, useState } from "react";

type LocationState = {
  lat: number | null;
  lon: number | null;
  loading: boolean;
  error: string | null;
};

// 사용자 위치정보를 가져오지 못할 경우 default 위치 노출
const DEFAULT_LOCATION = {
  lat: 37.5665,
  lon: 126.978,
};

export const useGeolocation = (): LocationState => {
  const [state, setState] = useState<LocationState>({
    lat: DEFAULT_LOCATION.lat,
    lon: DEFAULT_LOCATION.lon,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Geolocation not supported",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position", position);
        setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (err) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err.message || "위치 정보 불러오기 실패",
        }));
      },
      {
        enableHighAccuracy: false,
        timeout: 7000,
      }
    );
  }, []);

  return state;
};
