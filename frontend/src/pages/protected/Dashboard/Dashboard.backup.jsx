import React from "react";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import { Outlet } from "react-router-dom";
import download from "../../assets/download.jpeg";
import { PiHandWavingFill } from "react-icons/pi";
import "./Dashboard.css";
import Cards from "../../../components/Cards";
import { GrAnnounce } from "react-icons/gr";
import { MdSearch } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="container">
      <div className="welcome">
        <h3>Welcome back, joy</h3>
        <PiHandWavingFill className="waving-icon" />
      </div>

      <div className="card">
        <Cards title={"Casual Leave"} avail={"05"} used={"02"} />
        <Cards title={"Sick Leave"} avail={"05"} used={"02"} />
        <Cards title={"Earned Leave"} avail={"05"} used={"02"} />
        <Cards title={"Adjustment Leave"} avail={"05"} used={"02"} />
        <Cards title={"Unpaid Leave"} avail={"05"} used={"02"} />
        <Cards title={"Half Leave"} avail={"05"} used={"02"} />
      </div>

      <div className="first-section">
        <div className="announcements">
          <h3 className="leave-title">Announcements</h3>
          <GrAnnounce className="announcements-logo" />
        </div>

        <div className="requests">
          <h3 className="leave-title">Leave Request</h3>
          <div className="request-logo"></div>
        </div>
      </div>

      <div className="second-section">
        <div className="who">
          <div className="h2">
            <h4 className="leave-title">Who's on Leave</h4>
          </div> 
          
          <div className="on-leave">
            <h4>On leave: </h4>
            <select className="date-range">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last Week</option>
            </select>
          </div>
        </div>

        <div className="celebrate">
          <div className="celeb">
            <h3 className="title">Celebrations this month🎉</h3>
          </div>
          <MdSearch className="search-icon" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
