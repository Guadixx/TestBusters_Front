import './Register.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API } from '../services/API';

const Register = () => {
  const navigate = useNavigate();
  const [onFocus, setOnFocus] = useState(false);
  const [see, setSee] = useState(false);
  const handleClickTwo = (ev) => {
    ev.preventDefault();
    setSee(!see);
  };
  const [newUser, setNewUser] = useState({
    email: ' ',
    username: ' ',
    password: ' ',
    confirmPassword: ' ',
  });
  const handleClick = () => {
    if (newUser.password != newUser.confirmPassword) {
      console.log('Las contraseñas no coinciden');
    } else {
      const formData = new FormData();
      formData.append('email', newUser.email);
      formData.append('username', newUser.username);
      formData.append('password', newUser.password);
      API.post('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((res) => {
          if (res.status === 201) {
            console.log('creado');
            const paramsUser = {
              username: newUser.username,
              password: newUser.password,
              confirmation: res.data.confirmation,
            };
            navigate('/register/validate', { state: paramsUser });
          } else {
            console.log('no creado');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="register_container">
      <h2>Register Here ⬇</h2>
      <div className="password_container">
        <input
          className="input_content"
          type="text"
          placeholder={onFocus ? ' ' : 'email'}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={(ev) => setNewUser({ ...newUser, email: ev.target.value })}
        />
        <label htmlFor="custom-input" className="custom-placeholder">
          email
        </label>
      </div>
      <div className="password_container">
        <input
          className="input_content"
          type="text"
          placeholder={onFocus ? ' ' : 'username'}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={(ev) => setNewUser({ ...newUser, username: ev.target.value })}
        />
        <label htmlFor="custom-input" className="custom-placeholder">
          username
        </label>
      </div>
      <div className="password_container">
        <input
          className="input_content"
          type={see ? 'text' : 'password'}
          placeholder={onFocus ? ' ' : 'password'}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={(ev) => setNewUser({ ...newUser, password: ev.target.value })}
        />
        <label htmlFor="custom-input" className="custom-placeholder">
          password
        </label>
        <button className="see_btn" onClick={(ev) => handleClickTwo(ev)}>
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
      <div className="password_container">
        <input
          className="input_content"
          type={see ? 'text' : 'password'}
          placeholder={onFocus ? ' ' : 'confirm password'}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={(ev) => setNewUser({ ...newUser, confirmPassword: ev.target.value })}
        />
        <label htmlFor="custom-input" className="custom-placeholder">
          confirm password
        </label>
        <button className="see_btn" onClick={(ev) => handleClickTwo(ev)}>
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
      <div className="continue_container">
        {console.log(newUser.username.length)}
        <button
          disabled={
            newUser.username.length > 1 &&
            newUser.email.length > 1 &&
            newUser.password.length > 1 &&
            newUser.confirmPassword.length > 1 &&
            newUser.password == newUser.confirmPassword
              ? false
              : true
          }
          className="continue_btn"
          onClick={() => {
            handleClick();
            console.log('continue');
          }}
        >
          continue
        </button>
      </div>
    </div>
  );
};

export default Register;
