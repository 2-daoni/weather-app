import { useWeather } from "@/features/weather/model/useWeather";
import Card from "@/features/weather/ui/Card";
import { useGeolocation } from "@/shared/lib/useGeolocation";

const HomePage = () => {
  const { lat, lon, loading: locationLoading, error: locationError } = useGeolocation();
  const { data, isLoading, isError } = useWeather(lat, lon);

  console.log("weather", data);
  console.log("desc", data?.weather[0]?.description);

  if (locationLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-full w-full bg-blue-50">
      <Card data={data} />
    </div>
  );
};

export default HomePage;
