import {createBrowserRouter} from "react-router-dom";
import React from "react";
import Employees from "./pages/Employees";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/employees",
    element: <Employees />,
  }
]);

export default router;
