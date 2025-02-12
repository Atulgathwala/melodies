import { doc, onSnapshot, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { __DB } from "../../backend/firebase";
import { AUTHContextAPI } from "./AuthContext";
export let UserContextApi = createContext(null);
const UserContext = ({ children }) => {
  let { authUser } = useContext(AUTHContextAPI);

  let [userDBData, setUserDBData] = useState(null);

  let fetchUserData = async () => {
    try {
      if (authUser) {
        let userDataREF = doc(__DB, "user_profiles", authUser?.uid);
        onSnapshot(userDataREF, (userData) => {
          if (userData.exists) {
            setUserDBData(userData.data());
          } else {
            console.log("nhi millaa ");
          }
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchUserData();
  }, [authUser]);
  return (
    <UserContextApi.Provider value={{ userDBData }}>
      {children}
    </UserContextApi.Provider>
  );
};

export default UserContext;
