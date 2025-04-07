export default function HourlyData({ hourly,iconMap }) {
  return (
    <div className="flex justify-between m-2 bg-[#DED0B6] border-none rounded-lg ">
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
    <div className="m-4  text-center content-center ">
      <p>{now}</p>
      <img src={iconURL} className="h-15 my-2" alt="weather-icon" />
      <p className="mb-3">{Math.round(temp)}&deg;C</p>
      <img
        src="/icons/precipitation.png"
        className="h-11 justify-self-center "
        alt="precipitation-icon"
      />
      <span>{preci}%</span>
    </div>
  );
}
