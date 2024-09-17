import Applayout from "../layout/Applayout";
import Dashboard from "../pages/private/Dashboard";
import RequestTimeOff from "../pages/private/Dashboard/Component/LeaveRequest";
import History from "../pages/private/History";
import Login from "../pages/public/Login/Login";
import Resetpasswordrequest from "../pages/public/resetpassword/Resetpasswordrequest";
import Resetpassword from "../pages/public/resetpassword/Resetpassword";
import Signup from "../pages/public/Signup/Signup";

export const AppRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/resetpassword",
    element: <Resetpasswordrequest/>,
  },
  {
    path: "/reset",
    element: <Resetpassword/>,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: <Applayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "history",
        element: <History />,
      },
      {
        path: "form",
        element: <RequestTimeOff />,
      },
    ],
  },
];
