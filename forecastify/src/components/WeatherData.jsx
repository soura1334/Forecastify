import { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";

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
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,is_day,weather_code,,relative_humidity_2m,uv_index,pressure_msl,wind_gusts_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto&hourly=temperature_2m,precipitation_probability,is_day,weather_code&forecast_days=1&forecast_hours=6`
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
      active={active}
    />
  );
}
