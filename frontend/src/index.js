import React from "react";
import { createRoot } from "react-dom/client";
import "../public/style.css";
import Header from "../public/Header";
import Body from "../public/Body";
import { Provider } from "react-redux";
import store from "../public/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../public/Login";
import Signup from "../public/Signup";

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
  <Provider store={store}>
    <App />
  </Provider>
);