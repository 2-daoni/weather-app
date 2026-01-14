import type { KakaoAddress } from "@/shared/api/reverseGeocode";
import { HourlyWeatherSlider } from "./HourlyWeatherSlider";

type DetailType = {
  weather: any;
  // address: KakaoAddress | null;
};

const Detail = ({ weather }: DetailType) => {
  const currentWeather = weather?.current;
  const dailyWeather = weather?.daily[0] ?? {};
  const hourlyWeather = weather?.hourly;

  console.log("weather", weather);
  const { description, icon } = currentWeather?.weather[0] ?? {};

  const iconUrl = (icon: any) => "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  console.log("dailyWeather", dailyWeather);
  console.log("currentWeather", currentWeather);
  console.log("forecastWeather", hourlyWeather);

  // 날씨 정보 없을 경우 "해당 장소의 정보가 제공되지 않습니다."

  // 위치, 날씨정보 (현재 기온, 당일의 최저기온, 최고기온, 시간대별 기온)
  return (
    <div>
      <img src={iconUrl(icon)} className="w-8 h-8" alt="icon" />
      <p>오늘의 날씨는 {description}입니다.</p>
      <p>온도 : {currentWeather?.temp}°</p>
      <p>최저온도 : {dailyWeather?.temp?.min}°</p>
      <p>최고온도 : {dailyWeather?.temp?.max}°</p>

      {HourlyWeatherSlider(hourlyWeather?.slice(0, 24))}
    </div>
  );
};

export default Detail;
