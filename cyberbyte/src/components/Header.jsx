import React, { useState } from "react";
import image from "../assets/download.jpeg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handlelogout = () => {
    console.log("called");
    localStorage.clear();
    navigate("/");
  };

  const options = [
    {
      id: 1,
      label: "View Profile",
      onClick: () => {},
    },
    {
      id: 2,
      label: "Log out",
      onClick: () => handlelogout(),
    },
  ];

  return (
    <div className="w-full flex justify-end">
      <div className="w-1/12 flex flex-col">
        <div className="flex flex-col items-center cursor-pointer relative">
          {open && (
            <div className="bg-white absolute p-2 space-y-3 top-12 border rounded-lg">
              {options.map((item) => (
                <div
                  key={item.id}
                  className="text-sm border-b py-2"
                  onClick={item.onClick}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className="rounded-full border p-3 bg-blue cursor-pointer w-2/5"
          onClick={() => setOpen(!open)}
        >
          <span>NS</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
