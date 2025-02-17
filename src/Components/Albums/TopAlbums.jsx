import React, { useContext } from "react";
import { AlbumContextApi } from "../Context/AlbumContext";
import { all } from "axios";
import { NavLink } from "react-router-dom";

const TopAlbums = () => {
  let { allAlbums } = useContext(AlbumContextApi);
  console.log(allAlbums);

  return (
    <section className=" py-12 px-[10px] ">
      <article>
        <header className="">
          <h1 className="text-[32px] font-[700] p-[10px]">
            Top <span className="text-[#EE10B0]">Albums</span>
          </h1>
        </header>

        <main className="">
          {allAlbums?.map((album, ind) => {
            return (
              <NavLink
                to={`album-details/${album?.albumTitle.split(" ")}`}
                state={{ album, ind }}
                key={ind}
              >
                <div className="h-[222px] w-[174px] rounded-[8px] p-[8px] bg-[#1F1F1F]      shadow-md shadow-black/50 hover:shadow-lg hover:shadow-black/70 transition-all duration-300">
                  <header>
                    <picture>
                      <img
                        src={album?.albumPoster}
                        alt=""
                        className="w-[158px] h-[150px] rounded-[8px]"
                      />
                    </picture>
                  </header>
                  <footer>
                    <h1 className="16px font-[500] leading-8">
                      {album?.albumTitle}
                    </h1>
                    <p className="text-[12px] font-[300]">{album?.albumType}</p>
                  </footer>
                </div>
              </NavLink>
            );
          })}
        </main>
      </article>
    </section>
  );
};

export default TopAlbums;
