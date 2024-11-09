import React from "react";
import AdminRoute from "./AdminRoute";
import { Route, Routes } from "react-router-dom";
import CustomerRouter from "./CustomerRouter";

const Routers = () => {
  return (
    <Routes>
      <Route path="/admin/restaurants/*" element={<AdminRoute />} />
      <Route path="/*" element={<CustomerRouter />} />
    </Routes>
  );
};

export default Routers;
