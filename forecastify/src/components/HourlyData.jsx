export default function HourlyData({ hourly,iconMap }) {
  return (
    <div className="grid grid-cols-6 justify-between m-2 bg-[#DED0B6] rounded-lg ">
      {Array.from({ length: 6 }, (_, i) => i).map((num) => (
        <HourlyWidget
          key={num}
          index={num}
          hourly={hourly}
          iconMap = {iconMap}
        />
      ))}
    </div>
  );
}

function HourlyWidget({ index, hourly, iconMap }) {
  const temp = hourly ? hourly.temperature_2m[index] : 0;
  const preci = hourly ? hourly.precipitation_probability[index] : 0;
  const iconURL = "/icons/" + ((hourly && hourly.is_day[index]) ? "day/" : "night/") + iconMap[hourly && hourly.weather_code[index]] + ".png";

  const now =
    hourly &&
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(hourly.time[index]));

  return (
    <div className="lg:m-5 m-2 text-center content-center lg:text-base text-xs">
      <p>{now}</p>
      <img src={iconURL} className="lg:h-15 h-7 my-2" alt="weather-icon" />
      <p className="mb-3">{Math.round(temp)}&deg;C</p>
      <img
        src="/icons/precipitation.png"
        className="lg:h-11 h-6 justify-self-center "
        alt="precipitation-icon"
      />
      <span>{preci}%</span>
    </div>
  );
}
