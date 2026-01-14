"use client";

import { useEffect, useState } from "react";
import { formatRegion } from "@/shared/lib/formatRegion";
import { useRegionSearch } from "../model/useRegionSearch";
import { fetchGeoLocation } from "@/shared/hooks/useLocationSearch";
import { useFavoriteStore } from "@/store/useFavoriteStore";

import EmptyStarIcon from "@/assets/empty-star.svg";
import StarIcon from "@/assets/star.svg";

type GeoLocation = {
  name: string;
  lat: number;
  lon: number;
};

interface SearchBarProps {
  onSelect: (location: GeoLocation) => void;
}

export const SearchBar = ({ onSelect }: SearchBarProps) => {
  const { keyword, setKeyword, filteredRegions } = useRegionSearch();
  const [isOpen, setIsOpen] = useState(false);

  const [geoCache, setGeoCache] = useState<Record<string, GeoLocation>>({});

  const { addFavorite, removeFavorite, isFavorite } = useFavoriteStore();

  const getGeoCode = async (region: string): Promise<GeoLocation | null> => {
    if (geoCache[region]) {
      return geoCache[region];
    }

    const keyword = region.split("-").pop() ?? "";
    const geo = await fetchGeoLocation(keyword);
    if (!geo.length) return null;

    const location = {
      name: region,
      enName: geo[0].name,
      lat: geo[0].lat,
      lon: geo[0].lon,
    };

    setGeoCache((prev) => ({
      ...prev,
      [region]: location,
    }));

    return location;
  };

  const handleSelect = async (region: string) => {
    const location = await getGeoCode(region);
    if (!location) return;

    onSelect(location);

    setKeyword(formatRegion(region));
    setIsOpen(false);
  };

  useEffect(() => {
    const handler = () => setIsOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  console.log("isOpen", isOpen);
  console.log("filtered", filteredRegions);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        placeholder="지역명을 입력하세요"
        className="w-full bg-[#191919] text-[#8F8C8C] focus:outline-none placeholder:text-[#8F8C8C] rounded px-3 py-2"
      />

      {isOpen && filteredRegions.length > 0 && (
        <ul className="absolute z-10 mt-2 bg-[#191919] w-full max-h-60 overflow-auto rounded border">
          {filteredRegions.map((region) => {
            const geo = geoCache[region];
            const isFav = geo ? isFavorite(geo.lat, geo.lon) : false;

            return (
              <li
                key={region}
                onClick={() => handleSelect(region)}
                className="flex items-center justify-between px-3 text-[#8F8C8C] py-2 hover:bg-[#141414] cursor-pointer"
              >
                <span>{formatRegion(region)}</span>

                <img
                  src={isFav ? StarIcon : EmptyStarIcon}
                  alt="favorite"
                  className="w-4 h-4 cursor-pointer"
                  onClick={async (e) => {
                    e.stopPropagation();

                    const location = await getGeoCode(region);
                    if (!location) return;

                    if (isFavorite(location.lat, location.lon)) {
                      removeFavorite(location.lat, location.lon);
                    } else {
                      addFavorite(location);
                    }
                  }}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
