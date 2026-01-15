import { useLocation } from "react-router-dom";
import { HourlyWeatherSlider } from "./HourlyWeatherSlider";
import { twMerge } from "tailwind-merge";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { useEffect, useState } from "react";
import { formatRegion } from "@/shared/lib/formatRegion";

type WeatherType = {
  weather: any;
  lat?: number;
  lon?: number;
};

const WeatherInfo = ({ weather, lat, lon }: WeatherType) => {
  const currentWeather = weather?.current;
  const dailyWeather = weather?.daily?.[0];
  const hourlyWeather = weather?.hourly;

  const { description, icon } = currentWeather?.weather?.[0] ?? {};

  const [value, setValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const location = useLocation();
  const { name, isDetail } = location.state ?? {};

  const { getFavoriteNickname, updateFavoriteNickname, isFavorite } = useFavoriteStore();

  const isFav = lat !== undefined && lon !== undefined ? isFavorite(lat, lon) : false;

  const nicknameFromStore = lat !== undefined && lon !== undefined ? getFavoriteNickname(lat, lon) : undefined;

  const displayName = nicknameFromStore ?? name ?? formatRegion(weather?.addressName ?? "");

  useEffect(() => {
    if (isDetail) {
      setValue(displayName);
    }
  }, [displayName, isDetail]);

  const saveNickname = () => {
    if (!lat || !lon || !isFav) {
      setIsEditing(false);
      return;
    }

    updateFavoriteNickname(lat, lon, value.trim() || undefined);

    setIsEditing(false);
  };

  const iconUrl = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div
      className={twMerge("flex mt-10 flex-wrap items-center justify-center gap-8", isDetail ? "flex-col" : "flex-row")}
    >
      {isDetail && (
        <>
          {isEditing ? (
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={saveNickname}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === "Enter") saveNickname();
                if (e.key === "Escape") {
                  setValue(displayName);
                  setIsEditing(false);
                }
              }}
              placeholder={formatRegion(displayName)}
              className="border-b bg-transparent outline-none text-white text-lg font-semibold text-center"
            />
          ) : (
            <p
              onClick={() => {
                if (isFav) setIsEditing(true);
              }}
              className={twMerge("text-lg font-semibold text-white", isFav ? "cursor-pointer" : "cursor-default")}
            >
              {displayName}
            </p>
          )}
        </>
      )}

      <div className="flex flex-col text-white">
        <div className="relative mx-auto">
          <img src={iconUrl(icon)} className="w-20 h-20 relative right-2" alt="icon" />
          <p className="text-[24px] font-medium absolute top-2 left-12">{currentWeather?.temp}°</p>
        </div>

        <p className="text-[14px]">오늘 날씨는 {description}이에요.</p>

        <div className="flex flex-row justify-center gap-2">
          <p className="text-[10px]">
            최저 <span className="text-[12px]">{dailyWeather?.temp?.min}°</span>
          </p>
          <p className="text-[10px]">
            최고 <span className="text-[12px]">{dailyWeather?.temp?.max}°</span>
          </p>
        </div>
      </div>

      <div className={twMerge("flex-1 min-w-75", isDetail ? "max-w-[70%]" : "")}>
        {HourlyWeatherSlider(hourlyWeather?.slice(0, 24))}
      </div>
    </div>
  );
};

export default WeatherInfo;
