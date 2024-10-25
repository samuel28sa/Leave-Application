import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiPadlock } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../../../assets/download.jpeg";
import image from "../../../images/leave-management.svg";
import httpClient from "../../../api/axios";
import Spinner from "../../../components/Spinner";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useProfile from "../../../hooks/useProfile";
import { useGlobalContext } from "../../../context/userContext";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, isBusy, isAuthenticated } = useGlobalContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBusy) return;

    try {
      const data = await handleLogin({
        email: formData.username,
        password: formData.password,
      });

      window.location.replace("/admin");
      toast.success("Login Successful");
    } catch (error) {
      const message =
        error?.response?.data?.message === "User not found"
          ? "Invalid Credentials"
          : error?.response?.data?.message;
      setErr(message);
      toast.error(message);
    }
  };

  useEffect(() => {
    // Only redirect to admin if authenticated
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen lg:bg-gray-100">
      {/* <div className="items-center justify-center hidden lg:flex lg:w-1/2">
        <img src={image} alt="Leave Management" className="w-fullh-auto" />
      </div> */}

      <div className="w-full max-w-lg p-10 bg-white rounded-lg lg:shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full" />
        </div>

        <div className="mb-6 text-2xl font-bold text-center text-gray-700">
          <h1>Login</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-gray-600">Email</label>
            <div className="relative">
              <MdOutlineEmail className="absolute w-6 h-6 text-gray-400 top-3 left-3" />
              <input
                type="email"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={`w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f58634] focus:ring-[#f58634] focus:ring-1 ${
                  err ? "border-red-500" : ""
                } `}
                placeholder="Enter your email"
                required
                autoFocus
              />
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
                  className={`w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f58634] focus:ring-[#f58634] focus:ring-1 ${
                    err ? "border-red-500" : ""
                  } `}
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

          {/* {err && <div className="text-sm text-center text-red-600">{err}</div>} */}

          <div className="mb-6 text-right">
            <a
              onClick={() => navigate("/resetpassword")}
              className="text-[#f58634] hover:underline cursor-pointer"
            >
              Forgot password?
            </a>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              disabled={isBusy}
              className="w-full p-3 bg-[#f58634] text-white rounded-lg hover:bg-[#d97b3c] transition-colors font-bold focus:outline-none focus:ring-2 focus:ring-[#f58634] focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-wait"
            >
              {isBusy ? <Spinner /> : "Login"}
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Don&apos;t have an account?</span>
            <a
              onClick={() => navigate("/register")}
              className="text-[#f58634] hover:underline cursor-pointer ml-2"
            >
              Signup
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
