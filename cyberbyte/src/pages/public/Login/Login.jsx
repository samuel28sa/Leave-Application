import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiPadlock } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../../../images/logo.png";
import "../Login/Login.css";
import image from "../../../images/leave-management.svg";
import httpClient from "../../../api/axios";
import { useUserProfile } from "../../../stores/userProfile";

const Login = () => {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);
  const userProfile = useUserProfile((state) => state.profile);
  const setUserProfile = useUserProfile((state) => state.setProfile);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBusy) return;
    setIsBusy(true);
    await httpClient
      .post(`/user/login`, {
        username: formData?.username,
        password: formData?.password,
      })
      .then((response) => {
        localStorage.setItem("token", response?.data?.token);
        navigate(`/admin`);
        console.log(response?.data?.token);
      })
      .catch((error) => {
        console.log(error);
        console.log(error?.response?.data?.message);
        setErr(error?.response?.data?.message);
      })
      .finally(() => {
        setIsBusy(false);
      });
  };

  const navigateIfLoggedIn = async () => {
    if (!userProfile) return;
    navigate("/admin");
  };

  useEffect(() => {
    navigateIfLoggedIn();
  }, [userProfile]);
  return (
    <div className="flex flex-row p-2 h-[700px] m-2 rounded-lg border border-black w-[1520px]">
      <div className="flex flex-column justify-centre w-[800px]">
        <img src={image} alt="" className="w-full h-full" />
      </div>
      <div className="flex flex-col w-96 p-8 items-center justify mt-8">
        {/* Login screen */}
        <img src={logo} alt="logo" className="w-24 h-24" />
        <div className="text-center font-bold text-xs py-4 text-[#f58634]">
          <h1>Login</h1>
        </div>

        <form className="w-3/4">
          <div className="email-field">
            <label htmlFor="">Username</label>
            <div className="relative">
              <MdOutlineEmail className="h-6 w-6 p-1 absolute  top-2.5 left-1 translate-y--1/2 " />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
                className="w-full p-3 pl-8  border-black shadow appearance-none border rounded-lg  text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                placeholder="Username"
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
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                className="w-full p-3 pl-8 border-black shadow appearance-none border rounded-lg  text-gray-700 leading-tight  focus:outline-none focus:shadow-outline"
                placeholder="Password"
                required
              />
            </div>
          </div>

          <a
            onClick={() => {
              navigate("/resetpassword");
            }}
          >
            <div className="float-right text-[#f58634] hover:underline font-medium">
              {" "}
              forgot password ?
            </div>
          </a>
          <br />
          <br />
          <br />

          <div>
            <div className="">
              <button
                onClick={handleSubmit}
                type="submit"
                disabled={isBusy}
                className="bg-[#f58634] text-white w-full p-2 rounded-2xl hover:bg-[#d97b3c] font-bold hover:border-none focus:outline-none disabled:opacity-50 disabled:cursor-wait"
              >
                Login
              </button>
            </div>
            <div className="text-red-600">{err}</div>

            <br />
            <br />
          </div>

          <div className="send">
            <div className="text-center">
              Don't have an account?
              <a
                href=""
                onClick={() => {
                  navigate("/signup");
                }}
              >
                <span className="text-[#f58634] pl-1 hover:underline">
                  signup
                </span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
