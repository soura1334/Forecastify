const iconMap = {
  0: "sunny",
  1: "partly-cloudy",
  2: "cloudy",
  3: "cloudy",
  45: "cloudy",
  48: "cloudy",
  51: "rainy",
  53: "rainy",
  55: "rainy",
  61: "rainy",
  63: "rainy",
  65: "rainy",
  66: "rainy",
  67: "rainy",
  71: "snowy",
  73: "snowy",
  75: "snowy",
  77: "snowy",
  80: "stormy",
  81: "stormy",
  82: "stormy",
  95: "stormy",
  96: "stormy",
  99: "stormy",
};

export default function HourlyData({ hourly, timezone }) {
  return (
    <div className="flex justify-between m-2 bg-[#DED0B6] border-none rounded-lg">
      {Array.from({ length: 6 }, (_, i) => i).map((num) => (
        <HourlyWidget
          key={num}
          index={num}
          hourly={hourly}
          timezone={timezone}
        />
      ))}
    </div>
  );
}

function HourlyWidget({ index, hourly }) {
  const temp = hourly ? hourly.temperature_2m[index] : 0;
  const preci = hourly ? hourly.precipitation_probability[index] : 0;
  const iconURL = "/icons/" + ((hourly && hourly.is_day[index]) ? "day/" : "night/") + iconMap[hourly && hourly.weather_code[index]] + ".png";
  console.log(iconURL)

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
