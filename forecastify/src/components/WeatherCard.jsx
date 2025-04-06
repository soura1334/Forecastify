import Loader from "./Loader";
import CardContent from "./CardContent";

export default function WeatherCard({
  selectedLocation,
  isLoading,
  wdata,
  weathermap,
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
        <div className="bg-[#DED0B6] border-none rounded-lg p-5 m-5 grid grid-cols-2 gap-10 h-[73vh]">
          <div className="border-none rounded-lg w-full max-w-200 bg-[#FAEED1]">
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
          <div className="border w-full max-w-200">hello</div>
        </div>
      ) : (
        <Greet />
      )}
    </>
  );
}

function Greet() {
  return (
    <div className="bg-[#DED0B6] border-none rounded-lg p-5 m-5 text-center h-[75vh] content-center">
      <p className="text-4xl">Search a location to get started!</p>
    </div>
  );
}
