import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const Applayout = () => {
  return (
    <div className="layout">
      <div className="sidebar-nav">
        <SideBar />
      </div>
      <div className="content">
        <div className="header">
          <Header />
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default Applayout;
