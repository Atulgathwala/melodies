import React, { useContext } from "react";
import AuthContext, { AUTHContextAPI } from "../Context/AuthContext";
import { UserContextApi } from "../Context/UserContext";
import { NavLink } from "react-router-dom";
import coinImage from "../../assets/images/coin.png";

const MyAccount = () => {
  let { authUser } = useContext(AUTHContextAPI);
  let { userDBData } = useContext(UserContextApi);

  return (
    <section className="h-[100vh] w-full flex items-center justify-center ">
      <article className="w-[750px] bg-[#232323] rounded-xl shadow-sm shadow-purple-600/30 flex flex-col overflow-hidden animate-fadeIn">
        <header className="bg-gradient-to-r from-[#3a3a5a] to-[#2a2a3e] text-white text-lg font-semibold flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-6">
            <aside>
              <img
                src={authUser?.photoURL}
                alt="User"
                className="h-[100px] w-[100px] rounded-full shadow-lg border-4 border-gray-800"
              />
            </aside>
            <aside>
              <h1 className="text-[20px] font-bold">{authUser?.displayName}</h1>
              <p className="text-gray-400 text-[16px]">{authUser?.email}</p>
            </aside>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={coinImage}
              alt="Coins"
              className="h-[50px] animate-bounce"
            />
            <span className="text-yellow-400 font-bold text-lg">
              <span className="font-extrabold">M</span> Coins:{" "}
              {userDBData?.Balance || 0}
            </span>
          </div>
        </header>

        {!userDBData ? (
          <section className="p-10 text-center text-white">
            <h1 className="text-3xl font-bold mb-4">
              Please Complete Profile !!
            </h1>
            <img
              src="https://i.ibb.co/sWh24k4/images-removebg-preview.png"
              alt="Complete Profile"
              className="mx-auto mb-4 w-[250px]"
            />
            <NavLink
              to="/user-profile/add-profile"
              className="bg-amber-600 px-6 py-3 rounded-lg hover:bg-amber-700 transition duration-300 inline-block"
            >
              Go to Add Profile
            </NavLink>
          </section>
        ) : (
          <main className="p-6 text-white">
            <div className="text-2xl font-semibold flex justify-between items-center mb-6">
              <span className="text-2xl text-white">Personal Details</span>
              <NavLink
                to="/user-profile/add-profile"
                className="bg-red-500 py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300 text-[18px] "
                state={userDBData}
              >
                Edit Profile
              </NavLink>
            </div>

            <ul className="grid grid-cols-2 gap-6">
              <li className="p-4 bg-[#2e2e44] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                <span className="text-[18px] font-semibold text-[#b08fff]">
                  Full Name
                </span>
                <p className="text-gray-300 text-[16px]">{userDBData?.name}</p>
              </li>

              <li className="p-4 bg-[#2e2e44] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                <span className="text-[18px] font-semibold text-[#b08fff]">
                  Gender
                </span>
                <p className="text-gray-300 text-[16px]">
                  {userDBData?.gender}
                </p>
              </li>

              <li className="p-4 bg-[#2e2e44] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                <span className="text-[18px] font-semibold text-[#b08fff]">
                  Date of Birth
                </span>
                <p className="text-gray-300 text-[16px]">{userDBData?.dob}</p>
              </li>

              <li className="p-4 bg-[#2e2e44] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                <span className="text-[18px] font-semibold text-[#b08fff]">
                  Age
                </span>
                <p className="text-gray-300 text-[16px]">{userDBData?.dob}</p>
              </li>

              <li className="p-4 bg-[#2e2e44] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                <span className="text-[18px] font-semibold text-[#b08fff]">
                  Address
                </span>
                <p className="text-gray-300 text-[16px]">
                  {userDBData?.address}
                </p>
              </li>

              <li className="p-4 bg-[#2e2e44] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300">
                <span className="text-[18px] font-semibold text-[#b08fff]">
                  Contact
                </span>
                <p className="text-gray-300 text-[16px]">
                  {userDBData?.contact}
                </p>
              </li>

              <li className="p-4 bg-[#2e2e44] rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition duration-300 col-span-2">
                <span className="text-[18px] font-semibold text-[#b08fff]">
                  Languages
                </span>
                <p className="text-gray-300 text-[16px]">
                  {userDBData?.languages?.map((el) => `#${el}`).join(", ")}
                </p>
              </li>
            </ul>
          </main>
        )}
      </article>
    </section>
  );
};

export default MyAccount;
