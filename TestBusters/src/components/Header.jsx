import './Header.css';

import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../context/UserContext';

const Header = () => {
  const { logout } = useContext(UserContext);
  return (
    <div>
      <nav>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/login"> Login </NavLink>
        <NavLink to="/community"> Community </NavLink>
        <NavLink to="/profile"> Profile </NavLink>
        <NavLink to="/tests"> Tests </NavLink>
        <button onClick={() => logout()}>logout</button>
      </nav>
    </div>
  );
};

export default Header;
