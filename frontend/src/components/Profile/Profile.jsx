import React, { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Address from "./Address";
import Favorites from "./Favorites";
import Events from "./Events";
import { Route, Routes } from "react-router-dom";

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  return (
    <div className="lg:flex justify-between">
      <div className="sticky h-[80vh] lg:w-[20%]">
        <ProfileNavigation open={openSideBar} />
      </div>
      <div className="lg:w-[80%]">
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          {/* <Route path="/payments" element={<Payments />} /> */}
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/events" element={<Events />} />
          {/* <Route path="/logout" element={<Logout />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
