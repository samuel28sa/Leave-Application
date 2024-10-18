import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const [announcements, setAnnouncements] = useState([]);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [errorAnnouncements, setErrorAnnouncements] = useState(null);

  const [leaveData, setLeaveData] = useState([]);
  const [loadingLeave, setLoadingLeave] = useState(false);
  const [errorLeave, setErrorLeave] = useState(null);
  const [selectedRange, setSelectedRange] = useState("Today");
  const [loadingLeaveRequests, setLoadingLeaveRequests] = useState(false);
  const [errorLeaveRequests, setErrorLeaveRequests] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("/api/announcements");
        setAnnouncements(response.data);
      } catch (err) {
        setErrorAnnouncements(err.message || "Error fetching announcements");
      } finally {
        setLoadingAnnouncements(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Fetch leave data based on selected range
  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoadingLeave(true);
      try {
        const response = await axios.get(`/api/leaves`, {
          params: { range: selectedRange },
        });
        setLeaveData(response.data);
      } catch (error) {
        setErrorLeave(error.message || "Error fetching leave data");
      } finally {
        setLoadingLeave(false);
      }
    };

    fetchLeaveData();
  }, [selectedRange]);

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get("/api/leaves/user"); // Update this API endpoint as per your routes
        setLeaveRequests(response.data);
      } catch (err) {
        setErrorLeaveRequests(err.message || "Error fetching leave requests");
      } finally {
        setLoadingLeaveRequests(false);
      }
    };

    fetchLeaveRequests();
  }, []);

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
            {/* Announcements Panel */}
            <Panel className="h-48">
              <h3 className="text-black font-bold">Announcements📢</h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <div className="mt-4">
                {loadingAnnouncements ? (
                  <p>Loading announcements...</p>
                ) : errorAnnouncements ? (
                  <p>Error: {errorAnnouncements}</p>
                ) : (
                  <ul>
                    {announcements.length === 0 ? (
                      <p>No announcements to show</p>
                    ) : (
                      announcements.map((announcement) => (
                        <li key={announcement._id} className="py-1">
                          <strong>{announcement.title}</strong>
                          <p>{announcement.content}</p>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            </Panel>

            <Panel className="h-96">
              <h3 className="text-black font-bold">Your Leave Requests</h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <div className="mt-4">
                {loadingLeaveRequests ? (
                  <p>Loading leave requests...</p>
                ) : errorLeaveRequests ? (
                  <p>Error: {errorLeaveRequests}</p>
                ) : (
                  <ul>
                    {leaveRequests.length === 0 ? (
                      <p>You have no leave requests</p>
                    ) : (
                      leaveRequests.map((leave) => (
                        <li key={leave._id} className="py-1">
                          <strong>
                            {leave.startDate.split("T")[0]} to{" "}
                            {leave.endDate.split("T")[0]}
                          </strong>
                          : {leave.reason} -{" "}
                          <span className={`status-${leave.status}`}>
                            {leave.status}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            </Panel>
          </div>

          <div className="flex gap-2 flex-col col-span-2 rounded-md">
            {/* Who's on leave Panel */}
            <Panel className="h-64">
              <h3 className="text-black font-bold">Who's on leave🤷‍♂️</h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <select
                className="date-range"
                value={selectedRange}
                onChange={handleRangeChange}
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last Week">Last Week</option>
              </select>
              <div className="mt-4">
                {loadingLeave ? (
                  <p>Loading leave data...</p>
                ) : errorLeave ? (
                  <p>Error: {errorLeave}</p>
                ) : (
                  <ul>
                    {leaveData.length === 0 ? (
                      <p>No one is on leave</p>
                    ) : (
                      leaveData.map((leave) => (
                        <li key={leave._id} className="py-1">
                          <strong>{leave.userId.username}</strong> is on leave
                          from {new Date(leave.startDate).toLocaleDateString()}{" "}
                          to {new Date(leave.endDate).toLocaleDateString()}
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            </Panel>

            <Panel className="h-80">
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
