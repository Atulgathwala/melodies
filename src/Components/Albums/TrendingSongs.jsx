import React, { useContext } from "react";
import { AlbumContextApi } from "../Context/AlbumContext";
import { FaPause, FaPlay, FaPlus } from "react-icons/fa";
import { SongContextApi } from "../Context/SongPlayerContext";
import { NavLink } from "react-router-dom";

const TrendingSongs = () => {
  let { randomSongs } = useContext(AlbumContextApi);
  let handlePauseSong = () => {
    setIsPlaying(false);

    setSongIndex(null);
  };

  let { isPlaying, setIsPlaying, setSongs, songIndex, setSongIndex } =
    useContext(SongContextApi);

  return (
    <section className="w-[100%] px-[10px] ">
      <main className="w-[96%] mt-[5vh] mb-[2vh]">
        <header>
          <h1 className="text-[32px] font-[700] p-[10px]">
            New <span className="text-[#EE10B0]">Releases</span>
          </h1>
        </header>
        <main>
          <table className="w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="w-full h-[50px] bg-[#232323] shadow-lg shadow-[#0f0e0e]">
                <th className="w-[70px] rounded-tl-[10px] rounded-bl-[10px]">
                  #
                </th>
                <th className="w-[500px]">Song</th>
                <th className="w-[500px]">Singers</th>
                <th className="w-[300px]">Music Director</th>
                <th className="w-[300px] rounded-tr-[10px] rounded-br-[10px]">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {randomSongs?.map((song, ind) => {
                return (
                  <tr
                    onClick={() => {
                      setSongs(randomSongs);
                      setSongIndex(ind);
                      setIsPlaying(true);
                    }}
                    key={ind}
                    className={`w-full h-[50px] bg-[#232323] shadow-lg shadow-[#0f0e0e]
              hover:scale-[1.01] transition-all ease-in-out duration-500 cursor-pointer
              ${isPlaying && songIndex === ind ? "playingGradient" : ""}`}
                  >
                    <td className="text-center rounded-tl-[10px] rounded-bl-[10px]">
                      #{ind + 1}
                    </td>
                    <td className="flex items-center gap-x-6 pl-10">
                      <span className="relative">
                        {isPlaying && songIndex === ind ? (
                          <FaPause
                            className="absolute left-[40px] top-[-10px] text-[20px] shadow-md shadow-black cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent row click event
                              handlePauseSong();
                            }}
                          />
                        ) : (
                          <FaPlay
                            className="absolute left-[40px] top-[-10px] text-[20px] shadow-md shadow-black"
                            onClick={() => {
                              setIsPlaying(true);
                            }}
                          />
                        )}
                      </span>
                      <img src={song?.thumbnail} alt="" className="h-[48px]" />
                      <span>{song?.songName}</span>
                    </td>
                    <td className="text-center">{song?.singers}</td>
                    <td className="text-center">{song?.musicDirector}</td>
                    <td className="text-center rounded-tr-[10px] rounded-br-[10px]">
                      3.34
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
        <div className="flex justify-center py-2">
          <NavLink className="bg-[#232323] shadow-lg shadow-[#0f0e0e] py-[4px] px-[16px] flex items-center gap-[10px] rounded-sm">
            <FaPlus /> <span>View All</span>
          </NavLink>
        </div>
      </main>
    </section>
  );
};

export default TrendingSongs;
