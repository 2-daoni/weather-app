"use client";

import { useEffect, useState } from "react";
import { formatRegion } from "@/shared/lib/formatRegion";
import { useRegionSearch } from "../model/useRegionSearch";
import { fetchGeoLocation } from "@/shared/hooks/useLocationSearch";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import toast from "react-hot-toast";
import EmptyStarIcon from "@/assets/empty-star.svg";
import StarIcon from "@/assets/star.svg";
import DeleteIcon from "@/assets/delete.svg";

type GeoLocation = {
  name: string;
  lat: number;
  lon: number;
};

interface SearchBarProps {
  onSelect: (location: GeoLocation) => void;
  resetSignal: number;
}

export const SearchBar = ({ onSelect, resetSignal }: SearchBarProps) => {
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

  useEffect(() => {
    setKeyword("");
  }, [resetSignal]);

  return (
    <div className="relative flex-1">
      <div className="relative flex items-center flex-row">
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
          className="w-full min-w-50 border-white/50 border focus:outline-none rounded-3xl text-[14px] px-3 py-2"
        />
        {keyword !== "" && (
          <img
            src={DeleteIcon}
            alt="delete"
            className="absolute w-5 h-5 right-3 cursor-pointer"
            onClick={() => setKeyword("")}
          />
        )}
      </div>

      {isOpen && filteredRegions.length > 0 && (
        <ul className="absolute z-10 mt-2 bg-white w-full max-h-60 overflow-auto rounded border">
          {filteredRegions.map((region) => {
            const geo = geoCache[region];
            const isFav = geo ? isFavorite(geo.lat, geo.lon) : false;

            return (
              <li
                key={region}
                onClick={() => handleSelect(region)}
                className="flex items-center justify-between px-3 text-[#8F8C8C] py-2 hover:text-black cursor-pointer"
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
                      const success = addFavorite(location);
                      if (!success) {
                        toast.error("즐겨찾기는 최대 6개까지 가능합니다.");
                      }
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
