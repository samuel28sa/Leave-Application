import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes/Routes";
import { createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { useUserProfile } from "./stores/userProfile";
import httpClient from "./api/axios";

function App() {
  const route = createBrowserRouter(AppRoutes);
  const { setProfile } = useUserProfile((state) => state);
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token?.length) return;
    try {
      const { data } = await httpClient.get("/user/profile");
      setProfile(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
