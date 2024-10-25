import React, { useState } from "react";
import useDashStats from "../../../hooks/useDashStats";
import Spinner from "../../../components/Spinner";

const AdminLeaveApprovalPage = () => {
  const { stats, loading, error } = useDashStats();
  const { usersOnLeave } = stats;

  const itemsPerPage = 10; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usersOnLeave?.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(usersOnLeave?.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="">
      <h1 className="mb-6 text-3xl font-bold text-white-700">Leave Requests</h1>

      <div className="overflow-x-auto">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="min-w-full overflow-hidden bg-white rounded-lg shadow-md">
            <thead className="text-sm leading-normal text-orange-400 uppercase bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Type of Leave</th>
                <th className="px-6 py-3 text-left">From</th>
                <th className="px-6 py-3 text-left">To</th>
                <th className="px-6 py-3 text-left">Total Days</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm bg-white-200">
              {(currentItems ?? []).length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center">
                    You have no leave requests
                  </td>
                </tr>
              ) : (
                currentItems?.map((request) => (
                  <tr
                    key={request._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="px-6 py-3 text-left whitespace-nowrap">
                      <span className="font-medium capitalize">
                        {request.user?.name}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-left capitalize">
                      {request?.typeOfLeave}
                    </td>
                    <td className="px-6 py-3 text-left">
                      {new Date(request?.fromDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-left">
                      {new Date(request?.toDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-left capitalize whitespace-nowrap">
                      {request.totalDays}
                    </td>
                    <td className="px-6 py-3 text-left">
                      <span
                        className={`${
                          request?.status === "approved"
                            ? "text-green-500"
                            : request?.status === "denied"
                            ? "text-red-500"
                            : "text-yellow-500"
                        } font-semibold`}
                      >
                        {request?.status.charAt(0).toUpperCase() +
                          request?.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-center">
                      {request?.status === "pending" ? (
                        <div className="flex justify-center space-x-2 item-center">
                          <button className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-700">
                            Approve
                          </button>
                          <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700">
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-end mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-orange-400 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminLeaveApprovalPage;
