import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

export default function App() {
  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState("");

  function handleQuery(val) {
    setQuery(val);
  }

  useEffect(
    function () {
      async function getLocation() {
        try {
          const res = fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5&language=en&format=json`
          );

          const resp = await res;
          if (!resp.ok) throw new Error("Unable to fetch");
          const data = await resp.json();

          setLocations(data.results);
        } catch (err) {
          console.error(err.message);
        }
      }

      if (!query.length) {
        setLocations([]);
        return;
      }

      getLocation();
    },
    [query]
  );

  return (
    <div className="box-border font-mono-Monaco ">
      <Navbar locations={locations} query={query} onQuery={handleQuery} />
    </div>
  );
}
