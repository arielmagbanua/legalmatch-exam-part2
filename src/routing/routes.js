import {createBrowserRouter} from "react-router-dom";
import React from "react";
import Employees from "../pages/Employees";
import Login from "../pages/Login";
import Employee from "../pages/Employee";
import ProtectedRoutes from "./ProtectedRoutes";
import Header from "../components/Header";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/employees",
    element: (
      <ProtectedRoutes>
        <Header className="p-6"/>
        <Employees/>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/employees/:id",
    element: (
      <ProtectedRoutes>
        <Header className="p-6"/>
        <Employee/>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/employees/add",
    element: (
      <ProtectedRoutes>
        <Header className="p-6"/>
        <Employee/>
      </ProtectedRoutes>
    ),
  }
]);

export default router;
