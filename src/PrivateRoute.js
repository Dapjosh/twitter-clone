/* eslint-disable react/prop-types */
// PrivateRoute.js
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { isAuthenticated } from "./AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Routes>
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  </Routes>
);

export default PrivateRoute;
