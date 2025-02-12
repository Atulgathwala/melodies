import React, { useContext, useEffect, useState } from "react";

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";

import googleICON from "../../assets/images/icons/devicon_google.png";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { __AUTH } from "../../backend/firebase";
import toast from "react-hot-toast";
import { AUTHContextAPI } from "../Context/AuthContext";
import { NavLink } from "react-router-dom";
import Spinner from "../utility/Spinner/Spinner";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";

const Login = () => {
  let initialLoginState = {
    email: "",
    password: "",
  };

  let { setModalVisible, setWhichPortal } = useContext(AUTHContextAPI);

  let [passVisiblity, setPassVisiblity] = useState(false);

  let handlePassWordVisiblity = () => {
    setPassVisiblity(!passVisiblity);
  };

  let [isLoading, setIsloading] = useState(false);

  let [loginUserData, setLoginUserData] = useState(initialLoginState);

  let { email, password } = loginUserData;

  let handleLoginWithGoogle = async () => {
    console.log("trigger");

    try {
      let Provider = new GoogleAuthProvider();

      let result = await signInWithPopup(__AUTH, Provider);
    } catch (error) {}
  };

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
      let loginData = await signInWithEmailAndPassword(__AUTH, email, password);
      console.log(loginData?.user);

      if (loginData?.user?.emailVerified) {
        toast.success("user Logged In Successfully");
        setLoginUserData(initialLoginState);
        setModalVisible(false);
      } else {
        toast.error("First Verify email  !!");
      }
    } catch (error) {
      toast.error(error.code);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <section className="bg-[#53063E] w-[530px]  py-[16px] px-[25px] rounded-md ">
      <article className="w-[100%] h-[100%]   ">
        <form action="" onSubmit={handleSubmit}>
          <header>
            <h1 className="text-[#FCE9EC] text-[20px] font-[600] text-center">
              Login
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

            <div className=" ">
              <label htmlFor="name" className="block font-[500] py-2">
                Password
              </label>
              <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px] relative">
                <span className="text-[28px]">
                  <RiLockPasswordFill />
                </span>
                <input
                  type={passVisiblity ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                  value={password}
                  name="password"
                  onChange={handleInputchange}
                />
                <span
                  className="absolute right-[7px] bottom-[16px] cursor-pointer"
                  onClick={handlePassWordVisiblity}
                >
                  {passVisiblity ? <IoMdEyeOff /> : <IoEye />}
                </span>
              </div>
            </div>

            {/* footer section */}
          </main>
          <div className=" py-2 flex justify-between items-center">
            <NavLink
              onClick={() => {
                setWhichPortal("reset");
              }}
            >
              Forget Password ?
            </NavLink>
            {/* Sign Up */}
            <NavLink
              onClick={() => {
                setWhichPortal("signup");
              }}
            >
              Dont have Account ?
            </NavLink>
          </div>

          <footer className="py-4 flex flex-col gap-2">
            <button className="py-3 px-10 bg-[#EE10B0] w-[100%] text-[18px] font-[500] rounded-[4px] cursor-pointer">
              Login
            </button>
            <div className="flex items-center gap-2">
              <span>
                <hr className="border-1 border-white w-[220px]" />
              </span>
              <span className="font-[500]">OR</span>
              <span>
                <hr className="border-1 border-white w-[220px]" />
              </span>
            </div>

            {/* Google auth */}

            <div
              className="py-2 px-10 border-2 border-white w-[100%] text-[18px] font-[500] rounded-[4px] cursor-pointer flex items-center justify-center gap-2"
              onClick={handleLoginWithGoogle}
            >
              <span>
                <img src={googleICON} alt="" />
              </span>
              <span>Sign In With Google</span>
            </div>
          </footer>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Login;
