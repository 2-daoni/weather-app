export const getWeather = async (lat: number, lon: number) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=API_KEY&units=metric`
  );

  if (!res.ok) {
    throw new Error("날씨 데이터를 불러오지 못했습니다");
  }

  return res.json();
};
