import { useEffect, useState } from "react";

const weathermap = {
  0: "Sunny",
  1: "Cloudy",
  2: "Cloudy",
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

export default function WeatherData({ selId, locations }) {
  const selectedLocation = locations && locations.find((el) => el.id === selId);
  const [wdata, setWData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let imgText = "";

  useEffect(
    function () {
      async function getData() {
        setIsLoading(true);
        const lat = selectedLocation ? selectedLocation.latitude : "";
        const lon = selectedLocation ? selectedLocation.longitude : "";
        const res = fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`
        );
        const resp = await res;
        const data = await resp.json();

        setWData(data);
        setIsLoading(false);
      }
      if (!selectedLocation) return;
      getData();
    },
    [selectedLocation]
  );

  const date = wdata?.current?.time ? new Date(wdata?.current?.time + "Z")
    .toLocaleString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    .split(",") : ["","",""];

  const mintemp = wdata?.daily?.temperature_2m_min[0] ? Math.floor(wdata?.daily?.temperature_2m_min[0]) : "";
  const maxtemp = wdata?.daily?.temperature_2m_max[0] ? Math.floor(wdata?.daily?.temperature_2m_max[0]) : "";
  const weathCode = wdata?.current?.weather_code;

  const condn = weathermap[weathCode];

  if (weathCode === 0) imgText = "/sunny.png";
  else if (weathCode >= 1 && weathCode <= 3) imgText = "/cloudy.png";
  else if (weathCode >= 51 && weathCode <= 67) imgText = "/rainy.png";
  else if (weathCode >= 71 && weathCode <= 77) imgText = "/snowy.png";
  else if (weathCode >= 80) imgText = "/rainy.png";

  return (
    <div className="bg-[#DED0B6] h-[75vh] p-5 m-5 ">
      {isLoading ? <Loader /> : selId && <div
        className={`w-full max-w-200 aspect-[10/3] rounded-lg bg-cover bg-center px-4 py-2 flex justify-between`}
        style={{ backgroundImage: `url(${imgText})` }}
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="text-3xl">{selectedLocation?.name}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Filled"
              viewBox="0 0 24 24"
              className="h-6"
            >
              <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" />
            </svg>
          </div>
          <p className="text-4xl my-2">
            {wdata?.current?.temperature_2m}&deg;C
          </p>
          <p className="my-2">
            Feels like {wdata?.current?.apparent_temperature}&deg;C
          </p>
          <p className="my-2">
            {`${maxtemp}`}&deg;C / {`${mintemp}`}&deg;C
          </p>
          <p>{(wdata?.current?.is_day === 0 && condn === "Sunny") ? "Clear" : condn}</p>
        </div>
        <div className="text-lg">
          <p>{date[0]}</p>
          <p>
            {date[1]},{date[2]}
          </p>
        </div>
      </div>}
    </div>
  );
}

function Loader(){
  return <div>Loading...</div>
}