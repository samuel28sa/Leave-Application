import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import AppLayout from "./layout/AppLayout";
const Dashboard = lazy(() => import("./pages/protected/Dashboard/Dashboard"));
const RequestTimeOff = lazy(() =>
  import("./pages/protected/Dashboard/Component/LeaveRequest")
);
import Login from "./pages/public/Login/Login";
import Register from "./pages/public/Register/Register";
import { ProtectedRoute, PublicRoute } from "./components/Routes";
const History = lazy(() => import("./pages/protected/History/History"));
const AdminLeaveApprovalPage = lazy(() =>
  import("./pages/protected/Request/Request")
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="history" element={<History />} />
          <Route path="form" element={<RequestTimeOff />} />
          <Route path="request" element={<AdminLeaveApprovalPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
