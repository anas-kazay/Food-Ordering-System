import { Card, Chip, IconButton } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../State/Authentication/Action";
import { isPresentInFavorites } from "../config/logic";
import { store } from "./../../State/store";

const RestaurantCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const handleAddToFavorites = () => {
    console.log("id", item.id);
    dispatch(addToFavorite({ jwt, restaurantId: item.id }));
    console.log("auth", auth);
  };

  const handleNavigateToRestaurant = () => {
    if (item.open) {
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    }
  };

  return (
    <Card className="w-[18rem] productCard">
      <div
        className={`${true ? "cursor-pointer" : "cursor-not-allowed"} relative`}
      >
        <img
          className="w-full h-[10rem] rounded-t-md object-cover"
          src={item.images[0]}
          alt=""
        />
        <Chip
          className="absolute top-2 left-2"
          size="small"
          color={item.open ? "success" : "error"}
          label={item.open ? "Open" : "Closed"}
        />
      </div>
      <div className="p-4 textPart lg:flex w-full justify-between">
        <div className="space-y-1">
          <p
            className="font-semibold text-lg cursor-pointer"
            onClick={handleNavigateToRestaurant}
          >
            {item.name}
          </p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </div>
        <div>
          <IconButton>
            {isPresentInFavorites(auth.favorites, item) ? (
              <FavoriteIcon onClick={handleAddToFavorites} />
            ) : (
              <FavoriteBorderIcon onClick={handleAddToFavorites} />
            )}
          </IconButton>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantCard;
