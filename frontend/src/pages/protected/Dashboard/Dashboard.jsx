import { useState } from "react";
import Cards from "../../../components/Cards.jsx";
import Panel from "./Component/Panel/index.jsx";
import image3 from "../../../assets/Image3.png";
import { useNavigate } from "react-router-dom";
import useLeaveRequests from "../../../hooks/useLeaveRequests.jsx";
import useAnnouncements from "../../../hooks/useAnnouncements.jsx";
import useDashStats from "../../../hooks/useDashStats.jsx";
import useProfile from "../../../hooks/useProfile.jsx";
import Spinner from "../../../components/Spinner.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, loading: loadingLeave, error: errorLeave } = useDashStats();
  const { user } = useProfile();
  const { usersOnLeave, leaveStats, userLeaveStatus } = stats;
  const {
    requests,
    loading,
    error: errorRequest,
  } = useLeaveRequests(user?._id);
  const [selectedRange, setSelectedRange] = useState("Today");
  const {
    announcements,
    loading: announcementLoading,
    error,
  } = useAnnouncements();
  const isAdmin = user?.role === "admin";

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  return (
    <div className="w-full">
      <section className="flex items-center justify-between p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="text-xl font-semibold text-gray-700">
          Welcome Back, <span className="capitalize">{user?.name}</span> 👋
        </div>
        <button
          className="px-4 py-2 text-white transition bg-orange-500 rounded-lg shadow-md hover:bg-orange-600"
          onClick={() => navigate("/admin/form")}
        >
          Request Leave
        </button>
      </section>

      <section className="grid w-full grid-cols-2 gap-3">
        <div className="grid col-span-2 gap-2 p-1 lg:grid-cols-5">
          <Cards title={"Casual Leave"} avail={user?.casualLeave} used={0} />
          <Cards title={"Sick Leave"} avail={user?.adjustmentLeave} used={0} />
          <Cards title={"Annual Leave"} avail={user?.annualLeave} used={0} />
          {/* <Cards title={"Adjustment Leave"} avail={5} used={0} /> */}
          <Cards title={"Unpaid Leave"} avail={user?.unpaidLeave} used={0} />
          <Cards title={"Half Leave"} avail={user?.halfLeave} used={0} />
        </div>

        <div className="grid col-span-2 gap-2 lg:grid-cols-6">
          <div className="flex flex-col h-full col-span-4 gap-2 ">
            {/* Announcements Panel */}
            {isAdmin && (
              <Panel className="h-48 p-4 rounded-lg shadow-md bg-gray-50">
                <h3 className="mb-2 text-lg font-bold text-black">
                  Announcements 📢
                </h3>
                <div className="mb-4 border-b-2 border-gray-300"></div>
                <div className="mt-2">
                  {announcementLoading ? (
                    <Spinner />
                  ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                  ) : (
                    <ul className="space-y-2">
                      {announcements?.length === 0 ? (
                        <p className="text-gray-500">
                          No announcements to show
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {announcements?.map((announcement) => (
                            <li
                              key={announcement._id}
                              className="p-2 rounded-md"
                            >
                              <h4 className="font-semibold capitalize">
                                {announcement.title}
                              </h4>
                              <p className="text-sm ">{announcement.content}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </ul>
                  )}
                </div>
              </Panel>
            )}

            {!isAdmin && (
              <Panel className="rounded-lg shadow-md h-96">
                <h3 className="font-bold text-black">Your Leave Requests</h3>
                <div className="border-b-2 border-b-grey-400"></div>
                <div className="mt-4">
                  {loading ? (
                    <Spinner />
                  ) : errorRequest ? (
                    <p>Error: {errorRequest}</p>
                  ) : (
                    <table className="min-w-full bg-white shadow-md">
                      <thead className="text-sm leading-normal text-orange-400 uppercase bg-gray-200">
                        <tr>
                          <th className="px-6 py-3 text-left">User</th>
                          <th className="px-6 py-3 text-left">Type of Leave</th>
                          <th className="px-6 py-3 text-left">From</th>
                          <th className="px-6 py-3 text-left">To</th>
                          <th className="px-6 py-3 text-left">Total Days</th>
                          <th className="px-6 py-3 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm bg-white-200">
                        {(requests ?? []).length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-6 py-4 text-center">
                              You have no leave requests
                            </td>
                          </tr>
                        ) : (
                          (requests ?? []).map((request) => (
                            <tr
                              key={request._id}
                              className="border-b border-gray-200 hover:bg-gray-100"
                            >
                              <td className="px-6 py-4 capitalize whitespace-nowrap">
                                {request?.user?.name}
                              </td>
                              <td className="px-6 py-4 capitalize whitespace-nowrap">
                                {request.typeOfLeave}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(
                                  request.fromDate
                                ).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(request.toDate).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-left capitalize whitespace-nowrap">
                                {request.totalDays}
                              </td>
                              <td className="px-6 py-4 capitalize whitespace-nowrap">
                                <span
                                  className={`${
                                    request.status === "approved"
                                      ? "text-green-500"
                                      : request.status === "denied"
                                      ? "text-red-500"
                                      : "text-yellow-500"
                                  } font-semibold`}
                                >
                                  {request.status.charAt(0).toUpperCase() +
                                    request.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </Panel>
            )}
          </div>

          <div className="flex flex-col col-span-2 gap-2 rounded-md">
            <Panel className="h-64 rounded-lg shadow-md">
              <h3 className="font-bold text-black">Who's on leave🤷‍♂️</h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <select
                className="p-2 mt-1 border border-gray-600 rounded"
                value={selectedRange}
                onChange={handleRangeChange}
              >
                <option value="Today">Today</option>
                <option value="Yesterday">Yesterday</option>
                <option value="Last Week">Last Week</option>
              </select>
              <div className="mt-4">
                {loadingLeave ? (
                  <Spinner />
                ) : errorLeave ? (
                  <p>Error: {errorLeave}</p>
                ) : (
                  <ul>
                    {usersOnLeave?.length === 0 ? (
                      <p className="text-center text-muted-foreground">
                        No one is on leave
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {usersOnLeave?.map((leave) => (
                          <li
                            key={leave._id}
                            className="flex items-center space-x-2"
                          >
                            <span className="font-medium capitalize">
                              {leave?.user?.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({leave?.user?.department})
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(leave?.fromDate).toLocaleDateString()} -{" "}
                              {new Date(leave?.toDate).toLocaleDateString()}
                            </span>
                            <span className="font-medium capitalize">
                              {leave?.totalDays}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ul>
                )}
              </div>
            </Panel>

            {/* <Panel className="rounded-lg shadow-md h-80">
              <h3 className="font-bold text-black">
                Celebrations this month🎉
              </h3>
              <div className="border-b-2 border-b-grey-400"></div>
              <div className="flex justify-center mt-8">
                <img src={image3} />
              </div>
            </Panel> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
