import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

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

export default function WeatherData({ selId, locations, active }) {
  const selectedLocation = locations && locations.find((el) => el.id === selId);
  const [wdata, setWData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getData() {
        setIsLoading(true);
        const lat = selectedLocation ? selectedLocation.latitude : "";
        const lon = selectedLocation ? selectedLocation.longitude : "";
        const res = fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,is_day,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto&hourly=temperature_2m,precipitation_probability,is_day,weather_code&forecast_days=1&forecast_hours=6`
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

  return (
    <WeatherCard
      isLoading={isLoading}
      wdata={wdata}
      selectedLocation={selectedLocation}
      weathermap={weathermap}
      active={active}
    />
  );
}
