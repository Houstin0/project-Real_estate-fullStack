import Slider from "../components/slider/Slider";
import Map from "../components/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <section className="relative py-8 bg-white md:py-16 dark:bg-black antialiased overflow-y-auto h-screen">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 ">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <Slider images={post.images} />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="flex items-center gap-2 text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
              {post.title}
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                ({post.city})
              </p>
            </h1>
            <div className="mt-4 sm:items-center sm:gap-2 sm:flex">
              <p className="flex items-center gap-2 font-bold text-gray-900 text-xl dark:text-white">
                <img src="/pin.png" className="w-10 h-10" alt="pin" />
                {post.address}
              </p>
            </div>

            <div className="mt-2 sm:items-center sm:gap-2 sm:flex">
              <p className="flex items-center gap-2 text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                Ksh. {post.price}
                <p className="text-lg font-bold leading-none text-black dark:text-white">
                  ({post.type})
                </p>
              </p>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-2">
              <a
                href="#"
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                Add to favorites
              </a>

              <a
                href="#"
                title=""
                className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
                role="button"
              >
                <svg
                  className="w-5 h-5 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                  />
                </svg>
                Add to cart
              </a>
            </div>

            <hr className="my-4 md:my-4 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Studio quality three mic array for crystal clear calls and voice
              recordings. Six-speaker sound system for a remarkably robust and
              high-quality audio experience. Up to 256GB of ultrafast SSD
              storage.
            </p>

            <p className="text-gray-500 dark:text-gray-400">
              Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
              Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
              Magic Keyboard or Magic Keyboard with Touch ID.
            </p>
          </div>
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-4 md:gap-8">
  {/* Property Info Section */}
  <div className="md:absolute w-full md:w-1/2 my-2 right-0 top-0 grid grid-cols-1 md:grid-cols-3">
    <div className="flex items-center md:justify-center">
      <img className="w-16 h-16 rounded-lg" src="/bedrooms.gif" alt="Bedrooms" />
      <div className="ml-4">
        <p className="font-semibold text-gray-900 dark:text-white">Bedroom</p>
        <div className="text-xl text-gray-900 dark:text-white">{post.bedroom}</div>
      </div>
    </div>
    <div className="flex items-center md:justify-center">
      <img className="w-16 h-16 rounded-lg" src="/bathroom.gif" alt="Bathrooms" />
      <div className="ml-4">
        <p className="font-semibold text-gray-900 dark:text-white">Bathroom</p>
        <div className="text-xl text-gray-900 dark:text-white">{post.bathroom}</div>
      </div>
    </div>
    <div className="flex items-center md:justify-center">
      <img className="w-16 h-16 rounded-lg" src="/toilet.gif" alt="Toilet" />
      <div className="ml-4">
        <p className="font-semibold text-gray-900 dark:text-white">Toilet</p>
        <div className="text-xl text-gray-900 dark:text-white">{post.bathroom}</div>
      </div>
    </div>
  </div>

  {/* User Info Section */}
  <div className="my-10 w-full md:max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:mt-0 mt-auto">
    <div className="flex flex-col items-center py-8">
      <img
        className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
        src={post.user.avatar}
        alt={post.user.avatar}
      />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {post.user.username}
      </h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">Landlord</span>
      <div className="flex mt-4 md:mt-6">
        <a
          href="#"
          className="py-2 px-4 text-sm font-medium text-gray-900 bg-blue-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Message
        </a>
      </div>
    </div>
  </div>
</div>


      </div>
    </section>
  );
}

export default SinglePage;

// import "./singlePage.scss";
// import Slider from "../../components/slider/Slider";
// import Map from "../../components/map/Map";
// import { useNavigate, useLoaderData } from "react-router-dom";
// import DOMPurify from "dompurify";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
// import apiRequest from "../../lib/apiRequest";

// function SinglePage() {
//   const post = useLoaderData();
//   const [saved, setSaved] = useState(post.isSaved);
//   const { currentUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleSave = async () => {
//     if (!currentUser) {
//       navigate("/login");
//     }
//     // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
//     setSaved((prev) => !prev);
//     try {
//       await apiRequest.post("/users/save", { postId: post.id });
//     } catch (err) {
//       console.log(err);
//       setSaved((prev) => !prev);
//     }
//   };

//   return (
//     <div className="singlePage overflow-y-auto">
//       <div className="details">
//         <div className="wrapper">
//           <Slider images={post.images} />
//           <div className="info">
//             <div className="top">
//               <div className="post">
//                 <h1>{post.title}</h1>
//                 <div className="address">
//                   <img src="/pin.png" alt="" />
//                   <span>{post.address}</span>
//                 </div>
//                 <div className="price">$ {post.price}</div>
//               </div>
//               <div className="user">
//                 <img src={post.user.avatar} alt="" />
//                 <span>{post.user.avatar}</span>
//               </div>
//             </div>
//             {/* <div
//               className="bottom"
//               dangerouslySetInnerHTML={{
//                 __html: DOMPurify.sanitize(post.postDetail.desc),
//               }}
//             ></div> */}
//           </div>
//         </div>
//       </div>
//       {/* <div className="features">
//         <div className="wrapper">
//           <p className="title">General</p>
//           <div className="listVertical">
//             <div className="feature">
//               <img src="/utility.png" alt="" />
//               <div className="featureText">
//                 <span>Utilities</span>
//                 {post.postDetail.utilities === "owner" ? (
//                   <p>Owner is responsible</p>
//                 ) : (
//                   <p>Tenant is responsible</p>
//                 )}
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/pet.png" alt="" />
//               <div className="featureText">
//                 <span>Pet Policy</span>
//                 {post.postDetail.pet === "allowed" ? (
//                   <p>Pets Allowed</p>
//                 ) : (
//                   <p>Pets not Allowed</p>
//                 )}
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/fee.png" alt="" />
//               <div className="featureText">
//                 <span>Income Policy</span>
//                 <p>{post.postDetail.income}</p>
//               </div>
//             </div>
//           </div>
//           <p className="title">Sizes</p>
//           <div className="sizes">
//             <div className="size">
//               <img src="/size.png" alt="" />
//               <span>{post.postDetail.size} sqft</span>
//             </div>
//             <div className="size">
//               <img src="/bed.png" alt="" />
//               <span>{post.bedroom} beds</span>
//             </div>
//             <div className="size">
//               <img src="/bath.png" alt="" />
//               <span>{post.bathroom} bathroom</span>
//             </div>
//           </div>
//           <p className="title">Nearby Places</p>
//           <div className="listHorizontal">
//             <div className="feature">
//               <img src="/school.png" alt="" />
//               <div className="featureText">
//                 <span>School</span>
//                 <p>
//                   {post.postDetail.school > 999
//                     ? post.postDetail.school / 1000 + "km"
//                     : post.postDetail.school + "m"}{" "}
//                   away
//                 </p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/pet.png" alt="" />
//               <div className="featureText">
//                 <span>Bus Stop</span>
//                 <p>{post.postDetail.bus}m away</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/fee.png" alt="" />
//               <div className="featureText">
//                 <span>Restaurant</span>
//                 <p>{post.postDetail.restaurant}m away</p>
//               </div>
//             </div>
//           </div>
//           <p className="title">Location</p>
//           <div className="mapContainer">
//             <Map items={[post]} />
//           </div>
//           <div className="buttons">
//             <button>
//               <img src="/chat.png" alt="" />
//               Send a Message
//             </button>
//             <button
//               onClick={handleSave}
//               style={{
//                 backgroundColor: saved ? "#fece51" : "white",
//               }}
//             >
//               <img src="/save.png" alt="" />
//               {saved ? "Place Saved" : "Save the Place"}
//             </button>
//           </div>
//         </div>
//       </div> */}
//     </div>
//   );
// }

// export default SinglePage;
