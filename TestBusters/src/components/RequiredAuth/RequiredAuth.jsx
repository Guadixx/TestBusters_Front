import { Navigate, useLocation } from 'react-router-dom';

import useLocalStorage from '../../customHooks/useLocalStorage';

const RequiredAuth = ({ children }) => {
  let location = useLocation();

  if (!useLocalStorage('get', 'token')) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequiredAuth;
