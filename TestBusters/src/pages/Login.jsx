import './Login.css';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';

const Login = () => {
  const [onFocus, setOnFocus] = useState(false);
  const [see, setSee] = useState(false);
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
        console.log(error);
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
            />
            <label htmlFor="custom-input" className="custom-placeholder">
              password
            </label>
          </div>
          <div className="btn_container">
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
            <button className="login_btn" type="submit">
              Login
            </button>
          </div>
          <div className="register_container">
            <h4>Dont have an account yet?</h4>
            <NavLink to="/register" className="register_nav">
              {' '}
              Register Here!{' '}
            </NavLink>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Login;
