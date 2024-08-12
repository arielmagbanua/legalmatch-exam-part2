import {createBrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Employees from "../pages/Employees";
import Login from "../pages/Login";
import Employee from "../pages/Employee";
import PrivateRoutes from "./PrivateRoutes";
import employees from "../pages/Employees";
import Header from "../components/Header";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/employees",
    element: <PrivateRoutes/>,
    children: [
      {
        path: "/employees",
        element: (
          <>
            <Header className="p-6"/>
            <Employees/>
          </>
        ),
      },
      {
        path: "/employees/:id",
        element: (
          <>
            <Header className="p-6"/>
            <Employees/>
          </>
        ),
      },
      {
        path: "/employees/add",
        element: (
          <>
            <Header className="p-6"/>
            <Employees/>
          </>
        ),
      }
    ]
  }
]);

export default router;
