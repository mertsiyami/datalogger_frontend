import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";  // Header bileşenini import ettik

const Layout = () => {
  const location = useLocation();  // sayfa yolunu almak için

  // Header'ı sadece login ve register dışında göstermek için kontrol ediyoruz
  const showHeader = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <div>
      {showHeader && <Header />}  {/* Header'ı sadece login ve register dışında göster */}
      <Outlet />  {/* Burada alt bileşenler render edilir */}
    </div>
  );
};

export default Layout;
