import React, { useState } from "react";
import ProgressiveCircle from "./ProgressBar";

const Cards = (props) => {
  const { title, avail, used } = props;
  const [progress, setProgress] = useState(50);
  return (
    <div className="w-full">
      <div className="card-body">
        <span className="card-title">{title}</span>
        <ProgressiveCircle progress={progress} size={150} color="green-500" />
        <div className="card-details">
          <span>Avail: {avail}</span>
          <span>Used: {used}</span>
        </div>
      </div>
    </div>
  );
};

export default Cards;
