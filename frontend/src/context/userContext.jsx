import { createContext, useState, useEffect } from 'react';
import useProfile from '../hooks/useProfile';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const {user} = useProfile()

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
