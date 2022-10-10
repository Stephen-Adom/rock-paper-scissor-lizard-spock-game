import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";

type ProtectedRouteType = {
  component: ReactElement;
};

export const ProtectedRoute = ({ component }: ProtectedRouteType) => {
  const authId = useAppSelector((state) => state.app.authId);

  return <>{authId ? component : <Navigate to="/" />}</>;
};
