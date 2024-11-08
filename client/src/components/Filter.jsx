import { useState, useEffect } from "react";
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

  // Update search parameters whenever query state changes
  useEffect(() => {
    setSearchParams(query);
  }, [query, setSearchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: name === "minPrice" || name === "maxPrice" || name === "bedroom" ? parseInt(value) || "" : value,
    });
  };
  return (
    <div className="flex flex-col gap-1 pb-2">
      {/* <h1 className="font-light text-xl justify-center flex">
        Search results for <b className="mx-2">{searchParams.get("city")}</b>
      </h1> */}
      <div className="flex flex-wrap gap-2">
        {/* Location Input */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="city" className="text-xs text-black dark:text-white">
            Location
          </label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            value={query.city}
            className="w-72 p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>

        {/* Type Dropdown */}
        <div className="flex flex-col gap-0.5">
          <label htmlFor="type" className="text-xs text-black dark:text-white">
            Type
          </label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={query.type}
            className="w-18 p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">ALL</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="flex flex-col gap-0.5">
          <label
            htmlFor="property"
            className="text-xs text-black dark:text-white"
          >
            Property
          </label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            value={query.property}
            className="w-26 p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">ALL</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>



        <div className="flex flex-col gap-0.5">
          <label htmlFor="maxPrice" className="text-xs text-black dark:text-white">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Any"
            onChange={handleChange}
            value={query.maxPrice}
            className="w-24 p-2 border border-gray-300 rounded-md text-sm"
            min={1}
            max={10000000}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="minPrice" className="text-xs text-black dark:text-white">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Any"
            onChange={handleChange}
            value={query.minPrice}
            className="w-24 p-2 border border-gray-300 rounded-md text-sm"
            min={1}
            max={10000000}
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <label htmlFor="bedroom" className="text-xs text-black dark:text-white">No. of Bedrooms</label>
          <input
            type="number"
            id="bedroom"
            name="bedroom"
            placeholder="Any"
            onChange={handleChange}
            value={query.bedroom}
            className="w-24 p-2 border border-gray-300 rounded-md text-sm"
          />
        </div>
      {/* <h1 className="text-2xl justify-center flex">
        Search results for <b className="mx-2">{searchParams.get("city")}</b>
      </h1> */}


      </div>
    </div>
  );
}

export default Filter;
