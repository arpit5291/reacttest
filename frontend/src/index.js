import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "../public/style.css";
import Header from "../public/Header";
import Body from "../public/Body";
import store from "../public/AuthContext";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "../public/Login";
import Signup from "../public/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AuthProvider from "../public/AuthContext";
const MainApp = () => {
  return (<div className="app">
    <Header.Header />
    <Body />
  </div>
  );
};


const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};
const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider store={store}>
    <App />
  </AuthProvider>
);