import React, { useState } from "react";
import "./Register.scss";
import {useNavigate} from 'react-router-dom'
import { userService } from "../../api";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors = {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    };

    if (!username) {
      newErrors.username = 'Username is required.';
    }

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is not valid.';
    }

    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    // Return true if no errors exist
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    const requestData = {
      username,
      password,
      phoneNumber,
      email,
      devices:[]
    };

    try {
      const response = await userService.register(requestData);
      setResponseMessage(response.message);

      setTimeout(() => {
        navigate('/login')
      }, 1000)

    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        setResponseMessage(error.response.data.message ?? 'Registration failed. Please try again.');
      } else {
        setResponseMessage('Registration failed. Please try again.');
      }
    }
  };


  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Create an Account</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {responseMessage && <p className={responseMessage.success ? "responseSuccess" : "responseError"}>{responseMessage}</p>}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username" // Placeholder eklendi
              required
            />
          {errors.username && <p className="error">{errors.password}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" // Placeholder eklendi
              required
            />
          {errors.email && <p className="error">{errors.email}</p>}  
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" // Placeholder eklendi
              required
            />
          {errors.password && <p className="error">{errors.password}</p>}  
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password" // Placeholder eklendi
              required
            />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}  
          </div>
          <div className="input-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number" // Placeholder eklendi
              required
            />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}  
          </div>
          <button type="button" onClick={handleRegister}>Sign Up</button>
          <p className="redirect">Already have an account?{' '} <span onClick={() => navigate('/login')} className="login-link"> Log in here </span> </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
