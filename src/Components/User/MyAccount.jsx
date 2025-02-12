import React, { useContext } from "react";
import AuthContext, { AUTHContextAPI } from "../Context/AuthContext";
import { UserContextApi } from "../Context/UserContext";
import { NavLink } from "react-router-dom";
import coinImage from "../../assets/images/coin.png";

const MyAccount = () => {
  let { authUser } = useContext(AUTHContextAPI);
  let { userDBData } = useContext(UserContextApi);

  return (
    <section className="h-[100vh] w-[100%] flex items-center justify-center relative">
      <article className="bg-slate-300  w-[750px] absolute top-[10%] rounded-md shadow-lg shadow-purple-500/30 flex flex-col">
        <header className=" border border-black bg-gradient-to-r from-pink-500 to-blue-500 basis-[33%]  text-white text-lg font-semibold rounded-t-md flex items-center justify-between py-2 px-6 ">
          <div className="flex items-center gap-6 ">
            <aside>
              <img
                src={authUser?.photoURL}
                alt=""
                className="h-[125px] w-[125px] rounded-full"
              />
            </aside>
            <aside>
              <h1> {authUser?.displayName}</h1>
              <p>{authUser?.email}</p>
            </aside>
          </div>
          {/* coint div */}
          <div className="flex flex-col items-center justify-center ">
            <span>
              <img src={coinImage} alt="" className="h-[50px]" />
            </span>
            <span>
              {" "}
              <span className="font-[700]">M</span> Coins :{" "}
              {userDBData?.Balance || 0}
            </span>
          </div>
        </header>
        {!userDBData ? (
          <section className="p-10">
            <article className="flex flex-col items-center gap-[10px]">
              <header>
                <h1 className="text-[32px]">Please Complete Profile !!</h1>
              </header>

              <main>
                <img
                  src="https://i.ibb.co/sWh24k4/images-removebg-preview.png"
                  alt=""
                />
              </main>
              <footer>
                <NavLink
                  to="/user/profile/add-profile"
                  className="text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Go to Add Profile
                </NavLink>
              </footer>
            </article>
          </section>
        ) : (
          <main className="p-4 ">
            <div className="text-[20px] font-semibold text-center mb-8  flex justify-between">
              <span className="text-[26px] text-black"> Personal Details</span>
              <span>
                <NavLink
                  to="/user-profile/add-profile"
                  className="bg-red-500 py-[7px] px-[10px] rounded-[10px]"
                  state={userDBData}
                >
                  Edit Profile
                </NavLink>
              </span>
            </div>

            <ul className="grid grid-cols-2 gap-6">
              <li className="flex justify-between flex-col p-4 bg-[#464f5e] rounded-lg shadow-md">
                <span className="text-[25px] font-semibold text-[#78a4e6]">
                  Full Name
                </span>
                <p className="text-white">{userDBData?.name}</p>
              </li>

              {/* Gender Box */}
              <li className="flex justify-between flex-col p-4 bg-[#464f5e] rounded-lg shadow-md">
                <span className="text-[25px] font-semibold text-[#78a4e6]">
                  Gender
                </span>
                <p className="text-white">{userDBData?.gender}</p>
              </li>

              {/* Date of Birth Box */}
              <li className="flex justify-between flex-col p-4 bg-[#464f5e] rounded-lg shadow-md">
                <span className="text-[25px] font-semibold text-[#78a4e6]">
                  Date of Birth
                </span>
                <p className="text-white">{userDBData?.dob}</p>
              </li>

              {/* Age Box */}
              <li className="flex justify-between flex-col p-4 bg-[#464f5e] rounded-lg shadow-md">
                <span className="text-[25px] font-semibold text-[#78a4e6]">
                  Age
                </span>
                <p className="text-white">{userDBData?.dob}</p>
              </li>

              {/* Address Box */}
              <li className="flex justify-between flex-col p-4 bg-[#464f5e] rounded-lg shadow-md">
                <span className="text-[25px] font-semibold text-[#78a4e6]">
                  Address
                </span>
                <p className="text-white">{userDBData?.address}</p>
              </li>

              {/* Contact Box */}
              <li className="flex justify-between flex-col p-4 bg-[#464f5e] rounded-lg shadow-md">
                <span className="text-[25px] font-semibold text-[#78a4e6]">
                  Contact
                </span>
                <p className="text-white">{userDBData?.contact}</p>
              </li>

              {/* Languages Box - this takes the full width */}
              <li className="flex justify-between flex-col p-4 bg-[#464f5e] rounded-lg shadow-md col-span-2">
                <span className="text-[25px] font-semibold text-[#78a4e6]">
                  Languages
                </span>
                <p className="text-white">
                  {userDBData?.languages?.map((el) => {
                    return `#${el}  ,  `;
                  })}
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
