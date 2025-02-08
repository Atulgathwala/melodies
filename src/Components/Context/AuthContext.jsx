import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import { __AUTH } from "../../backend/firebase";

export let AUTHContextAPI = createContext(null);

const AuthContext = ({ children }) => {
  let [modalVisible, setModalVisible] = useState(false);

  let [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(__AUTH, (user) => {
      if (user?.emailVerified && user?.accessToken) {
        setAuthUser(user);
        window.localStorage.setItem("TOKEN", user?.accessToken);
      }
    });
  }, []);

  let [whichPortal, setWhichPortal] = useState(null);
  return (
    <AUTHContextAPI.Provider
      value={{
        modalVisible,
        setModalVisible,
        setWhichPortal,
        whichPortal,
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AUTHContextAPI.Provider>
  );
};

export default AuthContext;
