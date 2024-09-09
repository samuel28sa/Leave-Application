import React from "react";
import { useNavigate } from "react-router-dom";
import { GiPadlock } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import { PiHandWavingFill } from "react-icons/pi";
import logo from "../../../assets/images/logo.png";
import "./Login.css";
import image from "../../../assets/images/leave-management.svg";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <form className="form">
        <div className="welcome">
          <h1>Welcome back</h1>
          <PiHandWavingFill className="waving-icon" />
        </div>
        <img src={logo} alt="logo" className="logo" />

        <div className="email-field">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            className="email"
            placeholder="enter your email"
          />
          <MdOutlineEmail className="email-icon" />
        </div>

        <div className="padlock-field">
          <label htmlFor="">Password</label>
          <input
            type="text"
            name="password"
            className="password"
            placeholder="enter your password"
          />
          <GiPadlock className="padlock" />
        </div>

        <div className="send">
          <button className="submit">
            Login
          </button>
        </div>

        <div className="send">
          <div className="signup">
            <span
              onClick={() => {
                navigate("/signup");
              }}
            >
              signup?
            </span>
          </div>

          <div className="forgot-password">
            lost password?<span>click-here</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
