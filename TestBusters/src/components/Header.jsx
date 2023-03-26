import './Header.css';

import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import Avatar from '../ui/Avatar';

const Header = () => {
  const navigate = useNavigate();
  const { logout, user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const showModalToggle = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="header">
      <header>
        <ul>
          <div className="header-pages">
            <li>
              <button onClick={() => navigate('/')} className="logo-button">
                <img
                  src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679412796/achievements%20icons/testbusters_logo1_cty2np.png"
                  alt="testbusters logo"
                />
              </button>
            </li>

            {user !== null && (
              <>
                <li>
                  <NavLink to="/"> Home </NavLink>
                </li>
                <li>
                  <NavLink to="/tests"> Tests </NavLink>
                </li>
                <li>
                  <NavLink to="/community"> Community </NavLink>
                </li>
              </>
            )}
          </div>

          {user == null ? (
            <div className="user-login">
              <li>
                <button onClick={() => navigate('/register')} className="register-button">
                  Register
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/login')} className="login-button">
                  Sign in
                </button>
              </li>
            </div>
          ) : (
            <div className="user-header">
              <li>
                <button onClick={() => navigate('/create')} className="create-button">
                  Create
                </button>
              </li>
              <li>
                <button onClick={() => showModalToggle()} className="avatar-button">
                  <Avatar src={user.avatar} alt="user avatar" width="m" height="m" />
                </button>
              </li>
              <li>Level {user.level[0]}</li>
            </div>
          )}
        </ul>
      </header>
      {showModal && (
        <div className="user-modal">
          <NavLink
            to={`profile/statistics/${user._id}`}
            onClick={() => {
              showModalToggle();
              localStorage.setItem('communityUser', JSON.stringify(user));
              window.reload();
            }}
          >
            Profile
          </NavLink>
          <button
            onClick={() => {
              logout();
              showModalToggle();
            }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
