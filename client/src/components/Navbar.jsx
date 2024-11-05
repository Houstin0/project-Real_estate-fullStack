import { useContext, useState, useEffect, useRef  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { useNotificationStore } from "../lib/notificationStore";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { currentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);

    const updatedIsDarkMode = !isDarkMode;

    if (typeof window !== "undefined") {
      const themeToggleDarkIcon = document.getElementById(
        "theme-toggle-dark-icon"
      );
      const themeToggleLightIcon = document.getElementById(
        "theme-toggle-light-icon"
      );

      if (!updatedIsDarkMode) {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.backgroundColor =
          "var(--bg-color-light)";
        localStorage.setItem("color-theme", "light");
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove("hidden");
        if (themeToggleLightIcon) themeToggleLightIcon.classList.add("hidden");
      } else {
        document.documentElement.style.backgroundColor = "var(--bg-color-dark)";
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add("hidden");
        if (themeToggleLightIcon)
          themeToggleLightIcon.classList.remove("hidden");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark =
        localStorage.getItem("color-theme") === "dark" ||
        (!("color-theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.backgroundColor = "var(--bg-color-dark)";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.backgroundColor =
          "var(--bg-color-light)";
      }
    }
  }, []);

  useEffect(() => {
    const themeToggleDarkIcon = document.getElementById(
      "theme-toggle-dark-icon"
    );
    const themeToggleLightIcon = document.getElementById(
      "theme-toggle-light-icon"
    );

    if (themeToggleDarkIcon && themeToggleLightIcon) {
      if (isDarkMode) {
        themeToggleDarkIcon.classList.add("hidden");
        themeToggleLightIcon.classList.remove("hidden");
      } else {
        themeToggleDarkIcon.classList.remove("hidden");
        themeToggleLightIcon.classList.add("hidden");
      }
    }
  }, [isDarkMode]);

  const fetch = useNotificationStore((state) => state.fetch);
  // const number = useNotificationStore((state) => state.number);

  const dropdownRef = useRef(null);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);

  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setUserDropdownVisible(!userDropdownVisible);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset dropdown visibility on page refresh
  useEffect(() => {
    setUserDropdownVisible(false);
  }, []);

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

  if (currentUser) fetch();

  return (
    <nav className="bg-[#F5EFFF] border-gray-200 dark:bg-black relative z-50 px-4">
      <div className="w-full flex flex-wrap items-center justify-between p-1 px-2">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            House Hunt
          </span>
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* User menu */}
          {currentUser ? (
            <div ref={dropdownRef}>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-[#A594F9] dark:focus:ring-[#A594F9]"
                onClick={toggleUserDropdown}
                aria-expanded={userDropdownVisible}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={currentUser.avatar || "noavatar.jpg"}
                  alt="user photo"
                />
              </button>
              {/* Dropdown menu */}
              {userDropdownVisible && (
                <div className="z-50 mx-4 my-1 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-black dark:divide-gray-600 absolute right-4 border-2 border-[#A594F9]">
                  <ul aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 rounded-t-lg hover:bg-blue-200 dark:hover:bg-blue-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        <span className="block text-sm text-gray-900 dark:text-white">
                          {currentUser.username}
                        </span>
                        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                          {currentUser.email}
                        </span>
                      </Link>
                    </li>

                    <li>
                      {/* Dark mode toggle button */}
                      <button
                        onClick={toggleDarkMode}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        {/* Moon icon for dark mode */}
                        <svg
                          className={`w-6 h-6 mr-2 text-gray-800 dark:text-white ${
                            isDarkMode ? "hidden" : "inline-block"
                          }`}
                          id="theme-toggle-dark-icon"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {/* Sun icon for light mode */}
                        <svg
                          className={`w-6 h-6 mr-2 text-gray-800 dark:text-white ${
                            isDarkMode ? "inline-block" : "hidden"
                          }`}
                          id="theme-toggle-light-icon"
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
                            d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                          />
                        </svg>
                        {isDarkMode ? "Light Mode" : "Dark Mode"}
                      </button>
                    </li>

                    <li>
                      <Link
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 rounded-b-lg hover:bg-red-200 dark:hover:bg-red-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
                                  {/* Dark mode toggle button */}
                                  <button
                        onClick={toggleDarkMode}
                        className="mx-2"
                      >
                        {/* Moon icon for dark mode */}
                        <svg
                          className={`w-6 h-6 rounded-lg text-black hover:text-white hover:bg-black ${
                            isDarkMode ? "hidden" : "inline-block"
                          }`}
                          id="theme-toggle-dark-icon"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {/* Sun icon for light mode */}
                        <svg
                          className={`w-6 h-6 rounded-lg text-white hover:text-black hover:bg-white ${
                            isDarkMode ? "inline-block" : "hidden"
                          }`}
                          id="theme-toggle-light-icon"
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
                            d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                          />
                        </svg>
                      
                      </button>
              <Link
                to="/login"
                className="block mx-6 py-2 px-6 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-black dark:text-white hover:text-blue-800 dark:hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2.5 text-center me-2 "
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
