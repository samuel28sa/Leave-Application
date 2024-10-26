import { createContext, useContext, useState } from "react";
import httpClient from "../api/axios";

const GlobalContext = createContext();

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

export const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });
  const [isBusy, setIsBusy] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.replace("/");
  };

  const handleLogin = async (credentials) => {
    setIsBusy(true);
    try {
      const { data } = await httpClient.post("/user/login", credentials);
      await localStorage.setItem("token", data?.token);
      setIsAuthenticated(true);
      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsBusy(false);
    }
  };

  const value = {
    isAuthenticated,
    isBusy,
    handleLogin,
    logout,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
