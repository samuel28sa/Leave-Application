import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import httpClient from "../../../api/axios";

const Resetpassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setErr("Pins do not match");
    }
    const url = new URLSearchParams(location.search);
    const token = url.get("token");
    await httpClient
      .post(`/user/resetpassword/${token}`, formData)
      .then((res) => {
        console.log(res.data.message);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto bg-white w-[1536px]">
      <div className=" rounded-lg p-12  bg-[#E1DBDB]">
        <div
          onClick={() => {
            navigate("/resetpassword");
          }}
          className="bg-[#E1DBDB] cursor-pointer"
        >
          <MdOutlineArrowBackIosNew className="border rounded-3xl bg-[#f58634] w-10 h-10 p-2" />
        </div>{" "}
        <br />
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
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              required
            />
          </div>
          <br />
          <div className="bg-[#E1DBDB] flex flex-col gap-1">
            <label className=" bg-[#E1DBDB]" htmlFor="">
              Confirm password
            </label>

            <input
              type="password"
              className={`border rounded-lg  w-full p-2 focus:outline-none ${
                err ? "border-red-500" : ""
              }`}
              placeholder="Confirm your new password"
              value={formData.confirmPassword}
              onChange={(e) => {
                setFormData({ ...formData, confirmPassword: e.target.value });
              }}
              required
            />

            {err ? <div className="text-red-500 text-sm">{err}</div> : ""}
          </div>

          <div className="text-center pt-8 bg-[#E1DBDB] pb-20 ">
            <button
              type="submit"
              className=" bg-[#f58634] p-2 w-full rounded-lg text-black border-none hover:bg-[#e4813f] focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
