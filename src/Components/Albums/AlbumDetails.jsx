



import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import MYAudioPlayer from "../utility/MYAudioPlayer";
import { SongContextApi } from "../Context/SongPlayerContext";

const AlbumDetails = () => {
  let albumData = useLocation();
  let album = albumData.state.album;

  let { isPlaying, setIsPlaying, songs, setSongs, songIndex, setSongIndex } =
    useContext(SongContextApi);

  let handlePauseSong = () => {
    setIsPlaying(false);

    setSongIndex(null);
  };

  return (
    <section className="bg-[#181818] rounded-[10px]">
      <article className="relative">
        <header className="h-[350px] w-[96%] bg-[#232323] p-4 flex rounded-[10px] shadow-lg shadow-[#0f0e0e] relative">
          <aside className="basis-[30%] flex justify-center items-center relative">
            <img
              src={album?.albumPoster}
              alt=""
              className="w-[300px] h-[300px] rounded-[9px]"
            />
            <span className="absolute bg-[#EE10B0] text-[12px] rounded-[4px] p-[2px] flex items-center top-0 right-3 shadow-sm shadow-[#373737]">
              #Top
              <span className="text-[16px] font-[600]">
                {albumData.state.ind + 1}
              </span>
            </span>
          </aside>
          <aside className="flex items-center">
            <main className="h-[290px]">
              <header>
                <h1>
                  <span className="font-[600]">Title :</span>{" "}
                  <span className="text-[14px]">{album?.albumTitle}</span>
                </h1>
                <p className="py-1">
                  <span className="font-[600]">Release Date :</span>{" "}
                  <span className="text-[14px]">{album?.date}</span>
                </p>
                <p className="py-1">
                  <span className="font-[600]">Languages :</span>{" "}
                  <span className="text-[14px]">
                    {album?.languages.map((lng, ind) => {
                      return (
                        <span key={ind} className="mx-1">
                          {lng}
                        </span>
                      );
                    })}
                  </span>
                </p>
                <p className="py-1">
                  <span className="font-[600]">Album Type :</span>{" "}
                  <span className="text-[14px]">{album?.albumType}</span>
                </p>
                <p className="w-[700px] flex py-2">
                  <span className="font-[600]">Description :</span>
                  {album?.description}
                </p>
              </header>
            </main>
          </aside>
        </header>

        <main className="w-[96%] mt-[5vh] mb-[10vh]">
          <header>
            <h1 className="text-[24px] font-[600] py-2">
              All <span className="text-[#EE10B0]">Songs</span>
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
                {album?.songs?.map((song, ind) => {
                  return (
                    <tr
                      onClick={() => {
                        setSongs(album?.songs);
                        setSongIndex(ind);
                        setIsPlaying(true);
                      }}
                      key={ind}
                      className={`w-full h-[50px] bg-[#232323] shadow-lg shadow-[#0f0e0e] 
          hover:scale-[1.01] transition-all ease-in-out duration-500 cursor-pointer
          ${isPlaying && songIndex === ind ? "playingGradient" : ""}`}
                    >
                      <td className="text-center rounded-tl-[10px] rounded-bl-[10px]">
                        {ind + 1}
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
                        <img
                          src={song?.thumbnail}
                          alt=""
                          className="h-[48px]"
                        />
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

export default AlbumDetails;
