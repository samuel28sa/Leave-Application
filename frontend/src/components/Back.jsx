import React from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Back = ({ route }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(route);
      }}
      className="flex flex-row items-center gap-2 cursor-pointer"
    >
      <RiArrowLeftLine className="text-[#A8ABB0]" />
      <span className="text-[#A8ABB0]">Back</span>
    </div>
  );
};

export default Back;
