import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Nav = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="nav-items">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li>About us</li>
        <li>Contact Us</li>
        <li>Cart Old</li>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
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
