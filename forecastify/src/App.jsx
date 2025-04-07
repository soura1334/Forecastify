import {  useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import WeatherData from "./components/WeatherData";

export default function App() {
  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState("");
  const [selId, setSelId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastID, setLastID] = useState(null);

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
        return;
      }

      getLocation();
    },
    [query]
  );

  useEffect(()=> {
    if(selId){
      setLastID(selId);
    }
  }, [selId]);

  const active = selId || lastID;

  function handleQuery(val) {
    setQuery(val);
  }

  function handleSelId(id) {
    setSelId(id);
  }

  return (
    <div className="box-border font-mono-Monaco bg-[#FDF7E4]">
      <Navbar
        locations={locations}
        query={query}
        onQuery={handleQuery}
        onSelId={handleSelId}
        selId={selId}
        isLoading={isLoading}
      />
      {active ? <WeatherData locations={locations} selId={selId} active={active} /> : <Greet />}
      <Footer />
    </div>
  );
}

function Footer(){
  return <div className="bg-[#BBAB8C] bottom-0 p-3 text-center w-full">
    <p>Powered by <a href="https://open-meteo.com/">Open-Meteo</a> </p>
    <p>&copy; 2025 Forecastify. All Rights Reserved</p>
  </div>
}

function Greet() {
  return (
    <div className="bg-[#DED0B6] border-none rounded-lg p-5 m-5 text-center p-57 content-center">
      <p className="text-4xl">Search a location to get started!</p>
    </div>
  );
}
