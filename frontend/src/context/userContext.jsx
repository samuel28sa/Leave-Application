import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { BASE_URL } from "../api/axios";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [log, setLog] = useState(false);

  const config = async () => {
    setLoading(true);
    const token = await localStorage.getItem("token");

    await axios
      .get(`${BASE_URL}/user/profile`, {
        headers: {
          Authorization: token,
        },
      })
      .then((data) => {
        setLoading(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (log) {
      config();
    }
  }, [log]);

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        loading,
        setLog,
        config
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};