import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { useNavigate,Link } from "react-router-dom";

function Card({ item }) {
  const [saved, setSaved] = useState(sessionStorage.getItem(`saved-${item.id}`) || false);
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
          (savedPost) => savedPost.id === item.id
        );
        setSaved(isPostSaved);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      }
    };

    fetchSavedPosts();
  }, [currentUser, item.id]);

  useEffect(() => {
    // Update session storage whenever the saved state changes
    sessionStorage.setItem(`saved-${item.id}`, saved.toString());
    console.log(sessionStorage.getItem(`saved-${item.id}`))
  }, [saved, item.id]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    // Toggle the saved state optimistically
    setSaved((prev) => !prev);
    try {
      const response = await apiRequest.post("/users/save", {
        postId: item.id,
      });
      console.log(response.data.message);
    } catch (err) {
      console.error(err);
      // Revert the save state if request fails
      setSaved((prev) => !prev);
    }
  };

  return (
    <div
      className="relative mx-8 flex flex-col items-center bg-white border md:max-h-48  border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
            <a
        onClick={handleSave}
        title=""
        className={`absolute top-0 right-0 flex items-center justify-center rounded-full hover:bg-gray-400`}
        role="button"
      >
        <svg
          className="w-8 h-8"
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
      </a>
      <Link to={`/${item.id}`} className="h-full md:w-64">
      <img
        className="object-cover w-full h-full md:h-full md:w-64 rounded-t-lg md:rounded-none md:rounded-s-lg"
        src={item.images[0]}
        alt={item.title}
      />
      </Link>

      <div className="flex flex-col justify-between p-4 leading-normal">
      <Link to={`/${item.id}`}>
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
          {item.title}
        </h5>
      </Link>

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
    </div>
  );
}

export default Card;
