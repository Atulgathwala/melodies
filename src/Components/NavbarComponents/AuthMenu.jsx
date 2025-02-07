import React from "react";
import { NavLink } from "react-router-dom";

const AuthMenu = () => {
  return (
    <section>
      <ul className="flex gap-5">
        <li>
          <NavLink
            className={
              "py-[6px] px-[16px] rounded-[6px] border-[1px] border-[#EE10B0] text-[14px] w-[36px]"
            }
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            className={
              "py-[6px] px-[16px] rounded-[6px] bg-[#EE10B0] border-[1px] border-[#EE10B0] text-[14px]  w-[36px]"
            }
          >
            Sign up
          </NavLink>
        </li>
      </ul>
    </section>
  );
};

export default AuthMenu;
