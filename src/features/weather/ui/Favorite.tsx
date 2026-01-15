import { useFavoritesWeather } from "../model/useFavoriteWeather";
import Card from "./Card";

import EmptyIcon from "@/assets/empty-favorite.svg";

const Favorite = () => {
  const { data } = useFavoritesWeather();

  return (
    <div className="mt-12">
      <p className="text-[16px] font-medium">즐겨찾는 장소</p>
      {data.length === 0 ? (
        <div className="text-center flex items-center flex-col text-sm text-white/70 py-6">
          <img src={EmptyIcon} alt="empty" className="w-7 h-7" />
          <p className="text-base">즐겨찾는 장소가 없어요</p>
          <p className="mt-1">자주 확인할 지역을 추가해보세요</p>
        </div>
      ) : (
        <div className="grid w-full  gap-4 mt-2 grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
          {data.map((item) => (
            <Card key={`${item.lat}-${item.lon}`} data={item.weather} address={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
