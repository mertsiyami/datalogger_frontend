import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} My Website. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
