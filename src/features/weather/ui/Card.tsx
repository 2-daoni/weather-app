import { formatRegion } from "@/shared/lib/formatRegion";
import { useFavoriteStore } from "@/store/useFavoriteStore";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmptyStarIcon from "@/assets/empty-star.svg";
import StarIcon from "@/assets/star.svg";
import PencilIcon from "@/assets/pencil.svg";

type CardType = {
  data: any;
  address: any;
};

const Card = ({ data, address }: CardType) => {
  const navigate = useNavigate();
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
    const trimmed = value.trim();

    // 아무것도 입력 안 한 경우 별칭 제거
    if (!trimmed) {
      updateFavoriteNickname(address.lat, address.lon, undefined);
      setValue(address?.name);
    } else {
      updateFavoriteNickname(address.lat, address.lon, trimmed);
    }

    setIsEditing(false);
  };

  // 현재 날씨 정보, 당일의 기온(최저,최고)
  return (
    <div
      onClick={() => {
        if (isEditing) return;
        navigate(`/weather?lat=${address.lat}&lon=${address.lon}`, {
          state: {
            name: address.nickname ?? formatRegion(address.name),
            isDetail: true,
          },
        });
      }}
      className="border border-white/30 cursor-pointer bg-white/10 backdrop-blur-lg hover:bg-white/20 min-w-37.5 max-w-70 rounded-2xl text-[12px] p-3"
    >
      <div className="flex flex-row items-center">
        {/* 즐겨찾기 */}
        <img
          src={isFav ? StarIcon : EmptyStarIcon}
          alt="favorite"
          className="w-4 h-4 cursor-pointer"
          onClick={handleToggleFavorite}
        />
        {isEditing ? (
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={saveNickname}
            placeholder={formatRegion(address?.name)}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === "Enter") saveNickname();
              if (e.key === "Escape") {
                setValue(address?.nickname ?? formatRegion(address?.name));
                setIsEditing(false);
              }
            }}
            className=" outline-none text-[14px] font-semibold"
          />
        ) : (
          <p
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className={`text-[14px] font-semibold flex flex-row items-center ${
              isFav ? "cursor-pointer" : "cursor-default"
            }`}
          >
            {address?.nickname ?? formatRegion(address?.name)}
            <img src={PencilIcon} className="w-2 h-2 ml-1" alt="edit" />
          </p>
        )}
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="relative">
          <img src={iconUrl} className="w-12 h-12" alt="icon" />
          <p className="absolute font-medium text-10 left-8 top-2">{temp}°</p>
        </div>
        <p>오늘의 날씨는 {description}입니다.</p>
        <div className="flex flex-row gap-1">
          <p className="text-[10px]">
            최저 <span className="text-[12px]">{min}°</span>
          </p>
          <p className="text-[10px]">
            최고 <span className="text-[12px]">{max}°</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
