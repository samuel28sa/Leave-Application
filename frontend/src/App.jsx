import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import Dashboard from './pages/protected/Dashboard/Dash';
import RequestTimeOff from './pages/protected/Dashboard/Component/LeaveRequest';
import Login from './pages/public/Login/Login';
import Register from './pages/public/Register/Register';
import { UserProvider } from './context/userContext';

const Settings = () => <div>Settings Content</div>;

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="form" element={<RequestTimeOff />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
