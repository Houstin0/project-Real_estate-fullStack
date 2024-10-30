import React, { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate, Await, Link, useLoaderData } from "react-router-dom";
import List from "../../components/List";


function AdminProfilePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      localStorage.removeItem("token");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="fixed w-full h-full overflow-y-auto bg-white py-8 antialiased dark:bg-black md:py-0">
      <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
        <h2 className="flex items-center justify-center mb-4 text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl md:mb-6">
          Profile overview
        </h2>

        <div className="py-4 md:py-8">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <img
                  className="h-28 w-28 rounded-lg"
                  src={currentUser.avatar || "noavatar.jpg"}
                  alt={currentUser.username}
                />
                <div>
                  {currentUser.role === "ADMIN" && (
                    <span className="text-sm text-red-600 dark:text-red-400">
                      {" "}
                      Admin
                    </span>
                  )}
                  <span className="mb-2 inline-block rounded bg-primary-100 px-1 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                    Account{" "}
                  </span>
                  <h2 className="flex items-center text-xl font-bold leading-none text-gray-900 dark:text-white sm:text-2xl">
                    {currentUser.username}
                  </h2>
                </div>
              </div>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Email Address
                </dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  {currentUser.email}
                </dd>
              </dl>
            </div>
            <div className="space-y-4">
              <dl>
                <dt class="font-semibold text-gray-900 dark:text-white">
                  Phone Number
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  +1234 567 890 / +12 345 678
                </dd>
              </dl>
              <dl>
                <dt class="font-semibold text-gray-900 dark:text-white">
                  Favorite pick-up point
                </dt>
                <dd class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                  <svg
                    class="hidden h-5 w-5 shrink-0 text-gray-400 dark:text-gray-500 lg:inline"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.53 0 2.03 2.03 0 0 0 .65-.488c.185-.209.332-.457.433-.73.1-.273.152-.566.152-.861 0-.974-1.108-3.85-1.618-5.121A.983.983 0 0 0 17.466 4H6.456a.986.986 0 0 0-.93.645C5.045 5.962 4 8.905 4 9.736c.023.59.241 1.148.611 1.567.37.418.865.667 1.389.697Zm0 0c.328 0 .651-.091.94-.266A2.1 2.1 0 0 0 7.66 11h.681a2.1 2.1 0 0 0 .718.734c.29.175.613.266.942.266.328 0 .651-.091.94-.266.29-.174.537-.427.719-.734h.681a2.1 2.1 0 0 0 .719.734c.289.175.612.266.94.266.329 0 .652-.091.942-.266.29-.174.536-.427.718-.734h.681c.183.307.43.56.719.734.29.174.613.266.941.266a1.819 1.819 0 0 0 1.06-.351M6 12a1.766 1.766 0 0 1-1.163-.476M5 12v7a1 1 0 0 0 1 1h2v-5h3v5h7a1 1 0 0 0 1-1v-7m-5 3v2h2v-2h-2Z"
                    />
                  </svg>
                  Herald Square, 2, New York, United States of America
                </dd>
              </dl>
              <dl>
                <dt class="font-semibold text-gray-900 dark:text-white">
                  My Companies
                </dt>
                <dd class="text-gray-500 dark:text-gray-400">
                  FLOWBITE LLC, Fiscal code: 18673557
                </dd>
              </dl>
              <dl>
                <dt class="mb-1 font-semibold text-gray-900 dark:text-white">
                  Payment Methods
                </dt>
                <dd class="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    <img
                      class="h-4 w-auto dark:hidden"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg"
                      alt=""
                    />
                    <img
                      class="hidden h-4 w-auto dark:flex"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg"
                      alt=""
                    />
                  </div>
                  <div>
                    <div class="text-sm">
                      <p class="mb-0.5 font-medium text-gray-900 dark:text-white">
                        Visa ending in 7658
                      </p>
                      <p class="font-normal text-gray-500 dark:text-gray-400">
                        Expiry 10/2024
                      </p>
                    </div>
                  </div>
                </dd>
              </dl>
            </div>
          </div>
          <a
            href="/profile/update"
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 sm:w-auto"
          >
            <svg
              className="-ms-0.5 me-1.5 h-4 w-4"
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
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              ></path>
            </svg>
            Edit your Profile
          </a>
          <button
            onClick={handleLogout}
            className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-red-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Sign Out
          </button>
        </div>
        <div className="mb-10 ">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse.data.userPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </section>

    // <div className="relative h-screen overflow-y-auto">
    //   <div className="w-full bg-white p-6 dark:bg-black">
    //     <div className="flex flex-col md:flex-row items-center md:items-start pb-10 px-5">
    //       {/* Avatar */}
    //       <img
    //         className="w-44 h-44 mb-3 md:mb-0 rounded-full shadow-lg"
    //         src={currentUser.avatar || "noavatar.jpg"}
    //         alt={currentUser.username}
    //       />

    //       {/* Text and Buttons */}
    //       <div className="md:ml-6 text-center md:text-left">
    //         <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
    //           {currentUser.username}
    //           {currentUser.role === "ADMIN" && (
    //             <span className="text-sm text-red-600 dark:text-red-400">
    //               {" "}
    //               (Admin)
    //             </span>
    //           )}
    //         </h5>
    //         <span className="text-sm text-gray-500 dark:text-gray-400">
    //           {currentUser.email}
    //         </span>

    //         <div className="flex justify-center md:justify-start mt-4 md:mt-6">
    //           <a
    //             href="/profile/update"
    //             className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //           >
    //             Edit Profile
    //           </a>
    //           <button
    //             onClick={handleLogout}
    //             className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-red-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    //           >
    //             Log Out
    //           </button>
    //         </div>
    //       </div>
    //       <div>
    //         <Suspense fallback={<p>Loading...</p>}>
    //           <Await
    //             resolve={data.postResponse}
    //             errorElement={<p>Error loading posts!</p>}
    //           >
    //             {(postResponse) => <List posts={postResponse.data.userPosts} />}
    //           </Await>
    //         </Suspense>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default AdminProfilePage;

// return (
//   <div className="relative h-screen">
//     <div className="w-full bg-white px-10 py-4 dark:bg-black">
//       <div className="flex flex-col md:flex-row items-center md:items-start">
//         {/* Profile Info Section */}
//         <div className="flex-grow md:flex items-start">
//           {/* Avatar */}
//           <img
//             className="w-48 h-48 mb-3 md:mb-0 rounded-full shadow-lg object-cover"
//             src={currentUser.avatar || "noavatar.jpg"}
//             alt={currentUser.username}
//           />

//           {/* Text and Buttons */}
//           <div className="md:ml-6 text-center md:text-left">
//             <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
//               {currentUser.username}
//               {currentUser.role === "ADMIN" && (
//                 <span className="text-sm text-red-600 dark:text-red-400"> (Admin)</span>
//               )}
//             </h5>
//             <span className="text-sm text-gray-500 dark:text-gray-400">
//               {currentUser.email}
//             </span>

//             <div className="flex justify-center md:justify-start mt-4 md:mt-6">
//               <a
//                 href="/profile/update"
//                 className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               >
//                 Edit Profile
//               </a>
//               <button
//                 onClick={handleLogout}
//                 className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-red-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//               >
//                 Log Out
//               </button>
//             </div>
//           </div>
//         </div>

//           <Suspense fallback={<p>Loading...</p>}>
//         <Await
//           resolve={data.postResponse}
//           errorElement={<p>Error loading posts!</p>}
//         >
//           {(postResponse) => <List posts={postResponse.data.userPosts} />}
//         </Await>
//       </Suspense>

//       </div>
//     </div>

//     {/* <div className="md:mr-auto w-full md:w-1/3 ">
//     <Suspense fallback={<p>Loading...</p>}>
//             <Await
//               resolve={data.chatResponse}
//               errorElement={<p>Error loading chats!</p>}
//             >
//               {(chatResponse) => <Chat chats={chatResponse.data} />}
//             </Await>
//           </Suspense>
//           </div> */}

//   </div>
// );
