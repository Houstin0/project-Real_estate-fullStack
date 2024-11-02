import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="flex gap-5 items-center">
          <img
            src={item.images[0]}
            alt=""
            className="w-16 h-12 object-cover rounded-md"
          />
          <div className="flex flex-col justify-between">
            <Link to={`/${item.id}`} className="text-blue-500 hover:underline">
              {item.title}
            </Link>
            <span className="text-gray-600">{item.bedroom} bedroom</span>
            <b className="text-black">${item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
