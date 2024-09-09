import React, { Suspense, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate, Await, Link, useLoaderData } from 'react-router-dom';
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";

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
    <div className="relative h-screen overflow-y-auto pb-24">
      <div className="w-full bg-white px-10 py-4 dark:bg-black">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          {/* Profile Info Section */}
          <div className="flex-grow md:flex items-start">
            {/* Avatar */}
            <img
              className="w-48 h-48 mb-3 md:mb-0 rounded-full shadow-lg object-cover"
              src={currentUser.avatar || "noavatar.jpg"}
              alt={currentUser.username}
            />

            {/* Text and Buttons */}
            <div className="md:ml-6 text-center md:text-left">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {currentUser.username}
                {currentUser.role === "ADMIN" && (
                  <span className="text-sm text-red-600 dark:text-red-400"> (Admin)</span>
                )}
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

          
          <div className="md:ml-auto w-full md:w-1/3">
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                resolve={data.chatResponse}
                errorElement={<p>Error loading chats!</p>}
              >
                {(chatResponse) => <Chat chats={chatResponse.data} />}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>

      <a
        href="/add"
        className="ml-20 py-2 px-8 ms-2 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Create Post
      </a>

      <div className="flex items-center justify-center flex-wrap">
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Listings
        </button>
        <button
          type="button"
          className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        >
          Saved
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
  );
}

export default AdminProfilePage;
