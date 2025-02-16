import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import logoIMg from "../../assets/images/sideBarImages/Frame 174.png";

import { RiDashboard2Line, RiPlayListFill } from "react-icons/ri";

import { LuDiscAlbum } from "react-icons/lu";

const AdminSideBar = () => {
  return (
    <section className="basis-[16%] h-[100vh] bg-[#181818] pt-[48px] pb-[32px] pl-[64px] pr-[32px] border-r-[2px] border-[#EE10B0] sticky top-0  ">
      <header>
        <img src={logoIMg} alt="" />
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
                  to={"/admin-dashboard"}
                  end
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <RiDashboard2Line />
                  </span>
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"create-album"}
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
                    <LuDiscAlbum />
                  </span>
                  <span>Create Album</span>
                </NavLink>
              </li>
            </ul>
          </main>
        </div>
      </article>
    </section>
  );
};

export default AdminSideBar;
