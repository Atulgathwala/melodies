import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="h-[25px] w-[335px]">
      <ul className="flex justify-between">
        <li>
          <NavLink>About us</NavLink>
        </li>
        <li>
          <NavLink>Contact</NavLink>
        </li>
        <li>
          <NavLink>Premium</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
