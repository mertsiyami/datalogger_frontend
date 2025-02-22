import React from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Eğer token varsa true yap
  }, []); // Bağımlılığı buraya isAuthenticated olarak değiştirin

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
    navigate(0);
  };

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">Datalogger</Link>
      </h1>
      <nav>
        <ul className="nav-links">
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <a>Register</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout}>
                  <a>Logout</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <Link to="/contact">
        <button className="nav-button">Contact</button>
      </Link>
    </header>
  );
};

export default Header;
