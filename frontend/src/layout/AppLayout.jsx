import React, { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Function to handle screen resize and collapse sidebar on smaller screens
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false); // Collapse on mobile
    } else if (window.innerWidth <= 1162) {
      setIsSidebarOpen(true); // Collapse on medium screens (md)
    } else {
      setIsSidebarOpen(true); // Expand on larger screens
    }
  };

  const Fallback = () => (
    <div className="flex items-center justify-center h-screen bg-secondary">
      <Spinner className={`w-10 h-10`} />
    </div>
  );

  useEffect(() => {
    handleResize(); // Initial check on page load
    window.addEventListener("resize", handleResize); // Handle screen resize

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Content */}
        <div className="h-full p-4 bg-secondary">
          <Suspense fallback={<Fallback />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
