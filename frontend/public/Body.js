import Button from "./Button";
import React, { useState, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RestaurantCard from "./Res";
import Shimmer from "./loader";
import Search from "./search";
import * as Urls from "./Url";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
const Body = () => {
  const [cityname, setCityname] = useState(
    window.sessionStorage.getItem("cityname")
  );
  const user = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [list, setList] = useState([]);
  const [resetList, setResetList] = useState([]);
  const [permissionState, setPermissionState] = useState('prompt'); // 'granted', 'denied', 'prompt'
  const [showModal, setShowModal] = useState(false)
  const [options, setOptions] = useState({
    "Select City": "",
    Amdavad: "lat=23.022505&lng=72.5713621",
    Mumbai: "lat=19.0759837&lng=72.8776559",
    Banglore: "lat=12.9715987&lng=77.5945627",
    Surat: "lat=21.1702401&lng=72.83106070000001",
  });
  const [city, setCity] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchNew, setSearchnew] = useState("");
  const [sortdir, setSortdir] = useState("asc");
  const searchProps = {
    searchText: searchText,
    setSearchText: setSearchText,
  };
  const searchPropsnew = {
    searchText: searchNew,
    setSearchText: setSearchnew,
    class: "new-test",
    placeholder: "Search a data you want...",
  };
  useEffect(() => {
    checkPermissions(); // Check geolocation permissions when the component mounts
  }, []);

  const checkPermissions = async () => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      setPermissionState(result.state);
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };
  const fetchSwiggyData = async () => {
    setSpinner(true);
    const ApiUrl = Urls.SWG_API + "&" + city;
    try {
      const data = await fetch(ApiUrl);
      const dataJson = await data.json();
      const newObj =
        dataJson.data.cards[4].card.card.gridElements.infoWithStyle.restaurants;
      const sortedData = sortBy([...newObj]);
      setResetList([...newObj]);
      setList(sortedData);
    } catch (error) {
      toast.error(error);
      setList([]);
    }

    setSpinner(false);
  };
  useEffect(() => {
    if (city != "" && user.user != null) {
      fetchSwiggyData();
    } else {
      setList([]);
    }
  }, [city]);
  useEffect(() => {
    const sortedData = sortBy();
    setList(sortedData);
  }, [sortdir, isChecked, searchText, searchNew]); // Ensure the list updates when these states change
  const sortBy = (flag = []) => {
    const type = sortdir;
    let reTarr = flag.length > 0 ? [...flag] : [...resetList];
    if (isChecked) {
      reTarr = reTarr.filter((res) => res.info.avgRating > 4.3);
    }
    if (searchText != "") {
      reTarr = reTarr.filter(
        (res) =>
          res.info.name.toLowerCase().includes(searchText.toLowerCase()) ||
          res.info.cuisines
            .join(", ")
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          res.info.areaName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (searchNew != "") {
      reTarr = reTarr.filter((res) =>
        res.info.costForTwo.toLowerCase().includes(searchNew.toLowerCase())
      );
    }
    if (type === "asc") {
      reTarr.sort((a, b) => {
        const ratingA = a.info.avgRating || 0;
        const ratingB = b.info.avgRating || 0;
        return ratingA - ratingB;
      });
    } else {
      reTarr.sort((a, b) => {
        const ratingA = a.info.avgRating || 0;
        const ratingB = b.info.avgRating || 0;
        return ratingB - ratingA;
      });
    }
    return reTarr;
  };
  const resetFilters = () => {
    setSortdir("asc");
    setSearchText("");
    setSearchnew("");
    setIsChecked(false);
    setList([...resetList]); // Reset the list to its original sortdir
  };
  function onSelectionChange(e) {
    const selection = e.target.value;
    setSortdir(selection);
  }

  function handleClick(e) {

    var fcityname = cityname;
    if (fcityname == null) {
      getLocation();
    } else if (e) {
      getLocation();
    }
    else {
      setnewOptions(options, JSON.parse(fcityname));
    }
  }

  function setnewOptions(options, data) {
    const arr1 = options;
    const arr2 = { [data.city]: data.latstring };
    let merged = { ...arr2, ...arr1 };
    if (merged["Select City"] == "") delete merged["Select City"];
    setOptions(merged);
    setCity(data.latstring);
  }

  useEffect(() => {
    handleClick();
  }, []);
  const getLocation = () => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Step 2: Reverse geocode to get city name (using Nominatim)
            const cityName = await getCityName(latitude, longitude);
            if (cityName != "") {
              setPermissionState('granted');
              window.sessionStorage.setItem(
                "cityname",
                JSON.stringify({
                  city: cityName,
                  latstring: `lat=${latitude}&lng=${longitude}`,
                })
              );
              setCityname(window.sessionStorage.getItem("cityname"));
              if (cityName != "" && options.cityName === undefined) {
                setnewOptions(options, {
                  city: cityName,
                  latstring: `lat=${latitude}&lng=${longitude}`,
                });
              }
            }

          } catch (err) {
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionState('denied');
            setShowModal(true);
          } else {
          }
        }
      );
    } else {
    }
  };
  // Free reverse geocoding with Nominatim (no API key needed)
  const getCityName = async (lat, lng) => {
    setSpinner(true);
    try {
      console.log("Fetching city name...");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("API Response:", data);
      setSpinner(false);
      return (
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.county ||
        ""
      );
    } catch (error) {
      setSpinner(false);
      console.error("Error fetching city name:", error);
      return "";
    }
  };
  const getGeolocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return "Location access was denied. Please enable permissions.";
      case error.POSITION_UNAVAILABLE:
        return "Location information is unavailable.";
      case error.TIMEOUT:
        return "The request to get location timed out.";
      default:
        return "An unknown error occurred.";
    }
  };
  const closeModal = () => setShowModal(false);
  return (

    <div className="body">
      <div className="p-4">



        {/* Show the modal when permission is denied */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-container">
              <div className="modal-header">Location Permission Denied</div>
              <div className="modal-body">
                Location permissions have been denied. Please reset your location access manually by following these steps:
                <ul className="modal-list">
                  <li>Go to your browser settings.</li>
                  <li>Find this website under "Permissions" or "Location".</li>
                  <li>Set the location access to "Allow".</li>
                </ul>
              </div>
              <button
                onClick={() => {
                  checkPermissions(); // Check again after the user manually resets permissions
                  closeModal();
                }}
                className="modal-button modal-button-primary"
              >
                I’ve Reset the Permissions
              </button>
              <button
                onClick={closeModal}
                className="modal-button modal-button-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <Button
        name={(spinner ? "Fetching your location..." : "Locate me using GPS")}
        id="location"
        clname="location"
        onClick={handleClick} // Use the resetFilters function
      />
      {cityname && !spinner && <h4>Current Location: {JSON.parse(cityname).city}</h4>}
      <div className="search">
        <Search {...searchProps} />
        <span>Rating 4.3+</span>
        <input
          type="checkbox"
          id="rating"
          checked={isChecked}
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        />
        <span>Sort By Rating:</span>
        <select value={sortdir} onChange={onSelectionChange} id="sortrating">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <div className="city">
          <strong htmlFor="city">Chose Your City:</strong>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            id="city"
          >
            {Object.keys(options).map((key, index) => (
              <option key={index} value={options[key]}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <Search {...searchPropsnew} />
        <Button
          name="RESET"
          id="reset"
          clname="reset"
          onClick={resetFilters} // Use the resetFilters function
        />
      </div>
      <div className="res-container new">
        {spinner === false ? (
          list.length === 0 ? (
            <h1>No Restaurants Found</h1>
          ) : (
            list.map((restaurant, index) =>
              restaurant.info ? (
                <RestaurantCard
                  key={restaurant.info.id || index}
                  id={restaurant.info.id || `restaurant-${index}`}
                  resData={restaurant.info}
                />
              ) : null
            )
          )
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
};
export default Body;
