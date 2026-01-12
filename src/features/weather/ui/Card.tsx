type CardType = {
  data: any;
};

const Card = ({ data }: CardType) => {
  console.log("main", data);
  const { description, icon } = data?.weather[0] ?? {};
  const { feels_like, humidity, temp, temp_max, tamp_min, speed } = data?.main ?? {};

  console.log(data?.weather[0]);
  const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
  return (
    <div>
      <img src={iconUrl} className="w-8 h-8" alt="icon" />
      <p>오늘의 날씨는 {description}입니다.</p>
      <p>온도 : {temp}</p>
      <p>습도 : {humidity}</p>
    </div>
  );
};

export default Card;
