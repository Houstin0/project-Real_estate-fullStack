import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["rent", "buy"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "rent",
    city: "",
    maxPrice: "",
    bedroom: "",
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      {/* Type Selector */}
      <div className="flex">
        {types.map((type, index) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`px-6 py-4 border text-medium font-bild capitalize rounded-b-none ${
              query.type === type
                ? "bg-[#FFD700] text-black"
                : "bg-white dark:bg-gray-800 text-gray-500 dark:text-white border-t border-[#A594F9]"
            } ${
              index === 0
                ? "rounded-tl-md border-r-0"
                : index === types.length - 1
                ? "rounded-tr-md  border-l-0"
                : ""
            } border`}
          >
            {type}
          </button>
        ))}
      </div>
      {/* Search Form */}
      <form className="flex flex-col gap-4">
        <div className="flex">
          <input
            type="text"
            name="city"
            className="block w-full p-4 text-base text-black border border-[#A594F9] rounded-l-lg rounded-t-none bg-white dark:bg-black placeholder-gray-500 dark:placeholder-white"
            placeholder="City"
            onChange={handleChange}
          />
          {/* <input
            type="number"
            name="minPrice"
            className="block w-1/3 p-4 text-base text-black border border-[#A594F9] bg-[#F5EFFF] placeholder-gray-500"
            min={1}
            max={10000000}
            placeholder="Min Price"
            onChange={handleChange}
          /> */}
          <input
            type="number"
            name="maxPrice"
            className="block w-1/3 p-4 text-base text-black border border-[#A594F9] bg-white dark:bg-black placeholder-gray-500 dark:placeholder-white"
            min={1}
            max={10000000}
            placeholder="Max Price"
            onChange={handleChange}
          />
                    <input
            type="number"
            name="bedroom"
            className="block w-1/3 p-4 text-base text-black border border-[#A594F9] rounded-r-lg bg-white dark:bg-black placeholder-gray-500 dark:placeholder-white"
            min={0}
            placeholder="Bedroom"
            onChange={handleChange}
          />
          <Link
            to={`/list?type=${query.type}&city=${query.city}&maxPrice=${query.maxPrice}&bedroom=${query.bedroom}`}
          >
            <button
              type="submit"
              className="w-full text-black bg-[#FFD700] focus:ring-4 focus:outline-none focus:ring-[#A594F9] font-bold rounded-full text-xl pl-6 pr-10 py-4 text-center ms-4 flex items-center"
            >
              <img src="/search1.gif" className="w-12 h-10" alt="search-icon" />
              Search
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
