import React, { useState } from "react";
import Button from "./Button";

const Search = (props) => {
  return (
    <div className="search">
      <input
        type="text"
        className="search-box"
         placeholder="Search a restaurant you want..."
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
      />
      <Button
        name="Search"
        id="search"
        onClick={() => {
          const filterItems = [...props.list].filter(
            (res) => res.info.name.toLowerCase().includes(props.searchText.toLowerCase())
          );
          props.setList(filterItems);
        }}
        clname="search"
      />
    </div>
  );
};
export default Search;
