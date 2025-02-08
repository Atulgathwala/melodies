import React, { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { TbLockPassword } from "react-icons/tb";

import Spinner from "../utility/Spinner/Spinner";
import { __AUTH } from "../../backend/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";
import { AUTHContextAPI } from "../Context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

const Register = () => {
  let { setModalVisible, setWhichPortal } = useContext(AUTHContextAPI);

  let navigate = useNavigate();

  const iniTialUserState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  let [isLoading, setIsLoading] = useState(false);
  let [passVisiblity, setPassVisiblity] = useState(false);

  let handlePassWordVisiblity = () => {
    setPassVisiblity(!passVisiblity);
  };

  // consfirm password toggle

  let [CNFpassVisiblity, setCNFPassVisiblity] = useState(false);

  let handleCNFPassWordVisiblity = () => {
    setCNFPassVisiblity(!CNFpassVisiblity);
  };

  let [userData, setUserData] = useState(iniTialUserState);

  let { username, email, password, confirmPassword } = userData;

  let handleInputChange = (e) => {
    let { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password == confirmPassword) {
      try {
        let userSignUpData = await createUserWithEmailAndPassword(
          __AUTH,
          email,
          password
        );
        toast.success("user Registered Successfully");
        await sendEmailVerification(userSignUpData?.user);
        toast.success(`email Verification has been sent to ${email} `);
        updateProfile(userSignUpData?.user, {
          displayName: username,
        });

        setUserData(iniTialUserState);
        setWhichPortal("login");
      } catch (err) {
        toast.error(err.code.slice(5));
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Password Must Match");
      setModalVisible(false);
    }
  };

  //
  return (
    <section className="bg-[#53063E] w-[530px]  py-[16px] px-[25px] rounded-md ">
      <article className="w-[100%] h-[100%]   ">
        <form action="" onSubmit={handleSubmit}>
          <header>
            <h1 className="text-[#FCE9EC] text-[20px] font-[600] text-center">
              Register
            </h1>
          </header>
          <main>
            <div className=" ">
              <label htmlFor="name" className="block font-[500] py-2">
                Name
              </label>
              <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                <span className="text-[28px]">
                  <FaUser />
                </span>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                  name="username"
                  onChange={handleInputChange}
                  value={username}
                />
              </div>
            </div>
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
                  name="email"
                  onChange={handleInputChange}
                  value={email}
                />
              </div>
            </div>
            <section className="flex justify-between gap-3">
              <div className="  ">
                <label htmlFor="name" className="block font-[500] py-2">
                  Password
                </label>
                <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px] relative">
                  <span className="text-[28px]">
                    <TbLockPassword />
                  </span>
                  <input
                    type={passVisiblity ? "text" : "password"}
                    placeholder="Enter Password"
                    className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                    name="password"
                    onChange={handleInputChange}
                    value={password}
                  />

                  <span
                    className="absolute right-[7px] bottom-[16px]"
                    onClick={handlePassWordVisiblity}
                  >
                    {passVisiblity ? <IoMdEyeOff /> : <IoEye />}
                  </span>
                </div>
              </div>
              <div className=" ">
                <label htmlFor="name" className="block font-[500] py-2">
                  Confirm Password
                </label>
                <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px] relative">
                  <span className="text-[28px]">
                    <RiLockPasswordFill />
                  </span>
                  <input
                    type={CNFpassVisiblity ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                    name="confirmPassword"
                    onChange={handleInputChange}
                    value={confirmPassword}
                  />
                  <span
                    className="absolute right-[7px] bottom-[16px] cursor-pointer"
                    onClick={handleCNFPassWordVisiblity}
                  >
                    {CNFpassVisiblity ? <IoMdEyeOff /> : <IoEye />}
                  </span>
                </div>
              </div>
            </section>

            {/* footer section */}
          </main>

          <div className="py-2">
            <NavLink
              onClick={() => {
                setWhichPortal("login");
              }}
            >
              Have an Account ?
            </NavLink>
          </div>

          <footer className="py-4 flex flex-col gap-2">
            <button className="py-3 px-10 bg-[#EE10B0] w-[100%] text-[18px] font-[500] rounded-[4px] cursor-pointer">
              Register
            </button>
          </footer>
        </form>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default Register;
