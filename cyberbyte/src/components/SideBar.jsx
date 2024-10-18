import React from "react";
import { useNavigate } from "react-router-dom";
import download from "../assets/download.jpeg";
import { MdDashboard } from "react-icons/md";
import "../App.css";
import { GoHistory } from "react-icons/go";

const SideBar = () => {
  const navigate = useNavigate();
  const items = [
    {
      name: "Dashboard",
      icon: <MdDashboard className="w-9 h-9"/>,
      url: "/admin",
    },
    {
      name: "History",
      icon: <GoHistory className="w-9 h-9"/>,
      url: "/admin/history",
    },
  ];
  return (
    <div className="space-y-5">
      <img src={download} alt="image" className="border rounded-full" />

      <div className="space-y-5 my-2">
        {items.map((item, index) => {
          return (
            <div key={index} onClick={() => navigate(item.url)} className="flex flex-row items-center space-x-2 cursor-pointer">
              <div>{item.icon}</div>
              <span className="text-lg">{item.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
