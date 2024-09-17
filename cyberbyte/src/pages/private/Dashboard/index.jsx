import React from "react";
import Header from "../../../components/Header";
import SideBar from "../../../components/SideBar";
import { Outlet } from "react-router-dom";
import { PiHandWavingFill } from "react-icons/pi";
import "./Dashboard.css";
import Cards from "../../../components/Cards";
import { GrAnnounce } from "react-icons/gr";
import { MdSearch } from "react-icons/md";
import Panel from "./Component/Panel";
import image from "../../../assets/Image.png";
import image2 from "../../../assets/Image2.png";
import image3 from "../../../assets/Image3.png";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <section className="flex items-center justify-between p-1 ">
        <div>Welcome Back, Joy 👋</div>
        <div className="text-white border p-3 border-orange-400 rounded-md bg-orange-400">
          <div
            className=" cursor-pointer"
            onClick={() => navigate("/admin/form")}
          >
            Request Leave
          </div>
        </div>
      </section>
      {/* <div className="">
        <div className="grid grid-cols-6"></div>
      </div> */}
      <section className="grid grid-cols-2 w-full gap-3">
        <div className="col-span-2 grid grid-cols-6 gap-2">
          <Cards title={"Casual Leave"} avail={5} used={0} />
          <Cards title={"Sick Leave"} avail={5} used={0} />
          <Cards title={"Earned Leave"} avail={5} used={0} />
          <Cards title={"Adjustment Leave"} avail={5} used={0} />
          <Cards title={"Unpaid Leave"} avail={5} used={0} />
          <Cards title={"Half Leave"} avail={5} used={0} />
        </div>
        <div className="col-span-2 grid grid-cols-6 gap-2">
          <div className="flex gap-2 flex-col col-span-4 h-full">
            <Panel
              className="h-48"
              Background={() => (
                <div className="flex justify-center h-fit"></div>
              )}
            >
              <h3 className="text-black- font-bold">Announcements📢</h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <div className="flex justify-center mt-6">
                <img src={image2} />
              </div>
            </Panel>
            <Panel
              className="h-96"
              Background={() => (
                <div className="flex justify-center h-fit">
                  {" "}
                  <div className=" flex justify-center mt-8">
                    <img src={image} />
                  </div>
                </div>
              )}
            >
              <h3 className="text-black font-bold">Leave Request</h3>
              <div className="border-b-2 border-b-grey-400"></div>
            </Panel>
          </div>
          <div className="flex gap-2 flex-col col-span-2 rounded-md">
            <Panel
              className="h-64"
              Background={() => (
                <div className="flex justify-center h-fit  "></div>
              )}
            >
              <h3 className="text-black font-bold"> Who's on leave🤷‍♂️</h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <select className="date-range">
                <option>Today</option>
                <option>Yesterday</option>
                <option>Last Week</option>
              </select>
              <div className="flex justify-center mt-6">
                <img src={image3} />
              </div>
            </Panel>
            {/* <select className="date-range"> 
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last Week</option>
            </select> */}
            <Panel
              className="h-80"
              Background={() => (
                <div className="flex justify-center h-fit"></div>
              )}
            >
              <h3 className="text-black font-bold">
                Celebrations this month🎉
              </h3>

              <div className="border-b-2 border-b-grey-400"></div>
              <div className="flex justify-center mt-8">
                <img src={image3} />
              </div>
            </Panel>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
