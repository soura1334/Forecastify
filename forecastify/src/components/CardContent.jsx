import { useEffect, useState } from "react";
import HourlyData from "./HourlyData";

export default function CardContent({
  imgText,
  selectedLocation,
  wdata,
  mintemp,
  maxtemp,
  condn,
  date,
  iconMap,
}) {
  const [name, setName] = useState(
    selectedLocation ? selectedLocation?.name : ""
  );

  useEffect(() => {
    if (selectedLocation) {
      setName(selectedLocation.name);
    }
  }, [selectedLocation]);

  const hourly = wdata ? wdata?.hourly : {};
  const curr = wdata ? wdata?.current : {};

  const timestr =
    hourly &&
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(curr.time));

  return (
    <>
      <div
        className={`w-full rounded-t-lg bg-cover bg-center px-4 py-2 flex gap-5 justify-between `}
        style={{ backgroundImage: `url(${imgText})` }}
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="lg:text-3xl text-2xl">{name}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Filled"
              viewBox="0 0 24 24"
              className="lg:h-6 h-4"
            >
              <path d="M12,.042a9.992,9.992,0,0,0-9.981,9.98c0,2.57,1.99,6.592,5.915,11.954a5.034,5.034,0,0,0,8.132,0c3.925-5.362,5.915-9.384,5.915-11.954A9.992,9.992,0,0,0,12,.042ZM12,14a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z" />
            </svg>
          </div>
          <div className="flex flex-col lg:gap-3 gap-4">
            <p className="lg:text-4xl text-2xl ">
              {Math.round(curr?.temperature_2m)}&deg;C
            </p>
            <p className="lg:text-base text-sm">
              Feels like {Math.round(curr?.apparent_temperature)}&deg;C
            </p>
            <p className="lg:text-base text-sm">
              {`${maxtemp}`}&deg;C / {`${mintemp}`}&deg;C
            </p>
            <p className="lg:text-base text-sm">
              {curr?.is_day === 0 && condn === "Sunny" ? "Clear" : condn}
            </p>
          </div>
        </div>
        <div className="lg:text-lg text-sm">
          <p>{date[0]}</p>
          <p>
            {date[1]},{date[2]}
          </p>
          <p className="text-sm mt-25">Last Updated: {timestr}</p>
        </div>
      </div>
      <HourlyData hourly={hourly} iconMap={iconMap} />
    </>
  );
}
