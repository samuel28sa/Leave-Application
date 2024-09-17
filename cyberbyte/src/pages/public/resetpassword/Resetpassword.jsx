import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import axios from 'axios';


const Resetpassword = () => { 
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  
  const handleSubmit = async (e) => {
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto bg-white w-[1536px]">
      <div className=" rounded-lg p-12  bg-[#E1DBDB]">
        <div  onClick={() => {
                  navigate("/resetpassword");
                }} className="bg-[#E1DBDB] cursor-pointer">
          <MdOutlineArrowBackIosNew className="border rounded-3xl bg-[#f58634] w-10 h-10 p-2" />
        </div> <br /> 

        <div className="text-2xl font-bold  pb-8 text-center font-[inter] bg-[#E1DBDB]">
          <p className="bg-[#E1DBDB]">Reset password</p>
        </div>
          <p className=" font-[inter]  bg-[#E1DBDB]  text-[#989899] pb-2 ">
            please enter your new password to reset the password
          </p>
        
        <form onSubmit={handleSubmit}>
          <div className="bg-[#E1DBDB] ">
            <label className=" bg-[#E1DBDB]" htmlFor="">
                New password
            </label>

            <input
              type="password"
              className="border rounded-lg  w-full p-2 focus:outline-none"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              
            />
          </div><br />
          <div className="bg-[#E1DBDB] ">
            <label className=" bg-[#E1DBDB]" htmlFor="">
                Confirm password
            </label>

            <input
              type="password"
              className="border rounded-lg  w-full p-2 focus:outline-none"
              placeholder="Confirm your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              
            />
          </div>
        </form>
        <div className="text-center pt-8 bg-[#E1DBDB] pb-20 ">
          <button className=" bg-[#f58634] p-2 w-full rounded-lg text-black border-none hover:bg-[#e4813f] focus:outline-none">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
