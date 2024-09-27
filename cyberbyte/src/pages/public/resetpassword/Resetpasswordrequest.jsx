import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import httpClient from "../../../api/axios";

const Resetpasswordrequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email:"",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await httpClient
      .post("/user/resetpassword", formData)
      .then((res) =>{
        console.log("Data received", res.data);
        console.log("reset link sent to your email");
        navigate("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-auto bg-white w-[1536px]">
      <div className=" rounded-lg p-20  bg-[#E1DBDB]">
        <div
          onClick={() => {
            navigate("/Login");
          }}
          className="bg-[#E1DBDB] cursor-pointer"
        >
          <MdOutlineArrowBackIosNew className="border rounded-3xl bg-[#f58634] w-10 h-10 p-2" />
        </div>{" "}
        <br />
        <div className="text-2xl font-bold pb-8 float-left font-[inter] bg-[#E1DBDB]">
          <p className="bg-[#E1DBDB]">Forgot password?</p>
        </div>
        <div className="pb-20 font-[inter] bg-[#E1DBDB]">
          <p className="float-left bg-[#E1DBDB]  text-[#989899] ">
            please enter your email to reset the password
          </p>
        </div>
        <form>
          <div className="bg-[#E1DBDB] ">
            <label className="font-[inter] bg-[#E1DBDB]" htmlFor="">
              Your Email
            </label>

            <input
              type="email"
              className="border rounded-lg  w-full p-2 focus:outline-none"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => 
                setFormData({ ...formData, email: e.target.value})
              }
            />
          </div>
        </form>
        <div
          className="text-center pt-8 bg-[#E1DBDB] pb-20 "
        >
          <button 
          className=" bg-[#f58634] p-2 w-full rounded-lg text-black border-none hover:bg-[#e4813f] focus:outline-none"
          onClick={handleSubmit}
          >
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resetpasswordrequest;
