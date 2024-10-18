import React, { useState } from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Applayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform fixed lg:relative z-30 w-64 bg-gray-900 text-white h-full p-4`}
      >
        <SideBar />
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header: Fixed at the top, always visible */}
        <header className="w-full bg-white shadow fixed top-0 left-0 right-0 z-20 p-4">
          <div className="flex justify-between items-center">
            <button
              className="lg:hidden text-gray-900"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
             
            </button>
            <Header />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Applayout;
