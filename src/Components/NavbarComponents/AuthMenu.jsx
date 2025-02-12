import React, { useContext, useEffect, useState } from "react";
import { NavLink, replace, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import Register from "../auth/Register";
import Login from "../auth/Login";
import { AUTHContextAPI } from "../Context/AuthContext";
import ResetPassword from "../auth/ResetPassword";
import { signOut } from "firebase/auth";
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";

const AuthMenu = () => {
  let navigate = useNavigate();
  let {
    modalVisible,
    setModalVisible,
    whichPortal,
    setWhichPortal,
    authUser,
    setAuthUser,
  } = useContext(AUTHContextAPI);

  let handleLogOut = async () => {
    try {
      await signOut(__AUTH);

      setAuthUser(null);
      window.localStorage.removeItem("TOKEN");
      setModalVisible(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.code || "Failed to logout");
    }
  };

  return (
    <section>
      <ul className="flex gap-5 items-center">
        {authUser === null ? (
          <>
            {" "}
            <li>
              <NavLink
                className={
                  "py-[6px] px-[16px] rounded-[6px] border-[1px] border-[#EE10B0] text-[14px] w-[36px]"
                }
                onClick={() => {
                  setWhichPortal("login");
                  setModalVisible(true);
                }}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className={
                  "py-[6px] px-[16px] rounded-[6px] bg-[#EE10B0] border-[1px] border-[#EE10B0] text-[14px]  w-[36px]"
                }
                onClick={() => {
                  setWhichPortal("signup");
                  setModalVisible(true);
                }}
              >
                Sign up
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to={"/user-profile"}>
                <img
                  src={authUser?.photoURL}
                  className="h-[40px] w-[40px] rounded-full"
                  alt=""
                />
              </NavLink>
            </li>
            <li>
              <NavLink
                className={
                  "py-[6px] px-[16px] rounded-[6px] bg-[#EE10B0] border-[1px] border-[#EE10B0] text-[14px]  w-[36px]"
                }
                onClick={handleLogOut}
              >
                Logout
              </NavLink>
            </li>
          </>
        )}
      </ul>
      {modalVisible != null && whichPortal == "login" && (
        <Modal isVisible={modalVisible} handleIsVisible={setModalVisible}>
          <Login />
        </Modal>
      )}
      {modalVisible != null && whichPortal == "signup" && (
        <Modal isVisible={modalVisible} handleIsVisible={setModalVisible}>
          <Register />
        </Modal>
      )}
      {modalVisible != null && whichPortal == "reset" && (
        <Modal isVisible={modalVisible} handleIsVisible={setModalVisible}>
          <ResetPassword />
        </Modal>
      )}
    </section>
  );
};

export default AuthMenu;
