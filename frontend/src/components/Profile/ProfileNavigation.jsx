import React from "react";
import {
  ShoppingBag,
  Favorite,
  AccountBalanceWallet,
  NotificationsActive,
  Event,
  Logout,
  AddReaction as AddReactionIcon,
} from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./../../State/Authentication/Action";

const menu = [
  { title: "Orders", icon: <ShoppingBag /> },
  { title: "Favorites", icon: <Favorite /> },
  { title: "Address", icon: <AddReactionIcon /> },
  { title: "Payments", icon: <AccountBalanceWallet /> },
  { title: "Notifications", icon: <NotificationsActive /> },
  { title: "Events", icon: <Event /> },
  { title: "Logout", icon: <Logout /> },
];

const ProfileNavigation = ({ open, handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:800px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      dispatch(logout());
      navigate("/");
    } else {
    }
    navigate(`/my-profile/${item.title.toLowerCase()}`);
  };

  return (
    <div>
      <Drawer
        sx={{ zIndex: 1 }}
        anchor="left"
        open={isSmallScreen ? open : true}
        onClose={handleClose}
        variant={isSmallScreen ? "temporary" : "permanent"}
      >
        <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8">
          {menu.map((item, index) => (
            <>
              <div
                onClick={() => handleNavigate(item)}
                className="px-5 items-center space-x-5 cursor-pointer"
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
              {index !== menu.length - 1 && <Divider />}
            </>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileNavigation;
