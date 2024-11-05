import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <Link
      to={`/${item.id}`}
      className="mx-8 flex flex-col items-center bg-white border md:max-h-48  border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-full h-full md:h-full md:w-64 rounded-t-lg md:rounded-none md:rounded-s-lg"
        src={item.images[0]}
        alt={item.title}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {item.title}
        </h5>
        <p className="mb-2 font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2">
          <img src="/pin.png" alt="location" className="w-4 h-4" />
          <span>{item.address}</span>
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Ksh. {item.price}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <img src="/bedrooms.gif" alt="bedroom" className="w-8 h-8" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="flex items-center gap-2">
              <img src="/bathroom.gif" alt="bathroom" className="w-8 h-8" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          {/* <div className="flex gap-2">
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
              <img src="/save.png" alt="save" className="w-4 h-4" />
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
              <img src="/chat.png" alt="chat" className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </div>
    </Link>
  );
}

export default Card;
