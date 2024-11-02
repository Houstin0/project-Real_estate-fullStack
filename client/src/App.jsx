import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/homePage";
import { Layout, RequireAuth } from "./routes/layout";
import ListPage from "./routes/listPage";
import SinglePage from "./routes/singlePage";
import ProfilePage from "./routes/profilePage/profilePage";
import AdminProfilePage from "./routes/profilePage/adminProfilePage";
import UserProfilePage from "./routes/profilePage/userProfilePage";
import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import ProfileUpdatePage from "./routes/profileUpdatePage";
import NewPostPage from "./routes/newPostPage/newPostPage";
import { listPageLoader, profilePageLoader, singlePageLoader, inboxPageLoader } from "./lib/loaders";

import Inbox from "./routes/inbox";

function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader,
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader,
        },

        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/admin",
          element: <AdminProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/user",
          element: <UserProfilePage />,
          loader: profilePageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
        {
          path: "/inbox",
          element: <Inbox />,
          loader: inboxPageLoader
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
