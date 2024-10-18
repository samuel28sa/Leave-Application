import React from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import { Outlet } from "react-router-dom";

import { MdDashboard } from "react-icons/md";

const History = () => {
  const leaveData = [
    { type: "Medical leave", used: 0, taken: 0, entitled: 0, balance: 15 },
    { type: "Vacation leave", used: 0, taken: 0, entitled: 0, balance: 15 },
    { type: "Maternity leave", used: 0, taken: 0, entitled: 0, balance: 20 },
    { type: "Sick leave", used: 0, taken: 0, entitled: 0, balance: 3 },
    { type: "Emergency leave", used: 0, taken: 0, entitled: 0, balance: 3 },
  ];
  return (
    <>
      <div>history</div>
      <div className="bg-orange-50 p-4 rounded-md">
        <h2 className="text-xl font-bold mb-4">Leave History</h2>
        <table className="w-full h-96">
          <thead>
            <tr>
              <th className="text-left font-bold">Leave Balance</th>
              {/* <th className="text-center font-bold">Used</th> */}
              <th className="text-center font-bold">Taken</th>
              <th className="text-center font-bold">Entitled</th>
              <th className="text-center font-bold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item.type}</td>
                {/* <td className="text-center">{item.used}</td> */}
                <td className="text-center">{item.taken}</td>
                <td className="text-center">{item.entitled}</td>
                <td className="text-center">{item.balance} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ;
    </>
  );
};

export default History;
