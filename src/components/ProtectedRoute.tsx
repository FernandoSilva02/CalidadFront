import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
  redirectPath = "/",
  children,
}: {
  redirectPath?: string;
  children: React.ReactNode;
}) => {
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
