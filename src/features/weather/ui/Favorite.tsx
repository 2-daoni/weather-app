import { useFavoritesWeather } from "../model/useFavoriteWeather";
import Card from "./Card";

const Favorite = () => {
  const { data } = useFavoritesWeather();

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {data.map((item) => (
        <Card key={`${item.lat}-${item.lon}`} data={item.weather} address={item} />
      ))}
    </div>
  );
};

export default Favorite;
