/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './HomeMenu.css';

import { NavLink, useNavigate } from 'react-router-dom';

import Avatar from '../../ui/Avatar';

const HomeMenu = ({ user, setShowMenu, logout }) => {
  const navigate = useNavigate();
  return (
    <div className="home-menu-modal">
      <button onClick={() => setShowMenu(false)} className="close-menu-button">
        X
      </button>

      <nav>
        <ul>
          <div className="menu-pages">
            <div
              className="menu-user-header"
              onClick={() => {
                navigate(`/profile/statistics/${user._id}`);
                setShowMenu(false);
              }}
            >
              <li>
                <button className="menu-avatar-button">
                  <Avatar src={user.avatar} alt="user avatar" width="m" height="m" />
                </button>
              </li>
              <li>{user.username}</li>
            </div>
            <span></span>
            <li>
              <NavLink to="/" onClick={() => setShowMenu(false)}>
                Home
              </NavLink>
            </li>
            <span></span>
            <li>
              <NavLink to="/tests" onClick={() => setShowMenu(false)}>
                Tests
              </NavLink>
            </li>
            <span></span>
            <li>
              <NavLink to="/community" onClick={() => setShowMenu(false)}>
                Community
              </NavLink>
            </li>
          </div>
          <div className="home-menu-logout">
            <span></span>
            <li>
              <button
                onClick={() => {
                  logout();
                  setShowMenu(false);
                }}
              >
                Sign Out
              </button>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default HomeMenu;
