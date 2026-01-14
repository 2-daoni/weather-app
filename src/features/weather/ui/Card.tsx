import EmptyStarIcon from "@/assets/empty-star.svg";
import StarIcon from "@/assets/star.svg";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { useEffect, useRef, useState } from "react";

type CardType = {
  data: any;
  address: any;
};

const Card = ({ data, address }: CardType) => {
  console.log("main", data);
  const {
    current: { temp, weather },
    daily,
  } = data;
  const min = daily[0]?.temp?.min;
  const max = daily[0]?.temp?.max;
  const { description, icon } = weather[0] ?? {};

  const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  const { addFavorite, removeFavorite, updateFavoriteNickname, isFavorite } = useFavoriteStore();

  const isFav = isFavorite(address.lat, address.lon);
  console.log("address", address);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFav) {
      removeFavorite(address.lat, address.lon);
    } else {
      addFavorite({
        name: address.address_name ?? "선택한 지역",
        lat: address.lat,
        lon: address.lon,
      });
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(address.nickname ?? name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const saveNickname = () => {
    if (!value.trim()) {
      setValue(address?.nickname ?? name);
      setIsEditing(false);
      return;
    }

    updateFavoriteNickname(address?.lat, address?.lon, value.trim());
    setIsEditing(false);
  };

  // 현재 날씨 정보, 당일의 기온(최저,최고)
  return (
    <div
      onClick={() => {
        // 카드 클릭시 상세 페이지로 이동
      }}
      className="border rounded-2xl  p-3"
    >
      {/* ⭐ 즐겨찾기 버튼 */}
      <img
        src={isFav ? StarIcon : EmptyStarIcon}
        alt="favorite"
        className="w-4 h-4 cursor-pointer"
        onClick={handleToggleFavorite}
      />
      <div className="mb-2">
        {isEditing ? (
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={saveNickname}
            onKeyDown={(e) => {
              if (e.key === "Enter") saveNickname();
              if (e.key === "Escape") {
                setValue(address?.nickname ?? name);
                setIsEditing(false);
              }
            }}
            className="border-b outline-none text-lg font-semibold"
          />
        ) : (
          <p
            onClick={() => isFav && setIsEditing(true)}
            className={`text-lg font-semibold ${isFav ? "cursor-pointer" : "cursor-default"}`}
          >
            {address?.nickname ?? name}
          </p>
        )}
      </div>
      {/* 장소의 이름 (별칭) 수정 기능 */}
      <p>{address?.name}</p>
      <img src={iconUrl} className="w-8 h-8" alt="icon" />
      <p>오늘의 날씨는 {description}입니다.</p>
      <p>온도 : {temp}°</p>
      <p>최고기온 : {max}°</p>
      <p>최저기온 : {min}°</p>
    </div>
  );
};

export default Card;
