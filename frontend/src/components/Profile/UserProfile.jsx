import React from "react";
import { AccountCircle } from "@mui/icons-material";
import { Button } from "@mui/material";

const UserProfile = () => {
  const handleLogout = () => {};
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
      <div className="flex flex-col items-center justify-center">
        <AccountCircle sx={{ fontSize: "9rem" }} />
        <h1 className="text-2xl font-semibold py-5">Yassin Simo</h1>
        <p className="text-gray-400">Email: yassinazi@gmail.com</p>
        <Button
          sx={{ margin: "2rem 0rem " }}
          onClick={handleLogout}
          variant="contained"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
