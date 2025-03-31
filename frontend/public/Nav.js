import React, { useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
const Nav = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="nav-items">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>About us</li>
        <li>Contact Us</li>
        <li>Cart Old</li>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Nav;
