import Card from "../card/Card";

function List({ posts }) {
  return (
    <div className="mt-4 md:mt-0 md:mx-8 w-full max-w-7xl p-4 overflow-y-auto md:h-[520px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
      <a
          href="/add"
          className="py-2 px-4 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Create Listing
        </a>
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Listings
        </h5>

      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts.map((item) => (
            <li key={item.id} className="py-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-sm"
                    src={item.images[0]}
                    alt={item.title}
                  />
                </div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {item.address}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {item.price}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default List;
