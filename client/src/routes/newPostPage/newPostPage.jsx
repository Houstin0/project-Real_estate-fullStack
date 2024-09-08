// import { useState } from "react";
// import ReactQuill from "react-quill";
// import apiRequest from "../../lib/apiRequest";
// import "react-quill/dist/quill.snow.css";
// import UploadWidget from "../../components/uploadWidget/UploadWidget";
// import { useNavigate } from "react-router-dom";

// function NewPostPage() {
//   const [value, setValue] = useState("");
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState("");

//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const inputs = Object.fromEntries(formData);

//     try {
//       const res = await apiRequest.post("/posts", {
//         postData: {
//           title: inputs.title,
//           price: parseInt(inputs.price),
//           address: inputs.address,
//           city: inputs.city,
//           bedroom: parseInt(inputs.bedroom),
//           bathroom: parseInt(inputs.bathroom),
//           type: inputs.type,
//           property: inputs.property,
//           latitude: inputs.latitude,
//           longitude: inputs.longitude,
//           images: images,
//         },
//         postDetail: {
//           desc: value,
//           utilities: inputs.utilities,
//           pet: inputs.pet,
//           income: inputs.income,
//           size: parseInt(inputs.size),
//           school: parseInt(inputs.school),
//           bus: parseInt(inputs.bus),
//           restaurant: parseInt(inputs.restaurant),
//         },
//       });
//       navigate("/"+res.data.id)
//     } catch (err) {
//       console.log(err);
//       setError(error);
//     }
//   };

//   return (
//     <div className="newPostPage flex justify-center items-center h-screen">
//       <div className="formContainer w-full max-w-xl h-5/6 overflow-y-auto p-6 bg-white rounded-lg shadow-lg">
//         <h1 className="text-2xl font-semibold mb-6">Add New Post</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="relative z-0 w-full group">
//             <input id="title" name="title" type="text" placeholder=" " className="peer block w-full text-sm py-2.5 px-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none" required />
//             <label htmlFor="title" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:-translate-y-6">Title</label>
//           </div>

//           <div className="relative z-0 w-full group">
//             <input id="price" name="price" type="number" placeholder=" " className="peer block w-full text-sm py-2.5 px-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none" required />
//             <label htmlFor="price" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:-translate-y-6">Price</label>
//           </div>

//           <div className="relative z-0 w-full group">
//             <input id="address" name="address" type="text" placeholder=" " className="peer block w-full text-sm py-2.5 px-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none" required />
//             <label htmlFor="address" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:-translate-y-6">Address</label>
//           </div>

//           <div className="relative z-0 w-full group">
//             <input id="city" name="city" type="text" placeholder=" " className="peer block w-full text-sm py-2.5 px-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none" required />
//             <label htmlFor="city" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:-translate-y-6">City</label>
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             <div className="relative z-0 w-full group">
//               <input id="bedroom" name="bedroom" type="number" placeholder=" " className="peer block w-full text-sm py-2.5 px-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none" min={1} required />
//               <label htmlFor="bedroom" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:-translate-y-6">Bedroom</label>
//             </div>

//             <div className="relative z-0 w-full group">
//               <input id="bathroom" name="bathroom" type="number" placeholder=" " className="peer block w-full text-sm py-2.5 px-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none" min={1} required />
//               <label htmlFor="bathroom" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:-translate-y-6">Bathroom</label>
//             </div>
//           </div>

//           {/* Additional fields */}
//           <div className="relative z-0 w-full group">
//             <input id="latitude" name="latitude" type="text" placeholder=" " className="peer block w-full text-sm py-2.5 px-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none" required />
//             <label htmlFor="latitude" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:-translate-y-6">Latitude</label>
//           </div>
//           <div className="relative z-0 w-full group">
//             <input id="longitude" name="longitude" type="text" placeholder=" " className="peer block w-full text-sm py-2.5 px-0 bg-transparent border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none" required />
//             <label htmlFor="longitude" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 peer-focus:text-blue-600 peer-focus:-translate-y-6">Longitude</label>
//           </div>

//           {/* More fields here */}

//           <div className="relative z-0 w-full group">
//             <ReactQuill theme="snow" onChange={setValue} value={value} className="mt-1 bg-white" />
//           </div>

//           <button type="submit" className="w-full py-2.5 bg-blue-700 text-white rounded-lg font-medium focus:outline-none hover:bg-blue-800">Add</button>

//           {error && <span className="text-red-500">An error occurred</span>}
//         </form>
//       </div>
//       <div className="sideContainer w-full max-w-xs mt-4">
//         {images.map((image, index) => (
//           <img src={image} key={index} alt="" className="w-full h-auto" />
//         ))}
//         <UploadWidget
//           uwConfig={{
//             multiple: true,
//             cloudName: "lamadev",
//             uploadPreset: "estate",
//             folder: "posts",
//           }}
//           setState={setImages}
//         />
//       </div>
//     </div>
//   );
// }

// export default NewPostPage;



















import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import apiRequest from "../../lib/apiRequest";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/"+res.data.id)
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
