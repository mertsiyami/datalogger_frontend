import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userService } from "../../api";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    success: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Yüklenme durumunu ekledik

  const validateForm = () => {
    const newErrors = { username: "", password: "" };

    if (!username.trim()) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true); // Buton kilitleme
    try {
      const response = await userService.login({ username, password });
      setResponseMessage({ message: response.message ?? "Login successful", success: true });

      localStorage.setItem("authToken", response.token);
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error) {
      let errorMsg = "Login failed. Please try again.";
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        errorMsg = error.response.data.message;
      }
      setResponseMessage({ message: errorMsg, success: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>


        <h2>Login</h2>

        {responseMessage.message && (
          <p className={responseMessage.success ? "response-success" : "response-error"}>
            {responseMessage.message}
          </p>
        )}

        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="button" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="redirect">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} className="register-link">
            Sign up here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
