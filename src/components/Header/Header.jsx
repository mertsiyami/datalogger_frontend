import React, { useState, useEffect } from "react";
import "./Header.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Eğer token varsa true yap
  }, [window.location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
    navigate(0);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Menüyü kapatmak için
  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">Datalogger</Link>
      </h1>
      
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      
      <nav className={`nav ${menuOpen ? 'active' : ''}`}>
        <ul className="nav-links">
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={closeMenu}>
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard" onClick={closeMenu}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={closeMenu}>
                  Settings
                </Link>
              </li>
              <li>
                {/* Değişiklik: Link yerine button veya span kullanımı */}
                <span className="nav-link" onClick={() => { handleLogout(); closeMenu(); }}>
                  Logout
                </span>
              </li>
            </>
          )}
        </ul>
      </nav>
      
      {/* Değişiklik: Link içinde button yerine direkt Link */}
      <Link to="/contact" className="contact-button-desktop nav-button" onClick={closeMenu}>
        Contact
      </Link>
    </header>
  );
};

export default Header;