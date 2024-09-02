import { useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);

    const updatedIsDarkMode = !isDarkMode;

    if (typeof window !== "undefined") {
      const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
      const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");
  
      if (!updatedIsDarkMode) {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.backgroundColor = "var(--bg-color-light)";
        localStorage.setItem("color-theme", "light");
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.remove("hidden");
        if (themeToggleLightIcon) themeToggleLightIcon.classList.add("hidden");
      } else {
        document.documentElement.style.backgroundColor = "var(--bg-color-dark)";
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
        if (themeToggleDarkIcon) themeToggleDarkIcon.classList.add("hidden");
        if (themeToggleLightIcon) themeToggleLightIcon.classList.remove("hidden");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = localStorage.getItem("color-theme") === "dark" ||
        (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.backgroundColor = "var(--bg-color-dark)";
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.backgroundColor = "var(--bg-color-light)";
      }
    }
  }, []);

  useEffect(() => {
    const themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
    const themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

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




  // const toggleUserDropdown = () => {
  //   setIsUserDropdownOpen(!isUserDropdownOpen);
  // };

  // const toggleMobileMenu = () => {
  //   setIsMobileMenuOpen(!isMobileMenuOpen);
  // };

  const fetch = useNotificationStore((state) => state.fetch);
  // const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav className="bg-white border-gray-200 dark:bg-black h-16 relative z-50">
      <div className="w-full flex flex-wrap items-center justify-between p-2">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          {/* <img src="" className="h-8" alt="Logo" /> */}
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            House Hunt
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {currentUser ? (
            <div>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-3.jpg"
                  alt="user photo"
                />
              </button>
              {/* <!-- Dropdown menu --> */}
              <div
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                id="user-dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    Bonnie Green
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    name@flowbite.com
                  </span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="block mx-6 py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sign up
              </Link>
            </>
          )}

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-black md:dark:bg-black dark:border-gray-700">
            <li>
              <Link
                to="/profile"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </Link>
            </li>
            <li>
            <button
            id="theme-toggle"
            type="button"
            onClick={toggleDarkMode}
            className="text-gray-500 dark:text-gray-400 lg:hover:bg-gray-200 lg:dark:hover:bg-gray-700 rounded-lg p-1"
          >
            <svg
              id="theme-toggle-dark-icon"
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              id="theme-toggle-light-icon"
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM16 10a1 1 0 110 2h-1a1 1 0 110-2h1zM5.05 4.464l.707-.707a1 1 0 00-1.414-1.414l-.707.707a1 1 0 101.414 1.414zM4.293 15.293a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 10a1 1 0 100 2H3a1 1 0 100-2h1zm6 6a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
