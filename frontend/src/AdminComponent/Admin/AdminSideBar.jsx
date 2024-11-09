import {
  AdminPanelSettings,
  Category,
  Dashboard,
  EventNote,
  Fastfood,
  Logout,
  ShopTwo,
  ShoppingBag,
} from "@mui/icons-material";
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../State/Authentication/Action";

const menu = [
  { title: "Dashboard", icon: <Dashboard />, path: "/" },
  { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
  { title: "Menu", icon: <ShopTwo />, path: "/menu" },
  { title: "Food Category", icon: <Category />, path: "/category" },
  { title: "Ingredients", icon: <Fastfood />, path: "/ingredients" },
  { title: "Events", icon: <EventNote />, path: "/events" },
  { title: "Details", icon: <AdminPanelSettings />, path: "/details" },
  { title: "Logout", icon: <Logout />, path: "/logout" },
];

const AdminSideBar = ({ handleClose }) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const dispath = useDispatch();
  const handleNavigate = (item) => {
    navigate(`/admin/restaurants${item.path}`);
    if (item.title === "Logout") {
      navigate("/");
      dispath(logout());
      handleClose();
    }
  };
  return (
    <div>
      <>
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          sx={{ zIndex: 1 }}
          anchor="left"
          open={true}
          onClose={handleClose}
        >
          <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
            {menu.map((item, index) => (
              <>
                <div
                  onClick={() => handleNavigate(item)}
                  key={index}
                  className="flex items-center px-5 gap-5 cursor-pointer"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {index !== menu.length - 1 && <Divider />}
              </>
            ))}
          </div>
        </Drawer>
      </>
    </div>
  );
};

export default AdminSideBar;
