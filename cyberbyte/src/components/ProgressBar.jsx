// src/components/ProgressiveCircle.js
import React from "react";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressiveCircle = ({ progress = 0, size = 50, color = "#00aaff" }) => {
  return (
    <div className="flex items-center justify-center">
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          pathColor: color,
          textColor: "#333",
          trailColor: "#d6d6d6",
          strokeLinecap: "round",
        })}

        strokeWidth={5}
        className="w-20 h-20"
      />
    </div>
  );
};

export default ProgressiveCircle;
