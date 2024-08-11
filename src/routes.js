import {createBrowserRouter} from "react-router-dom";
import React from "react";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import Employee from "./pages/Employee";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/employees",
    element: <Employees/>,
  },
  {
    path: "/employees/:id",
    element: <Employee/>,
  },
  {
    path: "/employees/add",
    element: <Employee/>,
  }
]);

export default router;
