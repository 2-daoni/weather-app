"use client";

import { useState } from "react";
import { SearchBar } from "@/features/search/ui/SearchBar";
import { useWeather } from "@/features/weather/model/useWeather";
import WeatherInfo from "@/features/weather/ui/WeatherInfo";
import { useReverseGeocode } from "@/shared/hooks/useReverseGeocode";
import { useGeolocation } from "@/shared/lib/useGeolocation";
import Favorite from "@/features/weather/ui/Favorite";
import Empty from "@/features/weather/ui/Empty";

import LocationIcon from "@/assets/location.svg";
import LoadingSpinner from "@/features/weather/ui/Spinner";

type SelectedLocation = {
  name: string;
  lat: number;
  lon: number;
};

const HomePage = () => {
  const { lat: userLat, lon: userLon } = useGeolocation();

  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const [resetSearch, setResetSearch] = useState<number>(0);

  const lat = selectedLocation?.lat ?? userLat;
  const lon = selectedLocation?.lon ?? userLon;

  const { address } = useReverseGeocode(lat, lon);
  const { data: weatherData, isLoading, isError } = useWeather(lat, lon);

  function WeatherContent() {
    if (isLoading) return <LoadingSpinner />;
    if (isError || !weatherData) return <Empty />;
    return <WeatherInfo weather={weatherData} />;
  }

  return (
    <div className="max-w-[70%] mx-auto">
      <div className="w-[80%] mx-auto flex flex-row flex-wrap space-x-2 gap-2">
        <div className="flex flex-row items-center min-w-fit text-white text-[12px]">
          <img
            src={LocationIcon}
            alt="location"
            className="w-4 h-4 mr-1 cursor-pointer"
            onClick={() => {
              //내위치 다시 불러오기
              setSelectedLocation(null);
              setResetSearch((prev) => prev + 1);
            }}
          />
          {address?.region_1depth_name + " " + address?.region_2depth_name + " " + address?.region_3depth_name}
        </div>
        {/* 검색창 */}
        <SearchBar onSelect={setSelectedLocation} resetSignal={resetSearch} />
      </div>

      {/* 날씨 정보 */}
      {WeatherContent()}

      {/* 즐겨찾기 날씨 */}
      <Favorite />
    </div>
  );
};

export default HomePage;
