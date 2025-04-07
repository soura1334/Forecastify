const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function SevenForecast({wdata, iconMap}){
    const now =
    wdata.current &&
    new Intl.DateTimeFormat("en-US", {
      weekday: "long"
    }).format(new Date(wdata?.current?.time));
    
    const ind = days.indexOf(now);

    const daily = wdata && wdata.daily;
    
    return <div className="px-2">
        <div className="bg-[#DED0B6] rounded-lg lg:p-5 p-2 grid grid-cols-1 gap-3">
        {Array.from({length: 7}, (_,i) => i).map((num)=> <ForecastData key={num} index={num+ind} numIndex={ind} daily={daily} iconMap={iconMap} />)}
        </div>
    </div>
}

function ForecastData({index,daily, numIndex, iconMap}){
    const arrInd = index-numIndex;
    const day = arrInd === 0 ? "Today" : days[index % 7];

    return <div className="lg:text-lg text-xs grid grid-cols-3 ">
        <p>{day}</p>
        <div className="grid grid-cols-4 lg:gap-5 col-span-2">
            <img src="/icons/precipitation.png" className="lg:h-7 h-4" />
            <p className="lg:text-sm">{daily?.precipitation_probability_max[arrInd]}%</p>
            <img src={`/icons/day/${iconMap[daily?.weather_code[arrInd]]}.png`} className="lg:h-7 h-5"/>
            <p>{Math.round(daily?.temperature_2m_max[arrInd])}&deg; {Math.round(daily?.temperature_2m_min[arrInd])}&deg;</p>
        </div>
    </div>
}