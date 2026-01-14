import useEmblaCarousel from "embla-carousel-react";

export function HourlyWeatherSlider(hourly: any[]) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const HourCard = ({ hour }: { hour: any }) => {
    const time = new Date(hour.dt * 1000).getHours();

    return (
      <div className="hour-card">
        <span className="hour">{time}시</span>
        <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} alt="" />
        <span className="temp">{Math.round(hour.temp)}°</span>
      </div>
    );
  };

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {hourly?.map((h) => (
            <div className="embla__slide" key={h.dt}>
              <HourCard hour={h} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
