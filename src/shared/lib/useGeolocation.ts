import { useEffect, useState } from "react";

type LocationState = {
  lat: number | null;
  lon: number | null;
  error: string | null;
  loading: boolean;
};

export const useGeolocation = () => {
  const [state, setState] = useState<LocationState>({
    lat: null,
    lon: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "이 브라우저는 위치 정보를 지원하지 않습니다.",
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (err) => {
        setState({
          lat: null,
          lon: null,
          loading: false,
          error: err.message,
        });
      }
    );
  }, []);

  return state;
};
