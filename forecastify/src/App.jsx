import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import WeatherData from "./components/WeatherData"

export default function App() {
  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState("");
  const [selId, setSelId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getLocation() {
        try {
          setSelId(null);
          setIsLoading(true);
          const res = fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
          );

          const resp = await res;
          if (!resp.ok) throw new Error("Unable to fetch");
          const data = await resp.json();

          setLocations(data.results);
        } catch (err) {
          console.error(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (!query.length) {
        setLocations([]);
        setIsLoading(false);
        setSelId(null);
        return;
      }

      getLocation();
    },
    [query]
  );

  function handleQuery(val) {
    setQuery(val);
  }

  function handleSelId(id) {
    setSelId(id);
  }

  return (
    <div className="box-border font-mono-Monaco bg-[#FDF7E4] h-[100vh]">
      <Navbar
        locations={locations}
        query={query}
        onQuery={handleQuery}
        onSelId={handleSelId}
        selId={selId}
      />
      {<WeatherData locations={locations} selId={selId} />}
    </div>
  );
}


