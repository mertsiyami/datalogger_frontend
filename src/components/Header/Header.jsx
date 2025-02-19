import React from "react";
import { Link } from "react-router-dom"; // Link'i import et
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">Datalogger</Link>
      </h1>
      <nav>
        <ul className="nav-links">
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
