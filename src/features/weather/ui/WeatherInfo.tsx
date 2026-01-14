import { useLocation } from "react-router-dom";
import { HourlyWeatherSlider } from "./HourlyWeatherSlider";
import { twMerge } from "tailwind-merge";

type WeatherType = {
  weather: any;
};

const WeatherInfo = ({ weather }: WeatherType) => {
  const currentWeather = weather?.current;
  const dailyWeather = weather?.daily[0] ?? {};
  const hourlyWeather = weather?.hourly;

  const { description, icon } = currentWeather?.weather[0] ?? {};

  const location = useLocation();

  const { name, isDetail } = location.state ?? {};

  const iconUrl = (icon: any) => "https://openweathermap.org/img/wn/" + icon + "@2x.png";

  // 위치, 날씨정보 (현재 기온, 당일의 최저기온, 최고기온, 시간대별 기온)
  return (
    <div
      className={twMerge("flex mt-10 flex-wrap items-center justify-center gap-8", isDetail ? "flex-col" : "flex-row")}
    >
      {isDetail && <div>{name}</div>}
      <div className="flex flex-col text-white">
        <div className="relative mx-auto">
          <img src={iconUrl(icon)} className="w-20 h-20 relative right-2" alt="icon" />
          <p className="text-[24px] font-medium  absolute top-2 left-12">{currentWeather?.temp}°</p>
        </div>
        <p className="text-[14px]">오늘 날씨는 {description}이에요.</p>

        <div className="flex flex-row justify-center gap-1">
          <p className="text-[10px]">
            최저 <span className="text-[12px]">{dailyWeather?.temp?.min}°</span>
          </p>
          <p className="text-[10px]">
            최고 <span className="text-[12px]">{dailyWeather?.temp?.max}°</span>
          </p>
        </div>
      </div>
      <div className={twMerge("flex-1 min-w-50 ", isDetail ? "max-w-[70%]" : "")}>
        {HourlyWeatherSlider(hourlyWeather?.slice(0, 24))}
      </div>
    </div>
  );
};

export default WeatherInfo;
