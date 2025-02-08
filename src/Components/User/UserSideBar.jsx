import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { IoCompassOutline } from "react-icons/io5";
import { MdOutlineAccessTime, MdOutlineAlbum } from "react-icons/md";
import { FaRegHeart, FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout, TbPlaylistAdd } from "react-icons/tb";
import { CgTimelapse } from "react-icons/cg";
import { RiPlayListFill } from "react-icons/ri";

const UserSideBar = (props) => {
  let { toggle, handleSideBarToggle } = props;
  return (
    <section className="basis-[16%] h-[100vh] bg-[#181818] pt-[48px] pb-[32px] pl-[64px] pr-[32px] border-r-[2px] border-[#EE10B0]">
      <header>
        <img src="src/assets/images/sideBarImages/Frame 174.png" alt="" />
      </header>

      <article className="flex flex-col gap-[10px]">
        <div className="flex gap-[10px] flex-col">
          <header className="text-[#EE10B0] text-[12px] font-[300]">
            Menu
          </header>
          <main>
            <ul>
              <li>
                <NavLink
                  to={"/"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <IoHomeOutline />
                  </span>
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/user-profile"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <IoCompassOutline />
                  </span>
                  <span>My Account</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"update-picture"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <MdOutlineAlbum />
                  </span>
                  <span>Update Picture </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"add-profile"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <FaUsers />
                  </span>
                  <span>Add Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"delete-account"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <FaUsers />
                  </span>
                  <span>Delete Account</span>
                </NavLink>
              </li>
            </ul>
          </main>
        </div>
      </article>
    </section>
  );
};

export default UserSideBar;
