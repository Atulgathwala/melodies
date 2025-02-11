import React from "react";
import NavbarConatiner from "../NavbarComponents/NavbarConatiner";
import UserSideBar from "./UserSideBar";
import { Outlet } from "react-router-dom";

const UserMainContainer = () => {
  return (
    <div className="bg-[#181818] flex ">
      <aside className="basis-[17%]">
        <UserSideBar />
      </aside>
      <aside className="basis-[83%] p-10">
        <div className=" m-auto pt-2">
          <NavbarConatiner />
        </div>
        <Outlet />
      </aside>
    </div>
  );
};

export default UserMainContainer;
