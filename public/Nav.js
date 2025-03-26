import Button from "./Button";
import React, { useEffect, useState } from "react";
const Nav = () => {
  const [btnName, setBtnName] = useState("Login");
  return (
    <div className="nav-items">
      <ul>
        <li>Home</li>
        <li>About us</li>
        <li>Contact Us</li>
        <li>Cart Old</li>
        <Button
          name={btnName}
          id={btnName.toLowerCase()}
          onClick={() => {
            setBtnName("Logout");
          }}
          clname={btnName.toLowerCase()}
        />
      </ul>
    </div>
  );
};

export default Nav;
