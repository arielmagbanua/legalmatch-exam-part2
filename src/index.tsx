// @ts-ignore
import React from "react";
// @ts-ignore
import ReactDOM from "react-dom/client";
import "./index.css";
import router from "./routing/routes";
import reportWebVitals from "./reportWebVitals";
import {RouterProvider} from "react-router";
import {Provider as DependencyProvider} from "./context/Dependencies";
import Header from "./components/Header";
import {SnackbarProvider} from 'notistack';
import PrivateRoutes from "./routing/PrivateRoutes";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <DependencyProvider>
    <SnackbarProvider autoHideDuration={3000}>
      <RouterProvider router={router}/>
    </SnackbarProvider>
  </DependencyProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
