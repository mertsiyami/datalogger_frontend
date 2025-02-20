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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">Datalogger</Link>
      </h1>
      <nav>
        <ul className="nav-links">
          { !isAuthenticated ? (
          <>
          <li>
            <Link to="/login">
              <button className="nav-button">Login</button>
            </Link>
          </li>
          <li>
            <Link to="/Register">
              <button className="nav-button">Register</button>
            </Link>
          </li>
          </>
          ):
          (
          <>
          <li>
            <Link to="/dashboard">
              <button className="nav-button-dashboard">Dashboard</button>
            </Link>
          </li>
          <li>
            <Link onClick={handleLogout}>
              <button className="nav-button-logout">Logout</button>
            </Link>
          </li>
          </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
