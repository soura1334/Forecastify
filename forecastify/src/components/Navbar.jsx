export default function Navbar() {
  return (
    <header className="bg-[#BBAB8C] grid grid-cols-5 gap-2 p-3">
      <Logo />
      <Search />
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

function Search() {
  return (
    <div className="flex justify-center items-center col-span-3 ">
      <div className="flex border rounded-md items-center p-1">
        <img src="/src/assets/mag.svg" alt="search icon" className="h-8 p-1" />
        <input
          type="search"
          placeholder="Search a location"
          className="h-10  text-left p-2 w-100 focus:outline-none"
        />
      </div>
    </div>
  );
}
