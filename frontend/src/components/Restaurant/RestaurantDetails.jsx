import Grid2 from "@mui/material/Grid2"; // Correct default import
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import MenuCard from "./MenuCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantById,
  getRestaurantsCategory,
} from "../../State/Restaurant/Action";
import { getMenuItemsByRestaurantId } from "../../State/Menu/Action";

const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian only", value: "vegetarian" },
  { label: "Non-vegetarian only", value: "non-vegetarian" },
  { label: "Seasonal", value: "seasonal" },
];

const RestaurantDetails = () => {
  const [foodType, setFoodType] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const { auth, restaurant, menu } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { id } = useParams();
  const handleFilter = (event) => {
    setFoodType(event.target.value);
  };
  const handleFilterCategory = (event, value) => {
    setSelectedCategory(value);
  };

  console.log("restaurant", restaurant);

  useEffect(() => {
    dispatch(getRestaurantById({ token, restaurantId: id }));
    dispatch(getRestaurantsCategory({ token, restaurantId: id }));
  }, []);

  useEffect(() => {
    dispatch(
      getMenuItemsByRestaurantId({
        jwt: token,
        restaurantId: id,
        vegetarian: foodType === "vegetarian",
        nonvegetarian: foodType === "non-vegetarian",
        seasonal: foodType === "seasonal",
        foodCategory: selectedCategory,
      })
    );
  }, [selectedCategory, foodType]);

  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home/chinese/chinese fast food/3/Order Online
        </h3>
        <div>
          <Grid2 container spacing={2}>
            {/* First image takes full width */}
            <Grid2 size={{ xs: 12 }}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[0]}
                alt="First"
              />
            </Grid2>

            {/* Next two images split the space on larger screens */}
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[1]}
                alt="Second"
              />
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 6 }}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images[2]}
                alt="Third"
              />
            </Grid2>
          </Grid2>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">
            {restaurant.restaurant?.name}
          </h1>
          <p className="text-gray-500 mt-1">
            {restaurant.restaurant?.description}
          </p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>Agadir 80000, Morocco</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarTodayIcon />
              <span>Mon-Sun: 10:00 AM - 10:00 PM (Today)</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div className="space-y-10 lg:w-[20%] filter ">
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Type
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  name="food_type"
                  value={foodType}
                  onChange={handleFilter}
                >
                  {foodTypes.map((type, index) => (
                    <FormControlLabel
                      key={index}
                      value={type.value}
                      control={<Radio />}
                      label={type.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Food Category
              </Typography>
              <FormControl className="py-10 space-y-5" component={"fieldset"}>
                <RadioGroup
                  name="food_category"
                  //value={foodType || "all"}
                  onChange={handleFilterCategory}
                  value={selectedCategory}
                >
                  {restaurant.categories.map((type, index) => (
                    <FormControlLabel
                      key={index}
                      value={type.name}
                      control={<Radio />}
                      label={type.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {menu.menuItems.map((item, index) => (
            <MenuCard key={index} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RestaurantDetails;
