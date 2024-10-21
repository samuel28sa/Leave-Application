import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineApartment, MdOutlineEmail, MdOutlinePermIdentity } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import logo from "../../../images/logo.png";
import image from "../../../images/leave-management.svg";
import httpClient from "../../../api/axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    officeId: "",
    department: ""
  });
  const [isBusy, setIsBusy] = useState(false)
  const [err, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsBusy(true)
    try {
      await httpClient.post("/user", formData);
      setIsBusy(false)
      navigate("/"); 
    } catch (error) {
      setError(error?.response?.data?.message);
      setIsBusy(false)
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <img src={image} alt="Leave Management" className="w-3/4 h-auto" />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-10 lg:w-1/3 w-4/5 mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full" />
        </div>

        <div className="text-center text-2xl font-bold text-gray-700 mb-6">
          <h1>Register </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-600 mb-2">Username</label>
            <div className="relative">
              <MdOutlineEmail className="absolute top-3 left-3 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-gray-600 mb-2">Email</label>
            <div className="relative">
              <MdOutlineEmail className="absolute top-3 left-3 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <div className="mb-5">
                <label className="block text-gray-600 mb-2">Office ID</label>
                <div className="relative">
                <MdOutlinePermIdentity className="absolute top-3 left-3 h-6 w-6 text-gray-400" />
                <input
                    type="text"
                    value={formData.officeId}
                    onChange={(e) => setFormData({ ...formData, officeId: e.target.value })}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                    placeholder="Enter your office id"
                    required
                />
                </div>
            </div>

            <div className="mb-5">
                <label className="block text-gray-600 mb-2">Department</label>
                <div className="relative">
                <MdOutlineApartment className="absolute top-3 left-3 h-6 w-6 text-gray-400" />
                <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                    placeholder="Enter your department"
                    required
                />
                </div>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-gray-600 mb-2">Password</label>
            <div className="relative">
              <GiPadlock className="absolute top-3 left-3 h-6 w-6 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="block text-gray-600 mb-2">Confirm Password</label>
            <div className="relative">
              <GiPadlock className="absolute top-3 left-3 h-6 w-6 text-gray-400" />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {err && <div className="text-red-600 mb-4 text-center">{err}</div>}

          

          <div className="mb-6">
            <button
              type="submit"
              disabled={isBusy}
              className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary transition-colors font-bold focus:outline-none focus:ring-2 focus:ring-[#f58634] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-wait"
            >
              {isBusy ? "Loading..." : "Signup"}
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Have an account?</span>
            <a
              onClick={() => navigate("/")}
              className="text-primary hover:underline cursor-pointer ml-2"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
