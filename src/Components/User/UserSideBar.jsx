import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { IoCompassOutline } from "react-icons/io5";
import {
  MdDeleteForever,
  MdOutlineAccessTime,
  MdOutlineAccountBalanceWallet,
  MdOutlineAlbum,
} from "react-icons/md";
import { FaRegHeart, FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { TbLogout, TbPlaylistAdd } from "react-icons/tb";
import { CgTimelapse } from "react-icons/cg";
import { RiPlayListFill } from "react-icons/ri";
import { ImFilePicture } from "react-icons/im";

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
            <ul className="flex flex-col gap-[5px]">
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
                  style={({ isActive }) =>
                    isActive
                      ? {
                          background: "#EE10B0",
                          fontSize: "16px",
                          padding: "2px 6px",
                          borderRadius: "9px",
                          fontWeight: "600",
                        }
                      : {}
                  }
                  to={"/user-profile"}
                  end
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <MdOutlineAccountBalanceWallet />
                  </span>
                  <span>My Account</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"update-picture"}
                  style={({ isActive }) =>
                    isActive
                      ? {
                          background: "#EE10B0",
                          fontSize: "16px",
                          padding: "2px 6px",
                          borderRadius: "9px",
                          fontWeight: "600",
                        }
                      : {}
                  }
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <ImFilePicture />
                  </span>
                  <span>Update Picture </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? {
                          background: "#EE10B0",
                          fontSize: "16px",
                          padding: "2px 6px",
                          borderRadius: "9px",
                          fontWeight: "600",
                        }
                      : {}
                  }
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
                  style={({ isActive }) =>
                    isActive
                      ? {
                          background: "#EE10B0",
                          fontSize: "16px",
                          padding: "2px 6px",
                          borderRadius: "9px",
                          fontWeight: "600",
                        }
                      : {}
                  }
                  to={"delete-account"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] text-red-700  sidebarliHover"
                  }
                >
                  <span>
                    <MdDeleteForever />
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
