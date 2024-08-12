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
    path: "/",
    index: true,
    element: (
      <ProtectedRoutes>
        <Header title="Employees"/>
        <Employees/>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/employees",
    element: (
      <ProtectedRoutes>
        <Header title="Employees"/>
        <Employees/>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/employees/:id",
    element: (
      <ProtectedRoutes>
        <Header title="Edit Employee"/>
        <Employee/>
      </ProtectedRoutes>
    ),
  },
  {
    path: "/employees/add",
    element: (
      <ProtectedRoutes>
        <Header title="Add Employee"/>
        <Employee/>
      </ProtectedRoutes>
    ),
  }
]);

export default router;
