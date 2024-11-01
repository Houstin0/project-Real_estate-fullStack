import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Register() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      setShowPassword(false);
    }, 2000);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showPassword);
    setTimeout(() => {
      setShowConfirmPassword(false);
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const role = "USER";

    try {
      // Make API call to register
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
        role,
      });

      // Store token in local storage (or session storage)
      localStorage.setItem("token", res.data.token);
      updateUser(res.data);

      // Navigate to dashboard or other protected route
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="h-screen bg-center bg-no-repeat bg-cover bg-[url('/background-main.jpeg')] bg-blend-multiply">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="py-4 px-8 mx-auto max-w-2xl lg:py-8 rounded-xl shadow dark:border bg-[#F5EFFF] dark:bg-[#A594F9] border border-[#A594F9] dark:border-[#F5EFFF]">
          <h1 className="mb-2 text-lg text-center font-bold text-black md:text-2xl">
            Sign up for an account
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Name
                </label>
                <div className="flex mb-2">
                  <span className="inline-flex items-center px-3 text-sm text-black border rounded-e-0 border-gray-500 border-e-0 rounded-s-md bg-gray-50 dark:text-gray-400 ">
                    <svg
                      className="w-4 h-4 text-black"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-500 text-gray-900 sm:text-sm rounded-e-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-black"
                  >
                    Email
                  </label>
                  <div className="flex">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-500 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="email@gmail.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-500 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-1 flex items-center text-sm leading-5"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <svg
                        className="w-6 h-6 text-black"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <img
                        src="/eye.gif"
                        alt="eye"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-black"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Confirm Password"
                    className="bg-gray-50 border border-gray-500 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-1 flex items-center text-sm leading-5"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <svg
                        className="w-6 h-6 text-black"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <img
                        src="/eye.gif"
                        alt="eye"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="my-4 w-full text-black bg-[#FFD700] font-bold rounded-full text-lg px-5 py-2.5 text-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#A594F9]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08146 50.5908C9.08146 73.2891 27.3017 91.5094 50 91.5094C72.6983 91.5094 90.9185 73.2891 90.9185 50.5908C90.9185 27.8924 72.6983 9.67218 50 9.67218C27.3017 9.67218 9.08146 27.8924 9.08146 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5532C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7237 75.2124 7.41289C69.5422 4.10206 63.2754 1.94025 56.7221 1.05115C51.7666 0.367443 46.7659 0.446843 41.8401 1.27852C39.3605 1.69399 37.8652 4.19778 38.5023 6.62326C39.1395 9.04874 41.6236 10.5145 44.0962 10.1343C47.9246 9.48029 51.8299 9.44009 55.6837 10.0239C60.8788 10.7995 65.8413 12.7346 70.2646 15.7351C74.688 18.7357 78.4773 22.7471 81.374 27.5151C83.784 31.146 85.612 35.1584 86.7829 39.392C87.4291 41.7503 89.9423 43.1781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                  Signing up...
                </div>
              ) : (
                "Sign up"
              )}
            </button>
            <p className="text-sm font-light text-gray-800">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-black hover:underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
