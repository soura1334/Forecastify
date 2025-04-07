const uvMap = {
  0: "Low",
  1: "Low",
  2: "Low",
  3: "Moderate",
  4: "Moderate",
  5: "Moderate",
  6: "High",
  7: "High",
  8: "Very High",
  9: "Very High",
  10: "Very High",
};

export default function MetricsGrid({ wdata }) {
  const curr = wdata && wdata.current;
  const { pressure_msl, uv_index, relative_humidity_2m, wind_gusts_10m } = curr
    ? curr
    : {
        pressure_msl: 0,
        uv_index: 0,
        relative_humidity_2m: 0,
        wind_gusts_10m: 0,
      };

  let uv = Math.round(uv_index) <= 10 ? uvMap[Math.round(uv_index)] : "Extreme";

  return (
    <div className="grid grid-cols-2 justify-items-center gap-2 px-2 pb-2 lg:text-base text-xs">
      <MetricData metric="pressure" val={pressure_msl + " mb"} />
      <MetricData metric="uV index" val={uv} />
      <MetricData metric="humidity" val={relative_humidity_2m + "%"} />
      <MetricData metric="wind" val={wind_gusts_10m + " km/h"} />
    </div>
  );
}

function MetricData({ metric, val }) {
  return (
    <div className="rounded-lg lg:p-4 p-1 w-full flex bg-[#DED0B6]  ">
      <div className="capitalize flex lg:gap-3 gap-1 mr-1">
        <img src={`/icons/${metric}.png`} alt="metric_icon" className="lg:h-7 h-5" />
        <p>{`${metric}:`}</p>
      </div>
      <p>{" " + val}</p>
    </div>
  );
}
