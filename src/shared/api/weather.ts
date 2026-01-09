type GetWeatherParams = {
  lat: number;
  lon: Number;
};

export const getWeather = async ({ lat, lon }: GetWeatherParams) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("날씨 데이터를 불러오지 못했습니다");
  }

  return res.json();
};
