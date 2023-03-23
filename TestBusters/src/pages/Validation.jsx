import './Validation.css';

import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';

function Validation() {
  const location = useLocation();
  const [confirmed, setConfirmed] = useState(false);
  const [code, setCode] = useState(0);
  const { login } = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => {
    if (code === location.state.confirmation) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
    }
  }, [code]);
  const credentials = {
    username: location.state.username,
    password: location.state.password,
  };
  const handleClick = () => {
    API.post('/users/login', credentials)
      .then((res) => {
        //res.confirmation === newUser.password? ?
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
    <div className="code_content">
      <h4>You have recieved a verification code on you email</h4>
      <h4>please write this code here ⬇</h4>
      <div className="code_container">
        <input
          className="input_content"
          type="text"
          onChange={(ev) => {
            setCode(parseInt(ev.target.value));
          }}
        />
      </div>
      <div className="btn_container">
        <button
          className="continue_btn"
          onClick={() => {
            handleClick();
          }}
          disabled={confirmed ? false : true}
        >
          {' '}
          Login{' '}
        </button>
      </div>
    </div>
  );
}
export default Validation;
