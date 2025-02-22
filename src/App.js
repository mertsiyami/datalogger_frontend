import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound"; // NotFound componenti eklendi
import Dashboard from "./components/Dashboard/Dashboard";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Contact from "./components/Contact/Contact";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        {/* PublicRoute: Kullanıcı giriş yaptıysa Login ve Register’a giremez */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* PrivateRoute: Kullanıcı giriş yapmadıysa Dashboard’a giremez */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} /> {/* 404 Sayfası */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
