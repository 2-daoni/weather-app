import { useWeather } from "@/features/weather/model/useWeather";
import { useGeolocation } from "@/shared/lib/useGeolocation";

const Home = () => {
  const { lat, lon, loading: locationLoading, error: locationError } = useGeolocation();
  const { data, isLoading, isError } = useWeather(lat, lon);
  console.log("weather", data);
  if (locationLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>HOME</p>
    </div>
  );
};

export default Home;
