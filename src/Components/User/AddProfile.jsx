import React, { useContext, useEffect, useState } from "react";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaAddressBook, FaPhoneAlt, FaUser } from "react-icons/fa";

import ALLCOUNTRIESJSON from "./ALLCountries.json";
import ALLCitiesJSON from "./cities.json";
import ALLSTATESJSON from "./StatesData.json";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { AUTHContextAPI } from "../Context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { __DB } from "../../backend/firebase";
import Spinner from "../utility/Spinner/Spinner";
import { UserContextApi } from "../Context/UserContext";
import { useLocation } from "react-router-dom";

const AddProfile = () => {
  let [countires, setCountries] = useState(ALLCOUNTRIESJSON);
  let [AllStates, setAllStates] = useState(ALLSTATESJSON);
  let [AllCities, setAllcities] = useState(ALLCitiesJSON);
  let [filteredState, setFilteredState] = useState([]);
  let [filteredCities, setFilteredCities] = useState([]);
  let { authUser } = useContext(AUTHContextAPI);
  let [isLoading, setIsloading] = useState(false);
  let location = useLocation();

  let [initialUpdatingData, setInitialUpodatingData] = useState(null);

  let { userDBData } = useContext(UserContextApi);

  console.log("hiii",  location?.state?.gender);

  let initialUserState = {
    name: location?.state?.name || "",
    dob: location?.state?.dob || "",

    gender: location?.state?.gender || "",
    contact: location?.state?.contact || "",
    role: "user",
    address: location?.state?.address || "",
    country: location?.state?.country || "",
    city: location?.state?.city || "",
    locstate: location?.state?.locstate || "",
    languages: location?.state?.languages || [],
    language: "",
    favourites: [],
    playlist: [],
    isSubscribed: false,
    Balance: 100,
  };
  let [userData, setUserData] = useState(initialUserState);

  let { email, photoURL, displayName, uid } = authUser || {};

  let {
    name,
    dob,
    gender,
    favourites,
    playlist,
    isSubscribed,
    Balance,

    contact,
    language,
    address,
    country,
    city,
    role,
    locstate,
    languages,
  } = userData;

  useEffect(() => {
    if (country && AllStates[country.toLocaleLowerCase()]) {
      // setAllStates(AllStates[country.toLocaleLowerCase()]);

      setFilteredState(AllStates[country.toLowerCase()]);
    }
  }, [country]);

  useEffect(() => {
    if (locstate && AllCities[locstate.toLowerCase()]) {
      setFilteredCities(AllCities[locstate.toLowerCase()]);
    }
  }, [locstate]);

  useEffect(() => {
    if (userDBData) {
      setInitialUpodatingData(userDBData);
    }
  }, [userDBData]);

  let handleChange = (e) => {
    let { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  let handleLanguagesChange = (e) => {
    setUserData({ ...userData, language: e.target.value });
  };

  let handleKeyDOwnChange = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      let lang = e.target.value.trim();

      if (lang && !userData.languages.includes(lang)) {
        setUserData((prevState) => ({
          ...prevState,
          languages: [...prevState.languages, lang],
          language: "",
        }));
      }
    }
  };

  let handleRemoveLanguage = (ind) => {
    setUserData((prevState) => ({
      ...prevState,
      languages: prevState.languages.filter((el, i) => i != ind),
    }));
  };

  // let handle SUbmit

  let payLoad = {
    name,
    gender,
    contact,
    role,
    address,
    gender,
    country,
    city,
    dob,
    languages,
    locstate,
    favourites,
    playlist,
    isSubscribed,
    Balance,
  };

  let handlesubmit = async (e) => {
    e.preventDefault();
    console.log(uid);

    if (uid) {
      setIsloading(true);
      try {
        let user_Profile_Collection = doc(__DB, "user_profiles", uid);
        await setDoc(user_Profile_Collection, {
          ...payLoad,
          email,
          uid,
          displayName,
          photoURL,
        });

        setUserData(initialUserState);

        toast.success("Data Uploaded Successfully");
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    }

    toast.success("data Saved Successfully");
  };

  return (
    <section className=" w-[100%] min-h-[100vh] flex justify-center p-6">
      <article className="bg-[#1f1f2e] w-[800px] p-4 rounded-sm">
        <header>
          <h1 className="text-[32px] text-center ">Add Profile</h1>
        </header>
        <hr className="my-4" />
        <main>
          <form action="" onSubmit={handlesubmit}>
            <article className=" flex justify-between w-[100%] py-2">
              <div className="basis-[49%] ">
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
                    name="name"
                    onChange={handleChange}
                    value={name}
                  />
                </div>
              </div>
              {/* Dob */}
              <div className="basis-[49%]  ">
                <label htmlFor="name" className="block font-[500] py-2">
                  Date of Birth
                </label>
                <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <span className="text-[28px]">
                    <BsCalendar2DateFill />
                  </span>
                  <input
                    type="date"
                    placeholder=""
                    className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                    name="dob"
                    value={dob}
                    onChange={handleChange}
                    onClick={(e) => {
                      e.target.showPicker();
                    }}
                  />
                </div>
              </div>
            </article>
            <article className=" flex justify-between w-[100%] py-2">
              <div className="basis-[49%] ">
                <label htmlFor="name" className="block font-[500] py-2">
                  Gender
                </label>
                <div
                  className="py-[8px]   pl-[8px] pr-[4px] flex items-center gap-4 rounded-[7px]"
                  name="gender"
                  value={gender}
                >
                  <div>
                    <input
                      type="radio"
                      placeholder=""
                      className="transform:"
                      name="gender"
                      onChange={handleChange}
                      value={"male"}
                      checked={gender == "male"}
                    />
                    <span> Male</span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      placeholder=""
                      className="   "
                      name="gender"
                      onChange={handleChange}
                      value={"female"}
                      checked={gender == "female"}
                    />
                    <span> Female</span>
                  </div>
                  <div>
                    <input
                      type="radio"
                      placeholder=""
                      className="   "
                      value={"others"}
                      name="gender"
                      checked={gender == "others"}
                      onChange={handleChange}
                    />
                    <span> Others</span>
                  </div>
                </div>
              </div>
              {/* Dob */}
              <div className="basis-[49%]  ">
                <label htmlFor="name" className="block font-[500] py-2">
                  Contact
                </label>
                <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <span className="text-[28px]">
                    <FaPhoneAlt />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Contact "
                    className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                    name="contact"
                    value={contact}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </article>
            {/* Address Section */}
            <article className=" flex justify-between w-[100%] py-2">
              <div className="basis-[100%]  ">
                <label htmlFor="name" className="block font-[500] py-2">
                  Address
                </label>
                <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <span className="text-[28px]">
                    <FaAddressBook />
                  </span>
                  <input
                    type="text"
                    placeholder="Enter Address "
                    className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                    name="address"
                    value={address}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </article>
            {/* city state lanaguge Section */}
            <article className=" flex justify-between w-[100%] py-2">
              <div className="basis-[32%] ">
                <label htmlFor="name" className="block font-[500] py-2">
                  Country
                </label>
                <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="text"
                    placeholder="Enter Your Country"
                    className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                    name="country"
                    value={country}
                    onChange={handleChange}
                    list="countries"
                  />
                  <datalist id="countries">
                    {countires?.map((cont, ind) => {
                      return (
                        <option key={ind} value={cont}>
                          {cont}
                        </option>
                      );
                    })}
                  </datalist>
                </div>
              </div>
              <div className="basis-[32%] ">
                <label htmlFor="name" className="block font-[500] py-2">
                  State
                </label>
                <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="text"
                    placeholder="Enter Your State"
                    className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                    name="locstate"
                    value={locstate}
                    onChange={handleChange}
                    list="STATES"
                  />
                  <datalist id="STATES">
                    {filteredState?.map((state, ind) => {
                      return (
                        <option key={ind} value={state}>
                          {state}
                        </option>
                      );
                    })}
                  </datalist>
                </div>
              </div>
              <div className="basis-[32%] ">
                <label htmlFor="name" className="block font-[500] py-2">
                  City
                </label>
                <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="text"
                    placeholder="Enter Your City"
                    className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                    name="city"
                    value={city}
                    onChange={handleChange}
                    list="CITY"
                  />
                  <datalist id="CITY">
                    {filteredCities?.map((city, ind) => {
                      return (
                        <option key={ind} value={city}>
                          {city}
                        </option>
                      );
                    })}
                  </datalist>
                </div>
              </div>
            </article>

            <article>
              <div className="basis-[32%] ">
                <label htmlFor="name" className="block font-[500] py-2">
                  Languages
                </label>
                <div className="py-[8px] border-[2px] border-[#D9D9D9]  pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="text"
                    placeholder="Enter Langauges ..."
                    className="  h-[24px] py-4 px-[5px] w-[100%] outline-none "
                    name="language"
                    value={language}
                    onChange={handleLanguagesChange}
                    onKeyDown={handleKeyDOwnChange}
                  />
                </div>

                <div className="py-2">
                  {languages?.map((el, ind) => {
                    return (
                      <span className="relative" key={ind}>
                        <span
                          className="bg-red-500 pl-2 pr-5  py-1 m-1 rounded-[9px] "
                          key={ind}
                        >
                          {el}
                        </span>
                        <span className="absolute top-[3px]  right-[5px] cursor-pointer">
                          <IoClose
                            className="font-[900]"
                            onClick={() => {
                              handleRemoveLanguage(ind);
                            }}
                          />
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>

              <footer className="py-6">
                <button className="py-2 bg-red-700 px-4 w-full rounded-md cursor-pointer">
                  Submit
                </button>
              </footer>
            </article>
          </form>
        </main>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default AddProfile;
