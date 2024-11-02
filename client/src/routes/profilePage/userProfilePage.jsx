import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { useNavigate } from "react-router-dom";

function UserProfilePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    const fetchLocationName = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        console.log(response.data)
        const locationName = response.data?.display_name;
        setLocation(locationName || "Location not found.");
      } catch (error) {
        console.error("Error fetching location name:", error);
        setLocation("Unable to fetch location.");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationName(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocation("Location access denied.");
        }
      );
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }, []);

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
                  className="h-28 w-28 rounded-lg object-cover"
                  src={currentUser.avatar || "/noavatar.jpg"}
                  alt={currentUser.username}
                />
                <div>
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
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Phone Number
                </dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  +1234 567 890 / +12 345 678
                </dd>
              </dl>
              <dl>
                <dt className="font-semibold text-gray-900 dark:text-white">
                  Location
                </dt>
                <dd className="text-gray-500 dark:text-gray-400">
                  {location}
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
      </div>
    </section>
  );
}

export default UserProfilePage;
