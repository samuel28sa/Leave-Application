import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiSettings, FiList } from "react-icons/fi"; // Added FiList for Request icon
import download from "../assets/download.jpeg";
import useProfile from "../hooks/useProfile";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useProfile();

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-secondary border-r-2 text-white transition-width duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex flex-col items-center justify-center p-4">
        <img
          src={download}
          alt="image"
          className="border rounded-full h-28 w-28"
        />
        <span className="text-primary text-sm mt-2">Cyberbyte</span>
      </div>
      <nav className="mt-5">
        <NavLink
          to="/admin"
          className="flex items-center p-4 hover:bg-gray-700"
        >
          <FiHome className="text-2xl fill-primary" />
          <span
            className={`ml-4 text-lg text-primary font-semibold transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            Dashboard
          </span>
        </NavLink>

        {user?.role === "admin" && (
          <NavLink
            to="/admin/request"
            className="flex items-center p-4 hover:bg-gray-700"
          >
            <FiList className="text-2xl fill-primary text-primary" />
            <span
              className={`ml-4 text-lg transition-opacity duration-300 text-primary font-semibold ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Request
            </span>
          </NavLink>
        )}

        <NavLink
          to="/admin/history"
          className="flex items-center p-4 hover:bg-gray-700"
        >
          <FiSettings className="text-2xl fill-primary" />
          <span
            className={`ml-4 text-lg transition-opacity duration-300 text-primary font-semibold ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            History
          </span>
        </NavLink>
        {user?.role === "admin" && (
          <NavLink
            to="/admin/CreateAnnouncements"
            className="flex items-center p-4 hover:bg-gray-700"
          >
            <FiList className="text-2xl fill-primary text-primary" />
            <span
              className={`ml-4 text-lg transition-opacity duration-300 text-primary font-semibold ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Create Announcements
            </span>
          </NavLink>
        )}
      </nav>
    </div>
  );
};
export default Sidebar;
