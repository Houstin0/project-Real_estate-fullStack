import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="flex flex-col gap-2.5 px-10 pb-4">
      {/* <h1 className="font-light text-xl justify-center flex">
        Search results for <b className="mx-2">{searchParams.get("city")}</b>
      </h1> */}
      <div className="flex flex-wrap gap-6">
        {/* Location Input */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="city" className="text-xs text-black dark:text-white">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            value={query.city}
            className="w-80 p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Type Dropdown */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="type" className="text-xs text-black dark:text-white">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={query.type}
            className="w-24 p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>



        <div className="flex flex-col gap-0.5">
          <label htmlFor="property" className="text-xs text-black dark:text-white">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            value={query.property}
            className="w-24 p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>



      </div>
      <div className="flex flex-wrap gap-5">
       

        <div className="flex flex-col gap-0.5">
          <label htmlFor="minPrice" className="text-xs text-black dark:text-white">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            value={query.minPrice}
            className="w-24 p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="maxPrice" className="text-xs text-black dark:text-white">Max Price</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            value={query.maxPrice}
            className="w-24 p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="bedroom" className="text-xs text-black dark:text-white">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            value={query.bedroom}
            className="w-24 p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
        <button
          onClick={handleFilter}
          className="w-24 h-auto mt-4 p-2 bg-blue-600 text-white border border-transparent rounded-md cursor-pointer"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Filter;
