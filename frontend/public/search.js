import React, { useState } from "react";
import Button from "./Button";

const Search = (props) => {
  return (
    <div className="search">
      <input
        type="text"
        className={props.class !== undefined ? props.class : "search-box"}
        placeholder={props.placeholder !== undefined ? props.placeholder : "Search a restaurant you want..."}
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
      />
    </div>
  );
};
export default Search;
