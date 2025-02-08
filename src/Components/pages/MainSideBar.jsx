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

const MainSideBar = (props) => {


  let { toggle, handleSideBarToggle } = props;
  return (
    <section className="basis-[16%] bg-[#181818] pt-[48px] pb-[32px] pl-[64px] pr-[32px] border-r-[2px] border-[#EE10B0]">
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
                  to={"/discover"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <IoCompassOutline />
                  </span>
                  <span>Discover</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/albums"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <MdOutlineAlbum />
                  </span>
                  <span>Albums</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/artists"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <FaUsers />
                  </span>
                  <span>Artists</span>
                </NavLink>
              </li>
            </ul>
          </main>
        </div>
        {/* Library */}
        <div>
          <header className="text-[#EE10B0] text-[12px] font-[300]">
            Library
          </header>
          <main>
            <ul>
              <li>
                <NavLink
                  to={"recently-added"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <MdOutlineAccessTime />
                  </span>
                  <span>Recently Added</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"#"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] w-[158px] sidebarliHover"
                  }
                >
                  <span>
                    <CgTimelapse />
                  </span>
                  <span>Most Played</span>
                </NavLink>
              </li>
            </ul>
          </main>
        </div>

        {/* PlayList and favourites */}

        <div>
          <header className="text-[#EE10B0] text-[12px] font-[300]">
            Playlist and Favourite
          </header>
          <main>
            <ul>
              <li>
                <NavLink
                  to={"/your-favourite"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <FaRegHeart />
                  </span>
                  <span>Your Favourite</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/your-playlist"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] w-[158px] sidebarliHover"
                  }
                >
                  <span>
                    <RiPlayListFill />
                  </span>
                  <span>Your Playlist</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/add-playlist"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] w-[158px]  text-[#0E9EEF]"
                  }
                >
                  <span>
                    <TbPlaylistAdd />
                  </span>
                  <span>Add Playlist</span>
                </NavLink>
              </li>
            </ul>
          </main>
        </div>

        {/* general */}

        <div>
          <header className="text-[#EE10B0] text-[12px] font-[300]">
            general
          </header>
          <main>
            <ul>
              <li>
                <NavLink
                  to={"/setting"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] sidebarliHover"
                  }
                >
                  <span>
                    <IoMdSettings />
                  </span>
                  <span>Setting</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"/logout"}
                  className={
                    "flex items-center gap-[8px]  font-[500] h-[40px] w-[158px] text-[#EE10B0]"
                  }
                >
                  <span>
                    <TbLogout />
                  </span>
                  <span className=" ">Logout</span>
                </NavLink>
              </li>
            </ul>
          </main>
        </div>
      </article>
    </section>
  );
};

export default MainSideBar;
