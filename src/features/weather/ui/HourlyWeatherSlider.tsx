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
        <span className="text-[14px]">{time}시</span>
        <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} className="w-14 h-14" alt="" />
        <span className="font-medium text-[18px]  ml-1">{Math.round(hour.temp)}°</span>
      </div>
    );
  };

  return (
    <div className="embla min-w-50 bg-white/10 p-5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl text-white">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {hourly?.map((h, index) => (
            <div className="embla__slide" key={h.dt}>
              <HourCard hour={h} />
              {hourly.length - 1 !== index && <div className="w-px h-[80%] bg-white/30 mt-3 ml-2" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
