import { createContext, useState, useEffect, useContext } from "react";
import useProfile from "../hooks/useProfile";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, error, loading } = useProfile();
  const [contextValue, setContextValue] = useState(null);

  useEffect(() => {
    if (user) {
      setContextValue(user);
    }
  }, [user]);

  // if (error) return <div>Error: {error.message}</div>;

  return (
    <UserContext.Provider value={{ contextValue, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useProfile must be used within a context provider");
  }
  return context;
};

export default UserContext;
