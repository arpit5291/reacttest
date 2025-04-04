import { CDN_URL } from "./Url.js";
const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    costForTwo,
    costForTwoString,
    areaName,
  } = resData;
  const { slaString } = resData.sla;
  return (
    <div
      className="res-card"
      style={{
        backgroundColor: "#f0f0f0",
      }}
    >
      <img
        className="res-logo"
        src={
          CDN_URL +
          cloudinaryImageId
        }
        alt="Biryani"
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwoString}</h4>
      <h4>{slaString}</h4>
      <h4>{areaName}</h4>

    </div>
  );
};
export default RestaurantCard;
