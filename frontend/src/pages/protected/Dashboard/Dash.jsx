import { useContext, useState } from "react";
import Cards from "../../../components/Cards";
import Panel from "./Component/Panel";
import image3 from "../../../assets/Image3.png";
import { useNavigate } from "react-router-dom";
import useLeaveRequests from "../../../hooks/useLeaveRequests";
import { useGlobalContext } from "../../../context/userContext";
import useAnnouncements from "../../../hooks/useAnnouncements.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const {user} = useGlobalContext()
  const { requests, loading } = useLeaveRequests(user?._id);
  const [announcements, setAnnouncements] = useState([])

  const [leaveData, setLeaveData] = useState([]);
  const [loadingLeave, setLoadingLeave] = useState(false);
  const [errorLeave, setErrorLeave] = useState(null);
  const [selectedRange, setSelectedRange] = useState("Today");
  const [isLoading, setIsLoading] = useState(false);
  const [errorLeaveRequests, setErrorLeaveRequests] = useState(false);
  const [error, setError] = useState([])

  // // Fetch leave data based on selected range
  // useEffect(() => {
  //   const fetchLeaveData = async () => {
  //     setLoadingLeave(true);
  //     try {
  //       const response = await axios.get(`/api/leaves`, {
  //         params: { range: selectedRange },
  //       });
  //       setLeaveData(response.data);
  //     } catch (error) {
  //       setErrorLeave(error.message || "Error fetching leave data");
  //     } finally {
  //       setLoadingLeave(false);
  //     }
  //   };

  //   fetchLeaveData();
  // }, [selectedRange]);

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };
  // useEffect(() => {
  //   const fetchLeaveRequests = async () => {
  //     try {
  //       const response = await axios.get("/api/leaves/user"); // Update this API endpoint as per your routes
  //       setLeaveRequests(response.data);
  //     } catch (err) {
  //       setErrorLeaveRequests(err.message || "Error fetching leave requests");
  //     } finally {
  //       setLoadingLeaveRequests(false);
  //     }
  //   };

  //   fetchLeaveRequests();
  // }, []);

  return (
    <div className="w-full">
      <section className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg mb-6">
        <div className="text-xl font-semibold text-gray-700">
          Welcome Back, <span className="capitalize">{user?.name}</span> 👋
        </div>
        <button
          className="bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 transition"
          onClick={() => navigate("/admin/form")}
        >
          Request Leave
        </button>
      </section>

      <section className="grid grid-cols-2 w-full gap-3">
        <div className="col-span-2 grid grid-cols-5 gap-2 p-1">
          <Cards title={"Casual Leave"} avail={user?.casualLeave} used={0} />
          <Cards title={"Sick Leave"} avail={user?.adjustmentLeave} used={0} />
          <Cards title={"Annual Leave"} avail={user?.annualLeave} used={0} />
          {/* <Cards title={"Adjustment Leave"} avail={5} used={0} /> */}
          <Cards title={"Unpaid Leave"} avail={user?.unpaidLeave} used={0} />
          <Cards title={"Half Leave"} avail={user?.halfLeave} used={0} />
        </div>

        <div className="col-span-2 grid grid-cols-6 gap-2">
          <div className="flex gap-2 flex-col col-span-4 h-full ">
            {/* Announcements Panel */}
            <Panel className="h-48 shadow-md rounded-lg">
              <h3 className="text-black font-bold">Announcements📢</h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <div className="mt-4">
                {isLoading ? (
                  <p>Loading announcements...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : (
                  <ul>
                    {announcements?.length === 0 ? (
                      <p>No announcements to show</p>
                    ) : (
                      announcements?.map((announcement) => (
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

            <Panel className="h-96 shadow-md rounded-lg">
              <h3 className="text-black font-bold">Your Leave Requests</h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <div className="mt-4">
                {loading ? (
                  <p>Loading leave requests...</p>
                ) : errorLeaveRequests ? (
                  <p>Error: {errorLeaveRequests}</p>
                ) : (
                  <ul>
                    {requests.length === 0 ? (
                      <p>You have no leave requests</p>
                    ) : (
                      requests.map((leave) => (
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
            <Panel className="h-64 shadow-md rounded-lg">
              <h3 className="text-black font-bold">Who's on leave🤷‍♂️</h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <select
                className="border p-2 mt-1 rounded border-gray-600"
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

            <Panel className="h-80 shadow-md rounded-lg">
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
