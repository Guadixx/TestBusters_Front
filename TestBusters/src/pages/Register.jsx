import './Register.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API } from '../services/API';
import { checkEmail, checkPassword, checkUser } from '../services/checkForm';
import { Heading_6 } from '../ui/Headings';

const Register = () => {
  const [userValid, setUserValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [matchUser, setMatchUser] = useState(false);
  const password = {
    spaces: 0,
    lowerCase: 1,
    upperCase: 1,
    number: 1,
    symbol: 1,
  };
  const user = {
    spaces: 0,
    lowerCase: -1,
    upperCase: -1,
    number: -1,
    symbol: 0,
    forbidden: ['pene', 'caca', 'pussy', 'penis', 'verga', 'puta'],
  };
  const navigate = useNavigate();
  const [onFocus, setOnFocus] = useState(false);
  const [check, setChecked] = useState(false);
  const handleChecked = () => {
    setChecked(!check);
  };
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
    if (
      newUser.password == newUser.confirmPassword &&
      userValid &&
      emailValid &&
      passwordValid
    ) {
      const formData = new FormData();
      formData.append('email', newUser.email);
      formData.append('username', newUser.username);
      formData.append('password', newUser.password);

      API.post('/users', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((res) => {
          if (res.status === 201) {
            const paramsUser = {
              username: newUser.username,
              password: newUser.password,
              confirmation: res.data.confirmation,
              id: res.data.user._id,
            };
            navigate('/register/validate', { state: paramsUser });
          } else {
            console.log('no creado');
          }
        })
        .catch((error) => {
          setMatchUser(true);
          console.log(error);
        });
    } else {
      return;
    }
  };
  return (
    <div className="register_container">
      <h2>Register Here ⬇</h2>
      <div className="password_container">
        <input
          className="input_content"
          type="text"
          placeholder={onFocus ? ' ' : ''}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={(ev) => {
            if (checkEmail(ev.target.value)) {
              setEmailValid(true);
            } else {
              setEmailValid(false);
            }
            setNewUser({ ...newUser, email: ev.target.value });
          }}
        />
        <label htmlFor="custom-input" className="custom-placeholder">
          email
        </label>
      </div>
      <div className="password_container">
        <input
          className="input_content"
          type="text"
          placeholder={onFocus ? ' ' : ''}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={(ev) => {
            if (checkUser(ev.target.value, user)[0]) {
              setUserValid(true);
            } else {
              setUserValid(false);
            }
            setNewUser({ ...newUser, username: ev.target.value });
          }}
        />
        <label htmlFor="custom-input" className="custom-placeholder">
          username
        </label>
      </div>
      <div className="password_container">
        <input
          className="input_content"
          type={see ? 'text' : 'password'}
          placeholder={onFocus ? ' ' : ''}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
          onChange={(ev) => {
            if (checkPassword(ev.target.value, password) && ev.target.value.length >= 8) {
              setPasswordValid(true);
            } else {
              setPasswordValid(false);
            }
            setNewUser({ ...newUser, password: ev.target.value });
          }}
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
          placeholder={onFocus ? ' ' : ''}
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
      <div className="agreement_container">
        <input
          id="checkbox_input"
          type="checkbox"
          name="check"
          onChange={handleChecked}
        />
        <label>
          {' '}
          I accept the declaration of consent for data protection/terms and conditions.
        </label>
      </div>
      <div className="continue_container">
        <button
          disabled={
            newUser.username.length > 1 &&
            newUser.email.length > 1 &&
            newUser.password.length > 1 &&
            newUser.confirmPassword.length > 1 &&
            newUser.password == newUser.confirmPassword &&
            check
              ? false
              : true
          }
          className="continue_btn"
          onClick={() => {
            setSubmit(true);
            handleClick();
          }}
        >
          continue
        </button>
      </div>
      <div className="error_container">
        <Heading_6
          text={submit && !emailValid ? 'Email is not valid' : ''}
          color="red"
          size="16px"
        />
        <Heading_6
          text={submit && !userValid ? 'This user is not valid' : ''}
          color="red"
          size="16px"
        />
        <Heading_6
          text={
            submit && !passwordValid
              ? 'password needs special character, mins, mayusc, a number and at least 8 characters'
              : ''
          }
          color="red"
          size="16px"
        />
        <Heading_6
          text={
            submit && newUser.password != newUser.confirmPassword
              ? 'Passwords do not match'
              : ''
          }
          color="red"
          size="16px"
        />
        <Heading_6
          text={submit && matchUser ? 'This user/email is already used' : ''}
          color="red"
          size="16px"
        />
      </div>
    </div>
  );
};

export default Register;
