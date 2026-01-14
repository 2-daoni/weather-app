import { useFavoritesWeather } from "../model/useFavoriteWeather";
import Card from "./Card";

const Favorite = () => {
  const { data } = useFavoritesWeather();

  return (
    <div className="mt-8">
      <p className="text-[16px] font-medium">즐겨찾는 장소</p>
      <div className="grid gap-4 mt-2 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        {data.map((item) => (
          <Card key={`${item.lat}-${item.lon}`} data={item.weather} address={item} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
