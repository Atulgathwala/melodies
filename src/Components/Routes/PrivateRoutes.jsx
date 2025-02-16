import React, { useContext } from "react";
import { AUTHContextAPI } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  let { authUser } = useContext(AUTHContextAPI);

  if (
    authUser !== null &&
    window.localStorage.getItem("TOKEN" || authUser?.accessToken)
  ) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/"} />;
  }
};

export default PrivateRoutes;
