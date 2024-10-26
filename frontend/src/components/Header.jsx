import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import useProfile from "../hooks/useProfile";
import { createPortal } from "react-dom";
import { useGlobalContext } from "../context/userContext";

const Header = ({ toggleSidebar }) => {
  const { user } = useProfile();
  const [showModal, setShowModal] = useState(false);
  const { logout } = useGlobalContext();
  const [showMenu, setShowMenu] = useState(false);

  const handleModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between p-4 bg-white shadow">
        <button onClick={toggleSidebar}>
          <FiMenu className="text-2xl" />
        </button>
        <button
          onClick={handleMenuToggle}
          className="text-lg font-bold capitalize"
        >
          {user?.name}
        </button>
      </header>

      {showMenu ? (
        <div className="absolute right-0 w-48 mt-2 mr-4 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-orange-200 hover:text-gray-900"
              onClick={handleModal}
            >
              Logout
            </button>
            {/* <button
              className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 justify-betweenblock hover:bg-orange-200 hover:text-gray-900"
              onClick={handleReportSelectionModal}
              style={{ transition: "background-color 300ms" }}
            >
              <span>Export Report</span>
              <div className="transition-transform transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 text-white ${
                    showReportStatusDropdown ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button> */}
          </div>
        </div>
      ) : null}

      {showModal &&
        createPortal(
          <div
            className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-50 backdrop-filter backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <div className="p-6 bg-white rounded-lg shadow-lg modal">
              <h2 className="mb-4 text-lg font-semibold">
                Are you sure you want to logout?
              </h2>
              <div className="flex space-x-4">
                <button
                  className="flex-1 py-2 text-white bg-green-500 rounded-lg confirm-btn hover:bg-green-600"
                  onClick={logout}
                >
                  Confirm
                </button>
                <button
                  className="flex-1 py-2 text-white bg-red-500 rounded-lg confirm-btn hover:bg-red-600"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Header;
