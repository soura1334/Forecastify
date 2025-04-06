import Loader from "./Loader";

export default function Navbar({ locations, query, onQuery, onSelId, selId, isLoading }) {
  return (
    <header className="bg-[#BBAB8C] grid grid-cols-5 gap-2 p-3">
      <Logo />
      <Search locations={locations} query={query} onQuery={onQuery} onSelId={onSelId} selId={selId} isLoading={isLoading}/>
    </header>
  );
}

function Logo() {
  return (
    <div className="flex">
      <img
        src="/icon.png"
        alt="forecastify logo"
        className="size-20"
      />
      <div className="ml-1">
        <h1 className="text-4xl font-semibold">Forecastify</h1>
        <p className="mt-1">Your weather wingman</p>
      </div>
    </div>
  );
}

function Search({ locations, query, onQuery, onSelId, selId, isLoading }) {
  return (
    <div className="flex justify-center items-center col-span-3 relative">
      <>
        <div className="flex border rounded-md items-center p-1">
          <img
            src="/mag.svg"
            alt="search icon"
            className="h-8 p-1"
          />
          <input
            type="text"
            placeholder="Search a location"
            className="h-10 text-left p-2 w-100 focus:outline-none"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
          />
        </div>
        {!selId && (locations?.length || 0) > 0 && <SearchRes locations={locations} onSelId={onSelId} isLoading={isLoading}/>}
      </>
    </div>
  );
}



function SearchRes({ locations,selId,onSelId,isLoading }) {
  return (
    <div className="border border-gray-400 bg-white absolute z-10 w-110 top-15">
      {isLoading ? <Loader cls="bg-[#FDF7E4] p-2 border border-gray-100" /> : locations.map((loc) => (
        <SearchData loc={loc} key={loc.id} selId={selId} onSelId={onSelId} />
      ))}
    </div>
  );
}

function SearchData({ loc,onSelId }) {
  return (
    <div className="border bg-[#FDF7E4] p-2 hover:bg-gray-200 border-gray-100" onClick={()=> onSelId(loc.id)}>
      {`${loc.name}${loc.name != loc.admin1 ? `, ${loc.admin1}` : ""}, ${loc.country}`}
    </div>
  );
}

