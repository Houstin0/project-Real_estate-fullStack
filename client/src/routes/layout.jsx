import Navbar from "../components/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Layout() {
  return (
    <div className="layout h-screen">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout h-screen">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
