import React, { useContext, useState } from "react";

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

import googleICON from "../../assets/images/icons/devicon_google.png";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";
import { AUTHContextAPI } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";

const ResetPassword = () => {
  let initialLoginState = {
    email: "",
  };

  let { setModalVisible, setWhichPortal } = useContext(AUTHContextAPI);

  let [isLoading, setIsloading] = useState(false);

  let [loginUserData, setLoginUserData] = useState(initialLoginState);

  let { email, password } = loginUserData;

  let handleInputchange = (e) => {
    let { name, value } = e.target;
    setLoginUserData({
      ...loginUserData,
      [name]: value,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      await sendPasswordResetEmail(__AUTH, email);

      toast.success(`Reset Link has been sent to ${email}`);
      setWhichPortal("login");
    } catch (error) {
      toast.error(error.code);
    } finally {
      setIsloading(false);
    }

    console.log(loginUserData);
  };

  return (
    <section className="bg-[#53063E] w-[530px]  py-[16px] px-[25px] rounded-md ">
      <article className="w-[100%] h-[100%]   ">
        <form action="" onSubmit={handleSubmit}>
          <header>
            <h1 className="text-[#FCE9EC] text-[20px] font-[600] text-center">
              Reset Password
            </h1>
          </header>
          <main>
            <div className=" ">
              <label htmlFor="name" className="block font-[500] py-2">
                Email
              </label>
              <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                <span className="text-[28px]">
                  <HiOutlineMail />
                </span>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                  onChange={handleInputchange}
                  name="email"
                  value={email}
                />
              </div>
            </div>

            {/* footer section */}
          </main>
          <div className=" py-2">
            <NavLink
              onClick={() => {
                setWhichPortal("login");
              }}
            >
              Login with Password ?
            </NavLink>
          </div>

          <footer className="py-4 flex flex-col gap-2">
            <button className="py-3 px-10 bg-[#EE10B0] w-[100%] text-[18px] font-[500] rounded-[4px] cursor-pointer">
              Reset Password
            </button>

            {/* Google auth */}
          </footer>
        </form>
      </article>
    </section>
  );
};

export default ResetPassword;
