import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { userService } from '../../api';
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [responseMessage, setResponseMessage] = useState({
    message: '',
    success: false
  })
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  })
  
  const validateForm = () => {
    const newErrors = {
      username: '',
      password: '',
    };
  
    if (!username) {
      newErrors.username = 'Username is required.';
    }
  
    if (!password) {
      newErrors.password = 'Password is required.';
    }
  
    setErrors(newErrors);
  
    // Return true if there are no errors
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    try{
      const response = await userService.login({username,password});
      const message = {
        message : response.message ?? 'Login successful',
        success : true
      }

      setResponseMessage(message)

      localStorage.setItem('authToken', response.token)

      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)

    }catch(error)
    {
      const message = {
        message : 'Login failed. Please try again.',
        success :false
      }
      if(axios.isAxiosError(error) && error.response?.data?.message)
      {
        setResponseMessage({...message, message: error.response.data.message ?? 'Login failed. Please try again.'});
      } else {
        setResponseMessage(message);
      }
    }

  }
  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        {responseMessage.message && <p className={responseMessage.success ? "responseSuccess" : "responseError"}>{responseMessage.message}</p>}
        <h2>Login</h2>
        
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          {errors.username && <p className="">{errors.username}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          {errors.password && <p className="">{errors.password}</p>}
        </div>

        <button type="button" onClick={handleLogin}>Login</button>
        <p className="redirect"> Don't have an account?{' '} <span onClick={() => navigate('/register')} className=""> Sign up here </span> </p>
      </form>

    </div>
  );
};

export default Login;
