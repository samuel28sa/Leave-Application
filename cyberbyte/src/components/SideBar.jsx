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
      icon: <MdDashboard />,
      url: "/admin",
    },
    {
      name: "History",
      icon: <GoHistory />,
      url: "/admin/history",
    },
  ];
  return (
    <div className="sidebar">
      <img src={download} alt="image" className="image" />

      {items.map((item, index) => {
        return (
          <div key={index} onClick={() => navigate(item.url)}>
            <div>{item.icon}</div>
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
