import React from "react";
import { useNavigate } from "react-router-dom";
import { GiPadlock } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../../../images/logo.png";
import "../Login/Login.css";
import image from "../../../images/leave-management.svg";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row p-2 h-[700px] m-2 rounded-lg border border-black w-[1520px]">
      <div className="flex flex-column justify-centre w-[800px]">
        <img src={image} alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-col w-96 p-8 items-center justify mt-8 ">
        {/* Login screen */}
        <img src={logo} alt="logo" className="w-24 h-24" />
        <div className="text-center font-bold text-xs py-4 text-[#f58634]">
          <h1>Login</h1>
        </div>

        <form className="w-3/4">
          <div className="email-field">
            <label htmlFor="">Email</label>
            <div className="relative">
              <MdOutlineEmail className="h-6 w-6 p-1 absolute  top-2.5 left-1 translate-y--1/2 " />
              <input
                type="email"
                name="email"
                className="w-full p-3 pl-8  border-black shadow appearance-none border rounded-lg  text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                placeholder="Email"
                required
              />
            </div>
          </div>
          <br />

          <div className="padlock-field">
            <label htmlFor="">Password</label>
            <div className="relative">
              <GiPadlock className="h-6 w-6 p-1 absolute  top-2.5 left-1 translate-y--1/2 " />
              <input
                type="password"
                name="password"
                className="w-full p-3 pl-8  border-black shadow appearance-none border rounded-lg  text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                placeholder="Password"
                required
              />
            </div>
          </div>

        <a href="#" 
              onClick={() => {
                navigate("/resetpassword");
              }}><div className="float-right text-[#f58634] hover:underline font-">
            
            
              {" "}
              forgot password
            
            ?
          </div>
          </a>
          <br />
          <br />
          <br />

          <div  onClick={() => {
                  navigate("/admin");
                }} className="">
            <button
              type="submit"
              className="bg-[#f58634] text-white w-full p-2 rounded hover:bg-[#d97b3c] font-bold hover:border-none focus:outline-none"
            >
              Login
            </button>
            <br />
            <br />
          </div>

  
        </form>
      </div>
    </div>
  );
};

export default Login;
