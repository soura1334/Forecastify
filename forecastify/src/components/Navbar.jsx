export default function Navbar({ locations, query, onQuery }) {
  return (
    <header className="bg-[#BBAB8C] grid grid-cols-5 gap-2 p-3">
      <Logo />
      <Search locations={locations} query={query} onQuery={onQuery} />
    </header>
  );
}

function Logo() {
  return (
    <div className="flex">
      <img
        src="/src/assets/icon.png"
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

function Search({ locations, query, onQuery }) {
  return (
    <div className="flex justify-center items-center col-span-3 relative">
      <>
        <div className="flex border rounded-md items-center p-1">
          <img
            src="/src/assets/mag.svg"
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
        {(locations?.length || 0) > 0 && <SearchRes locations={locations} />}
      </>
    </div>
  );
}

function SearchRes({ locations }) {
  return (
    <div className="border border-gray-400 bg-white absolute z-10 w-110 top-18">
      {locations.map((loc) => (
        <SearchData loc={loc} />
      ))}
    </div>
  );
}

function SearchData({ loc }) {
  return (
    <div className="border p-2 hover:bg-gray-200 border-gray-100">
      {`${loc.name}${loc.name != loc.admin1 ? `, ${loc.admin1}` : ""}, ${loc.country}`}
    </div>
  );
}
