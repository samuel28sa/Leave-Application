import Applayout from "../layout/Applayout";
import Dashboard from "../page/private/Dashboard";
import RequestTimeOff from "../page/private/Dashboard/Component/LeaveRequest";
import History from "../page/private/History";

export const AppRoutes = [
  {
    path: "/",
    // element: <Login />,
  },
  {
    path: "/signup",
    // element: <Signup />,
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
