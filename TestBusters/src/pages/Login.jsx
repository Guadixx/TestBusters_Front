import './Login.css';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';
import { API } from '../services/API';

const Login = () => {
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
    <main>
      <h2>Login</h2>
      {error !== null && <h2>{error}</h2>}
      <form onSubmit={handleSubmit(formSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="username"
          id="username"
          name="username"
          {...register('username')}
        />
        <label htmlFor="password">Password</label>
        <input
          type={see ? 'text' : 'password'}
          placeholder="password"
          id="password"
          name="password"
          {...register('password')}
        />
        <button onClick={(ev) => handleClick(ev)}>see</button>
        <button type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;
