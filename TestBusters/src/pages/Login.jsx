import './Login.css';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';
import { Heading_6 } from '../ui/Headings';

const Login = () => {
  const [onFocus, setOnFocus] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [see, setSee] = useState(false);
  const [forgot, setForgot] = useState(false);
  const handleClick = (ev) => {
    ev.preventDefault();
    setSee(!see);
  };
  const { register, handleSubmit } = useForm();
  let navigate = useNavigate();
  const { login } = useContext(UserContext);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
  }, []);
  const formSubmit = (formData) => {
    API.post('/users/login', formData)
      .then((res) => {
        if (res.status === 200) {
          login(res.data.userInDB, res.data.token);
          navigate('/');
        }
      })
      .catch((error) => {
        if (error.response.status === 418 && error.response.data == 'User not found') {
          setUserNotFound(true);
        } else if (
          error.response.status == 418 &&
          error.response.data == 'wrong password'
        ) {
          setWrongPassword(true);
        }
      });
  };
  const forgotPassword = () => {
    API.patch('/users/forgotpassword', { email: email })
      .then((res) => {
        if (res.status == 200) {
          setEmailSent(true);
        } else {
          setUserNotFound(true);
        }
      })
      .catch(() => {
        setUserNotFound(true);
      });
  };
  return (
    <div className="login_container">
      <main>
        <div className="content">
          <h2>Get Started</h2>
          {error !== null && <h2>{error}</h2>}
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="user_container">
            <input
              className="input_user"
              type="text"
              placeholder={onFocus ? ' ' : 'username'}
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              id="username"
              name="username"
              {...register('username')}
              onChange={() => setUserNotFound(false)}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              username
            </label>
          </div>
          <div className="password_container">
            <input
              className="input_user"
              type={see ? 'text' : 'password'}
              placeholder={onFocus ? ' ' : 'username'}
              onFocus={() => setOnFocus(true)}
              onBlur={() => setOnFocus(false)}
              id="password"
              name="password"
              {...register('password')}
              onChange={() => setWrongPassword(false)}
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              password
            </label>
            <button className="see_btn" onClick={(ev) => handleClick(ev)}>
              {see ? (
                <img
                  src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679514213/invisible_ljwcqc.png"
                  alt="ojo cerrado"
                />
              ) : (
                <img
                  src="https://res.cloudinary.com/dva9zee9r/image/upload/v1679514203/visibilidad_c7kgso.png"
                  alt="ojo"
                />
              )}
            </button>
          </div>
          <div className="btn_container">
            <button className="login_btn" type="submit">
              Login
            </button>
          </div>
          <div className="error_container">
            <Heading_6
              text={
                userNotFound
                  ? 'User not found'
                  : wrongPassword
                  ? 'Wrong Password'
                  : emailSent
                  ? 'Check your email. We have sent you a new password'
                  : ''
              }
              color="red"
              size="16px"
            />
          </div>
          <div className="register_container">
            <h4>Dont have an account yet?</h4>
            <NavLink to="/register" className="register_nav">
              {' '}
              Register Here!{' '}
            </NavLink>
          </div>
        </form>
        <div className="register_container">
          {!forgot ? (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <h4
              className="register_nav forgot-h4"
              onClick={() => {
                setForgot(true);
              }}
            >
              Forgot your password?
            </h4>
          ) : (
            <div className="div-send-email-forgot">
              <input
                className="input_user rescale-input-user"
                type="text"
                placeholder="Enter your email..."
                onChange={(ev) => {
                  setEmail(ev.target.value);
                }}
              />
              <button
                className="login_btn rescale-login-button"
                onClick={() => {
                  forgotPassword();
                }}
              >
                Send new password
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
