import React, { useState } from "react";
import ProgressiveCircle from "./ProgressBar";

const Cards = (props) => {
  const { title, avail, used } = props;
  const [progress, setProgress] = useState(50);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center">
      {/* Title */}
      <div className="w-full mb-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>

      {/* Progress Circle */}
      <ProgressiveCircle progress={progress} size={120} color="green-500" />

      {/* Availability and Used Info */}
      <div className="flex justify-between items-center w-full mt-4">
        <div className="text-center">
          <span className="block text-sm font-medium text-gray-600">Available</span>
          <span className="block text-lg font-semibold text-gray-800">{avail}</span>
        </div>
        <div className="text-center">
          <span className="block text-sm font-medium text-gray-600">Used</span>
          <span className="block text-lg font-semibold text-gray-800">{used}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
