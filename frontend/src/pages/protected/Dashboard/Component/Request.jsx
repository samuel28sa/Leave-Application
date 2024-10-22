import React from "react";

const AdminLeaveApprovalPage = () => {
  // Sample leave requests for design purposes
  const leaveRequests = [
    {
      id: 1,
      user: "John Doe",
      typeOfLeave: "Sick Leave",
      fromDate: "2024-10-10",
      toDate: "2024-10-15",
      status: "pending",
    },
    {
      id: 2,
      user: "Jane Smith",
      typeOfLeave: "Vacation",
      fromDate: "2024-11-01",
      toDate: "2024-11-07",
      status: "approved",
    },
    {
      id: 3,
      user: "Mark Johnson",
      typeOfLeave: "Personal Leave",
      fromDate: "2024-09-05",
      toDate: "2024-09-10",
      status: "denied",
    },
  ];

  return (
    <div className="p-8 bg-white-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white-700">Leave Requests</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-orange-400 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Type of Leave</th>
              <th className="py-3 px-6 text-left">From</th>
              <th className="py-3 px-6 text-left">To</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white-200 text-sm">
            {leaveRequests.map((request) => (
              <tr
                key={request.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <span className="font-medium">{request.user}</span>
                </td>
                <td className="py-3 px-6 text-left">{request.typeOfLeave}</td>
                <td className="py-3 px-6 text-left">
                  {new Date(request.fromDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(request.toDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-6 text-left">
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
                <td className="py-3 px-6 text-center">
                  {request.status === "pending" ? (
                    <div className="flex item-center justify-center space-x-2">
                      <button className="bg-green-500 hover:bg-green-700 text-white py-1 px-3 rounded">
                        Approve
                      </button>
                      <button className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaveApprovalPage;
