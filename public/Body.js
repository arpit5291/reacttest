import Button from "./Button";
import React, { useEffect, useState } from "react";
import RestaurantCard from "./Res";
import Filter from "./Filter";
import Shimmer from "./loader";
import Search from "./search";
import * as Urls from "./Url";
const Body = () => {
  const _ = require("lodash");
  const condi = {
    greterfour: (res) => res.avgRating > 4.3,
  };
  const Finalc = [condi.greterfour];
  
  const [spinner, setSpinner] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetchSwiggyData();
  }, []);
  const [resetList, setResetList] = useState([]);
  const [state, setState] = useState({
    selected: "asc",
  });

  const fetchSwiggyData = async () => {
    setSpinner(true);
    const data = await fetch(Urls.SWG_API);
    const dataJson = await data.json();
    
    setSpinner(false);
    //updateSwiggy();

  
    const newObj = dataJson.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
      const nsortedList = _.orderBy(newObj, ["info.avgRating"], [state.selected]);
      setList(nsortedList);
      setResetList(nsortedList);
  };
  const updateSwiggy = async () => {
    setSpinner(true);
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/update",
      {
        body: '{"lat":19.0759837,"lng":72.8776559,"_csrf":"cDbJO5z69sSD-MEIEoWEeOUwAOfuSL9XMEN4BBOI"}',
        method: "POST",
      }
    );
    const dataJson = await data.json();
    console.log(dataJson);
    setSpinner(false);
  };
  function onSelectionChange(e) {
    const selection = e.target.value;
    const nssortedList = _.orderBy([...list], ["info.avgRating"], [selection]);
    setState({ ...state, selected: e.target.value });
    setList(nssortedList); //re-render
  }
  const [searchText, setSearchText] = useState("");
  let searchProps = {
    list: list,
    setList: setList,
    searchText: searchText,
    setSearchText: setSearchText,
  };
  return (
    <div className="body">
      <div className="search">
        <Search {...searchProps} />
        <Filter
          values={list}
          setFn={setList}
          name="Ratings 4.3+"
          condition={condi.greterfour}
          sortBy={state.selected}
        />
        <span>Sort By Rating:</span>
        <select value={state.selected} onChange={onSelectionChange} id="sort">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <Button
          name="RESET"
          id="reset"
          clname="reset"
          onClick={() => {
            setState({ ...state, selected: "asc" });
            setList(resetList);
            setSearchText("");
          }}
        />
      </div>
      <div className="res-container">
        {spinner === false ? (
          list.length === 0 ? (
            <h1>No Restaurants Found</h1>
          ) : (
            list.map((restaurant) => (
              <RestaurantCard  resData={restaurant.info} />
            ))
          )
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};
export default Body;
