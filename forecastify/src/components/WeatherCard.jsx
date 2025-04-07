import Loader from "./Loader";
import CardContent from "./CardContent";
import MetricsGrid from "./MetricsGrid";

const weathermap = {
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
  const date = timeValue && !isNaN(new Date(timeValue))
  ? new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(timeValue)).split(',')
  : ["", "", ""];

    

  const mintemp = wdata?.daily?.temperature_2m_min[0]
    ? Math.floor(wdata?.daily?.temperature_2m_min[0])
    : "";
  const maxtemp = wdata?.daily?.temperature_2m_max[0]
    ? Math.floor(wdata?.daily?.temperature_2m_max[0])
    : "";
  const weathCode = wdata?.current?.weather_code;

  const condn = weathermap[weathCode];

  if (weathCode === 0) imgText = "/sunny.png";
  else if (weathCode >= 1 && weathCode <= 3) imgText = "/cloudy.png";
  else if (weathCode >= 51 && weathCode <= 67) imgText = "/rainy.png";
  else if (weathCode >= 71 && weathCode <= 77) imgText = "/snowy.png";
  else if (weathCode >= 80) imgText = "/rainy.png";
  
  return (
    <>
      {active ? (
        <div className="bg-[#DED0B6] rounded-lg p-5 m-5 grid grid-cols-2 gap-10 ">
          <div className="border-none rounded-lg w-full bg-[#FAEED1] ">
            {isLoading ? (
              <Loader />
            ) : (
              <CardContent
                imgText={imgText}
                selectedLocation={selectedLocation}
                wdata={wdata}
                date={date}
                condn={condn}
                mintemp={mintemp}
                maxtemp={maxtemp}
              />
            )}
          </div>
          {!isLoading && <div className="rounded-lg w-full bg-[#FAEED1]"><MetricsGrid wdata={wdata} /></div>}
        </div>
      ) : (
        <Greet />
      )}
    </>
  );
}

function Greet() {
  return (
    <div className="bg-[#DED0B6] border-none rounded-lg p-5 m-5 text-center p-57 content-center">
      <p className="text-4xl">Search a location to get started!</p>
    </div>
  );
}
