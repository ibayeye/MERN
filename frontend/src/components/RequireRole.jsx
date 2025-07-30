import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ErrorView from "../page/ErrorView";

const RequireRole = ({ allowedRoles }) => {
    const user = useSelector((state) => state.userState.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to={<ErrorView />} />
  );
};

export default RequireRole;
