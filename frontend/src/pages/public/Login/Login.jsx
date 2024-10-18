import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiPadlock } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import logo from "../../../assets/download.jpeg";
import image from "../../../images/leave-management.svg";
import httpClient from "../../../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [isBusy, setIsBusy] = useState(false);
  const userProfile = false; // For demo purposes
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
      })
      .catch((error) => {
        const message = error?.response?.data?.message === "User not found" ? "Invalid Credetials" : error?.response?.data?.message
        setErr(message);
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
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <img src={image} alt="Leave Management" className="w-3/4 h-auto" />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-10 lg:w-1/3 w-4/5 mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-20 h-20 rounded-full" />
        </div>

        <div className="text-center text-2xl font-bold text-gray-700 mb-6">
          <h1>Login</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-gray-600 mb-2">Username</label>
            <div className="relative">
              <MdOutlineEmail className="absolute top-3 left-3 h-6 w-6 text-gray-400" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f58634] focus:ring-[#f58634] focus:ring-1"
                placeholder="Enter your username"
                required
              />
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
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#f58634] focus:ring-[#f58634] focus:ring-1"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {err && <div className="text-red-600 text-sm text-center">{err}</div>}

          <div className="text-right mb-6">
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
              {isBusy ? "Logging in..." : "Login"}
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
