import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import logo from "../../../images/logo.png";
import "./Signup.css";
import image from "../../../images/leave-management.svg";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row p-2 h-[700px] m-2 rounded-lg  border border-black w-[1520px]">
      <div className="flex flex-column justify-centre w-[800px] ">
        <img src={image} alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-col w-96 p-8 items-center justify ">
        <img src={logo} alt="" className="w-24 h-24" />
        <div className="text-center font-bold text-xs py-4 text-[#f58634]">
          <h1>Sign Up</h1>
        </div>

        <form className="form">
          <div className="">
            <label htmlFor="">Username</label>
            <input
              className="w-full p-3 pl-4  border-black shadow appearance-none border rounded-lg  text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
              type="text"
              name="username"
              placeholder="Username"
            
            />
          </div>
          <br />

          <div className="email-field">
            <label htmlFor="">Email</label>
            <div className="relative">
              <MdOutlineEmail className="h-6 w-6 p-1 absolute  top-2.5 left-1 translate-y--1/2" />
              <input
                className="w-full p-3 pl-8  border-black shadow appearance-none border rounded-lg  text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                placeholder="Email"
                
              />
            </div>
          </div>
          <br />

          <div className="password-field">
            <label htmlFor="">Password</label>
            <div className="relative">
              <GiPadlock className="h-6 w-6 p-1 absolute  top-2.5 left-1 translate-y--1/2" />
              <input
                className="w-full p-3 pl-8  border-black shadow appearance-none border rounded-lg  text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                placeholder="Password"
                
              />
            </div>
          </div>
          <br />

          <div className="password-field">
            <label htmlFor="">Confirm password</label>
            <div className="relative">
              <GiPadlock className="h-6 w-6 p-1 absolute  top-2.5 left-1 translate-y--1/2" />
              <input
                className="w-full p-3 pl-8  border-black shadow appearance-none border rounded-lg  text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                type="password"
                name="password"
                placeholder="Password"
              
              />
            </div>
            <br />
          </div>

          <div className="">
            <button
              type="submit"
              className="bg-[#f58634] text-white w-full p-2 rounded hover:bg-[#d97b3c] font-bold hover:border-none focus:outline-none"
            >
              Sign Up
            </button>
          </div>
          <br />

          {/* <div className="send">
            <div className="text-center ">
              Already have an account?
              <span
                className="text-[#f58634] pl-1 hover:underline"
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </span>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Signup;
