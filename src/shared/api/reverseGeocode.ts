export interface KakaoAddress {
  address_name: string;
  region_1depth_name: string; // 시/도
  region_2depth_name: string; // 구
  region_3depth_name: string; // 동
}

export const fetchReverseGeocode = async (lat: number, lon: number): Promise<KakaoAddress | null> => {
  const res = await fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`, {
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAKO_REST_API_KEY}`,
    },
  });

  if (!res.ok) {
    throw new Error("카카오 주소 변환 실패");
  }

  const data = await res.json();

  return data.documents?.[0]?.address ?? null;
};
