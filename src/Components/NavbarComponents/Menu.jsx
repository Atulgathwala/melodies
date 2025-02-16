import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext, { AUTHContextAPI } from "../Context/AuthContext";
import { UserContextApi } from "../Context/UserContext";

const Menu = () => {
  let { userDBData } = useContext(UserContextApi);

  return (
    <div className="h-[25px] w-[335px]">
      <ul className="flex items-center gap-10">
        <li>
          <NavLink>About us</NavLink>
        </li>
        <li>
          <NavLink>Contact</NavLink>
        </li>
        {userDBData?.role == "admin" && (
          <li>
            <NavLink to={"/admin-dashboard"} className="">
              Admin
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
