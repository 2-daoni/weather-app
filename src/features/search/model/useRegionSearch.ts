import { useMemo, useState } from "react";
import districts from "@/shared/assets/korea_districts.json";

export const useRegionSearch = () => {
  const [keyword, setKeyword] = useState("");

  const normalizeRegion = (value: string) => {
    return value
      .replace(/-/g, "") // 하이픈 제거
      .replace(/\s/g, "") // 공백 제거
      .toLowerCase(); // 안전용
  };

  const normalizedKeyword = normalizeRegion(keyword);

  const filteredRegions = useMemo(() => {
    if (!normalizedKeyword) return [];

    return districts.filter((region) => {
      return normalizeRegion(region).includes(normalizedKeyword);
    });
  }, [normalizedKeyword]);

  return {
    keyword,
    setKeyword,
    filteredRegions,
  };
};
