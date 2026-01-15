import { useNavigate, useSearchParams } from "react-router-dom";
import { useWeather } from "@/features/weather/model/useWeather";
import WeatherInfo from "@/features/weather/ui/WeatherInfo";
import LoadingSpinner from "@/features/weather/ui/Spinner";

import LeftArrowIcon from "@/assets/left-arrow.svg";

const WeatherPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const lat = params.get("lat");
  const lon = params.get("lon");

  const { data, isLoading } = useWeather(Number(lat), Number(lon));

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-[90%] mx-auto">
      <img src={LeftArrowIcon} alt="arrow" className="w-5 h-5 cursor-pointer" onClick={() => navigate("/")} />
      <WeatherInfo weather={data} lat={Number(lat)} lon={Number(lon)} />
    </div>
  );
};

export default WeatherPage;
