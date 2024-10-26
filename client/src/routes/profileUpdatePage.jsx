import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";


function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: currentUser.username || "",
    email: currentUser.email || "",
    password: "",
  });
  const [imageUrl, setImageUrl] = useState(currentUser.avatar || "");
  const [avatarFile, setAvatarFile] = useState(null); 

  const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  // Handle avatar file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setImageUrl(URL.createObjectURL(file)); // For preview purposes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to hold the updated fields and avatar
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    if (formData.password) {
      formDataToSend.append("password", formData.password); // Only append if the password is being updated
    }
    if (avatarFile) {
      formDataToSend.append("avatar", avatarFile); // Append avatar file if it exists
    }

    try {
      // Make the API request to update the user
      const res = await apiRequest.put(`/users/${currentUser.id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure form-data encoding
        },
      });

      // Update the user in the frontend state
      updateUser(res.data);
      console.log(res.data.avatar)
      navigate("/profile"); // Redirect to the profile page after successful update
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An error occurred while updating your profile.");
    }
  };
  
  

  return (
    <div className="flex flex-col items-center  min-h-screen bg-white dark:bg-black">
      <h1 className="text-5xl text-black dark:text-white font-bold my-12">Profile Settings</h1>
      <div className="flex flex-row items-start justify-between w-full max-w-5xl">
        {/* Dropzone */}
        <div className="flex items-center justify-center w-1/3">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-300 dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div className="flex flex-col items-center justify-center p-6">
              <div className="flex items-center justify-center mb-2">
                <img
                  src={imageUrl || currentUser.avatar}
                  alt="Avatar Preview"
                  className="w-40 h-40 rounded-full object-cover"
                />
              </div>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Form */}
        <div className="w-2/3 ml-10">
          <form className="max-w-md mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
            {error && <span>{error}</span>}

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                id="username"
                className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="username"
                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Username
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="email"
                className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                value={formData.email}
                onChange={handleChange}
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="password"
                className="block py-2.5 px-0 w-full text-slg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                New Password
              </label>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
