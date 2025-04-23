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
    <div className="box-border font-mono-Monaco bg-[#FDF7E4] flex flex-col min-h-screen ">
      <Navbar
        locations={locations}
        query={query}
        onQuery={handleQuery}
        onSelId={handleSelId}
        selId={selId}
        isLoading={isLoading}
      />
      <div className="flex-grow ">
      {active ? <WeatherData locations={locations} selId={selId} active={active} /> : <Greet />}
      </div>
      <Footer />
    </div>
  );
}

function Footer(){
  return <div className="bg-gradient-to-r from-[#BBAB8C] to-[#A08963] text-center w-full p-5">
    <p>Powered by <a href="https://open-meteo.com/">Open-Meteo</a> </p>
    <p>&copy; 2025 Forecastiify. All Rights Reserved</p>
  </div>
}

function Greet() {
  return (
    <div className="bg-linear-60 from-[#DED0B6] to-[#EBE5C2] rounded-lg m-5 text-center content-center lg:h-120 h-160">
      <p className="lg:text-4xl text-lg">Search a location to get started!</p>
    </div>
  );
}
