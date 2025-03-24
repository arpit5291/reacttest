import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
const Str = () => (
  <div className="header">
    <ul className="child">
      <li id="lodestone">
        <img
          src="https://dunkin.co.uk/media/logo/default/logo_dunkin-donuts.svg"
          className="search-icon"
        />
      </li>
      <li id="mogstation">
        <div className="search">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </li>
      <li id="user">
        <div className="header-right right">
          <FaRegUser className="user-icon" />
        </div>
      </li>
    </ul>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Str />);
