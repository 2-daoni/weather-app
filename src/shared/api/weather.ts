type GetWeatherParams = {
  lat: number;
  lon: Number;
};

export const getWeather = async ({ lat, lon }: GetWeatherParams) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP;

  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("날씨 데이터를 불러오지 못했습니다");
  }

  return res.json();
};

// 3시간단위 예측 날씨
export const getForecastWeatherByCoords = async ({ lat, lon }: GetWeatherParams) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP;

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("날씨 데이터를 불러오지 못했습니다");
  }

  return res.json();
};

export const getForecastWeatherByQuery = async (query: string) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${query}&lang=kr&units=metric&appid=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("날씨 정보 없음");
  }

  return res.json();
};

// 현재날씨
export const getCurrentWeatherByCoords = async ({ lat, lon }: GetWeatherParams) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=kr&appid=${apiKey}`
  );

  if (!res.ok) throw new Error("현재 날씨 조회 실패");

  return res.json();
};

export const getCurrentWeatherByQuery = async (query: string) => {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=kr&units=metric&appid=${apiKey}`
  );

  if (!res.ok) {
    throw new Error("날씨 정보 없음");
  }

  return res.json();
};

export const getWeatherBundleByCoords = async (params: GetWeatherParams) =>
  Promise.all([getCurrentWeatherByCoords(params), getForecastWeatherByCoords(params)]);

export const getWeatherBundleByQuery = async (query: string) =>
  Promise.all([getCurrentWeatherByQuery(query), getForecastWeatherByQuery(query)]);
