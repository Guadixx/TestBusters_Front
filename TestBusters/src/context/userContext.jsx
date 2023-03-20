import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useLocalStorage from '../customHooks/useLocalStorage';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  let navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = useLocalStorage('get', 'user');
    const initialValue = JSON.parse(savedUser);
    return initialValue || null;
  });

  const [jwt, setJwt] = useState(() => {
    const savedJwt = useLocalStorage('get', 'token');
    return savedJwt || null;
  });

  //const [editingMovie, setEditingMovie] = useState({});

  const logout = () => {
    setUser(null);
    setJwt(null);
    useLocalStorage('remove', 'user');
    useLocalStorage('remove', 'token');
    navigate('/login');
  };

  const login = (resUser, resToken) => {
    setUser(resUser);
    setJwt(resToken);
    useLocalStorage('set', 'user', JSON.stringify(resUser));
    useLocalStorage('set', 'token', resToken);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        jwt,
        logout,
        login,
        setUser,
        setJwt,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
