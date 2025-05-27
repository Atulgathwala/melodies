import React, { useState } from "react";
import ARTISTJSONDATA from "./ArtistsData.json";

const PopularArtist = () => {
  let [artist, setArtist] = useState(ARTISTJSONDATA);
  return (
    <section className="py-1 px-[10px] w-[80vw]">
      <article>
        <header>
          <h1 className="text-[32px] font-[700] p-[10px]">
            Popular <span className="text-[#EE10B0]">Artist</span>
          </h1>
        </header>
        <main className="flex gap-10">
          {artist.map((el, ind) => {
            return (
              <div
                key={ind}
                className="h-[180px] w-[135px]  flex flex-col justify-between items-center"
              >
                <img
                  src={el.src}
                  alt=""
                  className="h-[135px] w-[135px] rounded-full"
                />
                <p>{el.name}</p>
              </div>
            );
          })}
        </main>
      </article>
    </section>
  );
};

export default PopularArtist;
