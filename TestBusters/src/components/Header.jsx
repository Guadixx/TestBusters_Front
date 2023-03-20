import './Header.css';

import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav>
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/login"> Login </NavLink>
        <NavLink to="/community"> Community </NavLink>
        <NavLink to="/profile"> Profile </NavLink>
        <NavLink to="/tests"> Tests </NavLink>
      </nav>
    </div>
  );
};

export default Header;
