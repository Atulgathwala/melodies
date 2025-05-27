import React, { useContext } from "react";
import { AlbumContextApi } from "../Context/AlbumContext";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaPlayCircle } from "react-icons/fa";
import { SongContextApi } from "../Context/SongPlayerContext";
import MYAudioPlayer from "../utility/MYAudioPlayer";

const NewReleases = () => {
  let { allAlbums, allSongs } = useContext(AlbumContextApi);
  let { isPlaying, setIsPlaying, songs, setSongs, songIndex, setSongIndex } =
    useContext(SongContextApi);

 

  return (
    <section className="py-3 px-[10px] w-[80vw]">
      <article>
        <header>
          <h1 className="text-[32px] font-[700] p-[10px]">
            New <span className="text-[#EE10B0]">Releases</span>
          </h1>
        </header>

        <main className="">
          <Swiper
            slidesPerView={6} // Shows 6 cards at a time
            spaceBetween={15} // Adjusts space between cards
            navigation={true} // Adds navigation arrows
            modules={[Navigation]} // Enables navigation module
            className="mySwiper"
          >
            {allSongs?.map((song, ind) => (
              <SwiperSlide key={ind}>
                <NavLink className={"w-[174px]"}>
                  <div className="h-[222px] w-[174px] rounded-[8px] p-[8px] bg-[#1F1F1F] shadow-md shadow-black/50 hover:shadow-lg hover:shadow-black/70 transition-all duration-300 group relative">
                    <div className="h-[150px] w-[158px] bg-[#000000ae] absolute top-2 opacity-0 group-hover:opacity-400 flex justify-center items-center transition-all duration-500">
                      <FaPlayCircle
                        className="text-[40px] text-white"
                        onClick={() => {
                          setSongs(allSongs);
                          setSongIndex(ind);
                          setIsPlaying(true);
                        }}
                      />
                    </div>
                    <header>
                      <picture>
                        <img
                          src={song?.thumbnail}
                          alt={song?.songName}
                          className="w-[158px] h-[150px] rounded-[8px]"
                        />
                      </picture>
                    </header>
                    <footer>
                      <h1 className="text-[16px] font-[500] leading-8">
                        {song?.songName}
                      </h1>
                      <p className="text-[12px] font-[300]">{song?.singers}</p>
                    </footer>
                  </div>
                </NavLink>
              </SwiperSlide>
              
            ))}

             <SwiperSlide>
                          <section className="h-[175px] w-[150px] flex flex-col gap-1 justify-center items-center cursor-pointer">
                            <div className="h-[65px] w-[65px] flex  items-center justify-center rounded-full p-[8px] bg-[#1F1F1F] shadow-md shadow-black/50 hover:shadow-lg hover:shadow-black/70 transition-all duration-300  ">
                              <span className="text-white text-lg font-bold text-[32px] flex justify-center items-center pb-1">
                                +
                              </span>
                            </div>
                            <span>View All</span>
                          </section>
                        </SwiperSlide>
          </Swiper>
        </main>
      </article>
      {songIndex !== null && (
        <MYAudioPlayer
          key={songs[songIndex]}
          src={songs[songIndex]?.songUrl}
          songsAlbum={songs}
          index={songIndex}
        />
      )}
    </section>
  );
};

export default NewReleases;
