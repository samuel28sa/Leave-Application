import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Dashboard from "./pages/protected/Dashboard/Dash";
import RequestTimeOff from "./pages/protected/Dashboard/Component/LeaveRequest";
import Login from "./pages/public/Login/Login";
import Register from "./pages/public/Register/Register";
import History from "./pages/protected/History/History";
import AdminLeaveApprovalPage from "./pages/protected/Dashboard/Component/Request";

const App = () => {
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/history" element={<History />} />
            <Route path="form" element={<RequestTimeOff />} />
            <Route path="request" element={<AdminLeaveApprovalPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
