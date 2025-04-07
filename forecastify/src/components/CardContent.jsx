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
  iconMap
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
        className={`w-full max-w-200 aspect-[10/3] rounded-tl-lg rounded-tr-lg bg-cover bg-center px-4 py-2 flex justify-between `}
        style={{ backgroundImage: `url(${imgText})` }}
      >
        <div>
          <div className="flex items-center gap-2">
            <p className="text-3xl">{name}</p>
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
            {Math.round(curr?.temperature_2m)}&deg;C
          </p>
          <p className="my-2">
            Feels like {Math.round(curr?.apparent_temperature)}&deg;C
          </p>
          <p className="my-2">
            {`${maxtemp}`}&deg;C / {`${mintemp}`}&deg;C
          </p>
          <p>{curr?.is_day === 0 && condn === "Sunny" ? "Clear" : condn}</p>
        </div>
        <div className="text-lg">
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
