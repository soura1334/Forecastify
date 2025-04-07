import Loader from "./Loader";
import CardContent from "./CardContent";
import MetricsGrid from "./MetricsGrid";
import SevenForecast from "./SevenForecast";

const iconMap = {
  0: "sunny",
  1: "sunny",
  2: "partly-cloudy",
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
  80: "rainy",
  81: "rainy",
  82: "rainy",
  85: "snowy",
  86: "snowy",
  95: "stormy",
  96: "stormy",
  99: "stormy",
};

const weatherMap = {
  0: "Sunny",
  1: "Sunny",
  2: "Partly Cloudy",
  3: "Cloudy",
  45: "Foggy",
  48: "Foggy",
  51: "Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  61: "Slight Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  66: "Slight Rain",
  67: "Heavy Rain",
  71: "Slight Snowfall",
  73: "Moderate Snowfall",
  75: "Heavy Snowfall",
  77: "Snow Grains",
  80: "Light Showers",
  81: "Moderate Showers",
  82: "Heavy Showers",
  95: "Thunderstorms",
  96: "Thunderstorms",
  99: "Thunderstorms",
};

export default function WeatherCard({
  selectedLocation,
  isLoading,
  wdata,
  active,
}) {
  let imgText = "";
  const timeValue = wdata?.current?.time;
  const date =
    timeValue && !isNaN(new Date(timeValue))
      ? new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
          .format(new Date(timeValue))
          .split(",")
      : ["", "", ""];

  const mintemp = wdata?.daily?.temperature_2m_min[0]
    ? Math.floor(wdata?.daily?.temperature_2m_min[0])
    : "";
  const maxtemp = wdata?.daily?.temperature_2m_max[0]
    ? Math.floor(wdata?.daily?.temperature_2m_max[0])
    : "";
  const weathCode = wdata?.current?.weather_code;

  const condn = weatherMap[weathCode];

  if (weathCode === 0) imgText = "/sunny.png";
  else if (weathCode >= 1 && weathCode <= 3) imgText = "/cloudy.png";
  else if (weathCode >= 51 && weathCode <= 67) imgText = "/rainy.png";
  else if (weathCode >= 71 && weathCode <= 77) imgText = "/snowy.png";
  else if (weathCode >= 80) imgText = "/rainy.png";

  return (
    <>
      {active && (isLoading ? <Loader cls="h-[73vh] bg-[#DED0B6] m-5 content-center" /> : (
        <div className="bg-[#DED0B6] rounded-lg p-5 m-5 grid grid-cols-2 gap-10 h-[73vh]">
          <div className="border-none rounded-lg w-full bg-[#FAEED1] ">
            {!isLoading && (
              <CardContent
                imgText={imgText}
                selectedLocation={selectedLocation}
                wdata={wdata}
                date={date}
                condn={condn}
                mintemp={mintemp}
                maxtemp={maxtemp}
                iconMap={iconMap}
              />
            )}
          </div>
          {!isLoading && (
            <div className="rounded-lg w-full bg-[#FAEED1] content-evenly grid grid-cols-1 ">
              <MetricsGrid wdata={wdata} />
              <SevenForecast wdata={wdata} iconMap={iconMap} />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

