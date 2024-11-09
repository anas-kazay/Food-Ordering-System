import { Grid2 } from "@mui/material";
import React from "react";
import IngredientsTable from "./IngredientsTable";
import IngredientsCategoryTable from "./IngredientsCategoryTable";

const Ingredients = () => {
  return (
    <div>
      <Grid2 container spacing={2} className="py-1 px-3">
        <Grid2 item size={{ xs: 12, lg: 8 }}>
          <IngredientsTable />
        </Grid2>
        <Grid2 item size={{ xs: 12, lg: 4 }}>
          <IngredientsCategoryTable />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Ingredients;
