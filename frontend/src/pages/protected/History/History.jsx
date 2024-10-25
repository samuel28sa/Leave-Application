import React, { useState } from "react";

const History = () => {
  const leaveData = [
    { type: "Medical leave", used: 0, taken: 0, entitled: 0, balance: 15 },
    { type: "Vacation leave", used: 0, taken: 0, entitled: 0, balance: 15 },
    { type: "Maternity leave", used: 0, taken: 0, entitled: 0, balance: 20 },
    { type: "Sick leave", used: 0, taken: 0, entitled: 0, balance: 3 },
    { type: "Emergency leave", used: 0, taken: 0, entitled: 0, balance: 3 },
    // Add more leave types if needed
  ];

  const itemsPerPage = 2; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = leaveData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(leaveData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="rounded-md bg-orange-50">
        <h2 className="mb-4 text-xl font-bold">Leave History</h2>
        <table className="min-w-full bg-white shadow-md">
          <thead className="text-sm leading-normal text-orange-400 uppercase bg-gray-200">
            <tr>
              <th className="px-6 py-3 font-bold text-left">Leave Balance</th>
              <th className="px-6 py-3 font-bold text-center">Taken</th>
              <th className="px-6 py-3 font-bold text-center">Entitled</th>
              <th className="px-6 py-3 font-bold text-center">Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 capitalize whitespace-nowrap">
                  {item.type}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {item.taken}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {item.entitled}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {item.balance} days
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </>
  );
};

export default History;
