import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";


function ProfilePage() {
  const data = useLoaderData();

  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      // Clear token from localStorage
      localStorage.removeItem("token");

      updateUser(null);

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative h-screen overflow-y-auto">
      <div className="w-full bg-white p-16 dark:bg-black">
        <div className="flex flex-col md:flex-row items-center md:items-start pb-10 px-5">
          {/* Avatar */}
          <img
            className="w-48 h-48 mb-3 md:mb-0 rounded-full shadow-lg"
            src={currentUser.avatar || "noavatar.jpg"}
            alt={currentUser.username}
          />

          {/* Text and Buttons */}
          <div className="md:ml-6 text-center md:text-left">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {currentUser.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentUser.email}
            </span>

            <div className="flex justify-center md:justify-start mt-4 md:mt-6">
              <a
                href="/profile/update"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit Profile
              </a>
              <button
                onClick={handleLogout}
                className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-600 rounded-lg border border-gray-200 hover:bg-red-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>

      <a
                href="/add"
                className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Create Post
              </a>


            




      <div class="flex items-center justify-center py-4 md:py-8 flex-wrap">

    <button type="button" class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Electronics</button>
    <button type="button" class="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800">Gaming</button>
</div>
<div class="grid grid-cols-2 md:grid-cols-2 gap-4 p-20">

<a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt=""/>
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</a>
<a href="#" class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/docs/images/blog/image-4.jpg" alt=""/>
    <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
</a>

</div>




      <div className="border border-gray-900 grid grid-cols-2 md:grid-cols-4 gap-2">
      <a
                href="/add"
                className="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Create Post
              </a>
      </div>
    </div>
    
  );
}

export default ProfilePage;



  // return (
  //   <div className="profilePage">
  //     <div className="details">
  //       <div className="wrapper">
  //         <div className="title">
  //           <h1>User Information</h1>
  //           <Link to="/profile/update">
  //             <button>Update Profile</button>
  //           </Link>
  //         </div>
  //         <div className="info">
  //           <span>
  //             Avatar:
  //             <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
  //           </span>
  //           <span>
  //             Username: <b>{currentUser.username}</b>
  //           </span>
  //           <span>
  //             E-mail: <b>{currentUser.email}</b>
  //           </span>
  //           <button onClick={handleLogout}>Logout</button>
  //         </div>
  //         <div className="title">
  //           <h1>My List</h1>
  //           <Link to="/add">
  //             <button>Create New Post</button>
  //           </Link>
  //         </div>
  //         <Suspense fallback={<p>Loading...</p>}>
  //           <Await
  //             resolve={data.postResponse}
  //             errorElement={<p>Error loading posts!</p>}
  //           >
  //             {(postResponse) => <List posts={postResponse.data.userPosts} />}
  //           </Await>
  //         </Suspense>
  //         <div className="title">
  //           <h1>Saved List</h1>
  //         </div>
  //         <Suspense fallback={<p>Loading...</p>}>
  //           <Await
  //             resolve={data.postResponse}
  //             errorElement={<p>Error loading posts!</p>}
  //           >
  //             {(postResponse) => <List posts={postResponse.data.savedPosts} />}
  //           </Await>
  //         </Suspense>
  //       </div>
  //     </div>
  //     <div className="chatContainer">
  //       <div className="wrapper">
  //         <Suspense fallback={<p>Loading...</p>}>
  //           <Await
  //             resolve={data.chatResponse}
  //             errorElement={<p>Error loading chats!</p>}
  //           >
  //             {(chatResponse) => <Chat chats={chatResponse.data} />}
  //           </Await>
  //         </Suspense>
  //       </div>
  //     </div>
  //   </div>
  // );