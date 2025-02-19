import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h2 className="notfound-title">404</h2>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className="back-link">Go back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
