"use client";

import { useState } from "react";
import { SearchBar } from "@/features/search/ui/SearchBar";
import { useWeather } from "@/features/weather/model/useWeather";
import Detail from "@/features/weather/ui/Detail";
import { useReverseGeocode } from "@/shared/hooks/useReverseGeocode";
import { useGeolocation } from "@/shared/lib/useGeolocation";
import Favorite from "@/features/weather/ui/Favorite";

import PointIcon from "@/assets/focus-points.png";
import LocationIcon from "@/assets/location.svg";

type SelectedLocation = {
  name: string;
  lat: number;
  lon: number;
};

const HomePage = () => {
  const { lat: userLat, lon: userLon, loading: locationLoading } = useGeolocation();

  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);

  const lat = selectedLocation?.lat ?? userLat;
  const lon = selectedLocation?.lon ?? userLon;

  const { address } = useReverseGeocode(lat, lon);
  const { data: weatherData } = useWeather(lat, lon);

  if (locationLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full bg-black h-screen p-4">
      {/* 📍 현재 위치로 되돌리기 */}
      <img
        src={PointIcon}
        alt="current location"
        className="w-4 h-4 cursor-pointer"
        onClick={() => {
          setSelectedLocation(null);
        }}
      />
      <div className="flex flex-row space-x-2">
        <div className="flex flex-row items-center min-w-fit text-white">
          <img src={LocationIcon} alt="location" className="w-5 h-5 mr-1" />
          {address?.region_1depth_name + " " + address?.region_2depth_name + " " + address?.region_3depth_name}
        </div>
        {/* 검색창 */}
        <SearchBar onSelect={setSelectedLocation} />
      </div>

      {/* 날씨 정보 */}
      <Detail weather={weatherData} />

      {/* 즐겨찾기 날씨 */}
      <Favorite />
    </div>
  );
};

export default HomePage;
