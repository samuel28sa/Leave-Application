import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineApartment,
  MdOutlineEmail,
  MdOutlinePermIdentity,
} from "react-icons/md";
import { GiPadlock } from "react-icons/gi";
import logo from "../../../images/logo.png";
import image from "../../../images/leave-management.svg";
import httpClient from "../../../api/axios";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    officeId: "",
    department: "",
  });
  const [isBusy, setIsBusy] = useState(false);
  const [err, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsBusy(true);
    try {
      await httpClient.post("/user", formData);
      setIsBusy(false);
      toast.success("User created successfully");
      navigate("/");
    } catch (error) {
      let message = error?.response?.data?.message;
      toast.error(message);
      setError(error?.response?.data?.message);
      setIsBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen lg:bg-gray-100">
      {/* <div className="items-center justify-center hidden lg:flex lg:w-1/2">
        <img src={image} alt="Leave Management" className="w-3/4 h-auto" />
      </div> */}

      <div className="w-full max-w-lg p-10 bg-white rounded-lg lg:shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full" />
        </div>

        <div className="mb-6 text-2xl font-bold text-center text-gray-700">
          <h1>Register </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-gray-600">Username</label>
            <div className="relative">
              <MdOutlinePermIdentity className="absolute w-6 h-6 text-gray-400 top-3 left-3" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                placeholder="Enter your username"
                required
                autoFocus
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block mb-2 text-gray-600">Email</label>
            <div className="relative">
              <MdOutlineEmail className="absolute w-6 h-6 text-gray-400 top-3 left-3" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="flex flex-col items-center w-full lg:gap-4 lg:flex-row">
            <div className="w-full mb-5 lg:w-1/2">
              <label className="block mb-2 text-gray-600">Office ID</label>
              <div className="relative">
                <MdOutlinePermIdentity className="absolute w-6 h-6 text-gray-400 top-3 left-3" />
                <input
                  type="text"
                  value={formData.officeId}
                  onChange={(e) =>
                    setFormData({ ...formData, officeId: e.target.value })
                  }
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                  placeholder="Enter your office id"
                  required
                />
              </div>
            </div>

            <div className="w-full mb-5 lg:w-1/2">
              <label className="block mb-2 text-gray-600">Department</label>
              <div className="relative">
                <MdOutlineApartment className="absolute w-6 h-6 text-gray-400 top-3 left-3" />
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                  placeholder="Enter your department"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="relative">
              <label className="block mb-2 text-gray-600">Password</label>
              <div className="relative">
                <GiPadlock className="absolute w-6 h-6 text-gray-400 top-3 left-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-1 top-1 right-0 pr-3 flex items-center`}
                >
                  {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <div className="relative">
              <label className="block mb-2 text-gray-600">
                Confirm Password
              </label>
              <div className="relative">
                <GiPadlock className="absolute w-6 h-6 text-gray-400 top-3 left-3" />
                <input
                  type={confirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-primary focus:ring-primary focus:ring-1"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setConfirmPassword(!confirmPassword)}
                  className={`absolute inset-y-1 top-1 right-0 pr-3 flex items-center`}
                >
                  {confirmPassword ? (
                    <FiEye size={20} />
                  ) : (
                    <FiEyeOff size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* {err && <div className="mb-4 text-center text-red-600">{err}</div>} */}

          <div className="py-6">
            <button
              type="submit"
              disabled={isBusy}
              className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary transition-colors font-bold focus:outline-none focus:ring-2 focus:ring-[#f58634] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-wait"
            >
              {isBusy ? <Spinner /> : "Signup"}
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Have an account?</span>
            <a
              onClick={() => navigate("/")}
              className="ml-2 cursor-pointer text-primary hover:underline"
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
