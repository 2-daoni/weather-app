import { useEffect, useState } from "react";
import { fetchReverseGeocode, type KakaoAddress } from "@/shared/api/reverseGeocode";

interface UseReverseGeocodeResult {
  address: KakaoAddress | null;
  loading: boolean;
  error: string | null;
}

export const useReverseGeocode = (lat: number | null, lon: number | null): UseReverseGeocodeResult => {
  const [address, setAddress] = useState<KakaoAddress | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (lat == null || lon == null) return;

    let isMounted = true;

    const run = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchReverseGeocode(lat, lon);
        if (isMounted) setAddress(result);
      } catch (e) {
        if (isMounted) setError("주소 정보를 불러올 수 없습니다.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    run();

    return () => {
      isMounted = false;
    };
  }, [lat, lon]);

  return { address, loading, error };
};
