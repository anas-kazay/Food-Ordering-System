import React from "react";
import Cart from "./Cart";
import HomeIcon from "@mui/icons-material/Home";
import AddLocation from "@mui/icons-material/AddLocation";
import { Button, Card } from "@mui/material";

const AddressCard = ({ item, showButton, handleSelectAddress }) => {
  return (
    <Card className="flex gap-5 w-64 p-5">
      <AddLocation />
      <div className="space-y-3 text-gray-500">
        <h1 className="font-semibold text-lg text-white">Home</h1>
        <p>Tikioune , Agadir 80000 Morroco</p>
        {showButton && (
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleSelectAddress(item)}
          >
            select
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AddressCard;
