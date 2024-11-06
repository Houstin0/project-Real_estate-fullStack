import Slider from "../components/slider/Slider";
import Map from "../components/Map";
import { useNavigate, useLoaderData, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(sessionStorage.getItem(`saved-${post.id}`) || false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await apiRequest.get(
          `/users/savedPosts/${currentUser.id}`
        );
        const savedPosts = response.data;

        // Check if the current post is in the saved posts list
        const isPostSaved = savedPosts.some(
          (savedPost) => savedPost.id === post.id
        );
        setSaved(isPostSaved);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedPosts();
  }, [currentUser, post.id]);

  useEffect(() => {
    // Update session storage whenever the saved state changes
    sessionStorage.setItem(`saved-${post.id}`, saved.toString());
    console.log(sessionStorage.getItem(`saved-${post.id}`))
  }, [saved, post.id]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Toggle the saved state optimistically
    setSaved((prev) => !prev);

    try {
      const response = await apiRequest.post("/users/save", {
        postId: post.id,
      });
      console.log(response.data.message);
    } catch (err) {
      console.error(err);
      // Revert the save state if request fails
      setSaved((prev) => !prev);
    }
  };

  const handleRentOrBuyClick = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    // Format the default message with the post title and link
    const action = post.type === "rent" ? "rent" : "buy";
    const defaultMessage = `Hello, I would like to ${action} the property "<a href="/${post.id}">${post.title}</a>" listed on your website.`;

    // Navigate to the landlord's message page with the default message
    navigate(`/inbox/${post.userId}`, { state: { defaultMessage } });
  };

  // console.log (currentUser)

  return (
    <section className="relative py-4 md:py-8 bg-gradient-to-l from-white to-[#F5EFFF] dark:from-black dark:to-black antialiased overflow-y-auto h-screen">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 ">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto mb-8">
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
                onClick={handleSave}
                title=""
                className={`flex items-center justify-center py-1 px-5 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-[#A594F9] 
                  ${
                    saved
                      ? "bg-[#A594F9] text-primary-700 dark:text-black"
                      : "hover:bg-[#A594F9] dark:hover:text-black"
                  }`}
                role="button"
              >
                <svg
                  className="w-8 h-8 -ms-2 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill={currentUser && saved ? "red" : "white"}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>
                {saved ? "Remove from favorites  " : "Add to favorites"}
              </a>

              <a
                onClick={handleRentOrBuyClick}
                className="flex items-center justify-center pr-4 text-sm font-medium text-black focus:outline-none bg-white rounded-lg border border-[#A594F9] hover:bg-[#A594F9] hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:hover:text-black dark:hover:bg-[#A594F9]"
                role="button"
              >
                <img
                  className="w-10 h-10 rounded-l-lg mr-2"
                  src="get-house.gif"
                  alt=""
                />
                {post.type === "rent" ? "Rent" : "Buy"}
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
              <img
                className="w-16 h-16 rounded-lg"
                src="/bedrooms.gif"
                alt="Bedrooms"
              />
              <div className="ml-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Bedroom
                </p>
                <div className="text-xl text-gray-900 dark:text-white">
                  {post.bedroom}
                </div>
              </div>
            </div>
            <div className="flex items-center md:justify-center">
              <img
                className="w-16 h-16 rounded-lg"
                src="/bathroom.gif"
                alt="Bathrooms"
              />
              <div className="ml-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Bathroom
                </p>
                <div className="text-xl text-gray-900 dark:text-white">
                  {post.bathroom}
                </div>
              </div>
            </div>
            <div className="flex items-center md:justify-center">
              <img
                className="w-16 h-16 rounded-lg"
                src="/toilet.gif"
                alt="Toilet"
              />
              <div className="ml-4">
                <p className="font-semibold text-gray-900 dark:text-white">
                  Toilet
                </p>
                <div className="text-xl text-gray-900 dark:text-white">
                  {post.bathroom}
                </div>
              </div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="my-10 ml-10 w-full md:max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 md:mt-0 mt-auto">
            <div className="flex flex-col items-center py-8">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
                src={post.user.avatar}
                alt={post.user.avatar}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {post.user.username}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Landlord
              </span>
              <div className="flex mt-4 md:mt-6">
                <Link
                  to={`/inbox/${post.userId}`}
                  className="py-2 px-4 text-sm font-medium text-gray-900 bg-blue-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Message Landlord
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SinglePage;
