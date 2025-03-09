import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContextApi } from "../Context/UserContext";
import { Link } from "react-scroll";

const Menu = () => {
  let { userDBData } = useContext(UserContextApi);

  return (
    <div className="h-[25px] w-[335px]">
      <ul className="flex items-center gap-10">
        <li>
          <Link
            to="aboutUs"
            smooth={true}
            duration={500}
            className="cursor-pointer"
          >
            About us
          </Link>{" "}
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
