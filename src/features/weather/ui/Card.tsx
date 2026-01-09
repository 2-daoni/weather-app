type CardType = {
  data: any;
};

const Card = ({ data }: CardType) => {
  console.log("main", data);
  const weather_description = data?.weather[0]?.description;
  const { feels_like, humidity, temp, temp_max, tamp_min, speed } = data?.main ?? {};
  return (
    <div>
      <p>오늘의 날씨는 {weather_description}입니다.</p>
      <p>온도 : {temp}</p>
      <p>습도 : {humidity}</p>
    </div>
  );
};

export default Card;
