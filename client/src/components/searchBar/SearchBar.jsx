import { useState } from "react";
import { Link } from "react-router-dom";

const types = ["rent", "buy"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "rent",
    city: "",
    minPrice: 0,
    maxPrice: 0,
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
                ? "bg-black text-white"
                : "bg-white text-black border-gray-300"
            } ${
              index === 0
                ? "rounded-l-md border-r-0"
                : index === types.length - 1
                ? "rounded-r-md  border-l-0"
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
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-l-lg rounded-t-none bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="City"
            onChange={handleChange}
          />
          <input
            type="number"
            name="minPrice"
            className="block w-1/3 p-4 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            min={0}
            max={10000000}
            placeholder="Min Price"
            onChange={handleChange}
          />
          <input
            type="number"
            name="maxPrice"
            className="block w-1/3 p-4 text-sm text-gray-900 border border-gray-300 rounded-r-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            min={0}
            max={10000000}
            placeholder="Max Price"
            onChange={handleChange}
          />
          <Link
            to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
          >
            <button
              type="submit"
              className="text-white bg-gradient-to-br to-emerald-600 from-sky-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-bold rounded-full text-medium px-10 py-5 text-center ms-4"
            >
              Search
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
