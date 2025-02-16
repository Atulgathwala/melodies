import React, { useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import AudioPlayer from "../utility/Spinner/AudioPlayer";

const AlbumDetails = () => {
    let albumData = useLocation();
    let album = albumData.state.album

  let initialSongState = {
    src: "",
    thumnail: "",
    songname: "",
  };
  let [selectedSong, setSelectedSong] = useState(initialSongState);
  let [isPlaying, setIsPlaying] = useState(true);

  let handlePlaySong = (Songsrc, Songthumbnail, SONGsongname) => {
    setSelectedSong({
      src: Songsrc,
      thumnail: Songthumbnail,
      songname: SONGsongname,
    });
    setIsPlaying(true);
    console.log(selectedSong);
  };

  let handlePauseSong = () => {
    setIsPlaying(false);
    setSelectedSong(initialSongState);
  };

  return (
    <section className=" bg-[#181818] rounded-[10px]">
      <article className="relative">
        <header className="bg-[#232323] h-[350px] w-[96%] p-4 flex rounded-[10px] shadow-lg shadow-[#0f0e0e] relative">
          <aside className=" basis-[30%] flex justify-center items-center relative">
            <img
              src={album?.albumPoster}
              alt=""
              className="w-[300px] h-[300px] rounded-[9px]  "
            />
            <span className="absolute bg-[#EE10B0] text-[12px] rounded-[4px] p-[2px] flex items-center top-0 right-3 shadow-sm shadow-[#373737]">
              #Top
              <span className="text-[16px] font-[600]">
                {albumData.state.ind + 1}
              </span>
            </span>
          </aside>
          <aside className="  flex items-center">
            <main className="h-[290px] ">
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
                  <span className="text-[14px] ">
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
                <p className="w-[700px] flex py-2 ">
                  <p className="">
                    <span className="font-[600] ">Description :</span>
                    {album?.description}
                  </p>
                </p>
              </header>
            </main>
          </aside>
        </header>

        <main className=" w-[96%] mt-[5vh]">
          <header className="">
            <h1 className="text-[24px] font-[600] py-2">
              All <span className="text-[#EE10B0]">Songs</span>
            </h1>
          </header>
          <main className="">
            <table className=" w-full border-separate border-spacing-y-4 ">
              <tr className="w-full  h-[50px] bg-[#232323] shadow-lg shadow-[#0f0e0e]  ">
                <th className="w-[70px] rounded-tl-[10px] rounded-bl-[10px]">
                  #
                </th>
                <th className="w-[500px] ">Song</th>
                <th className="w-[500px] ">Singers</th>
                <th className="  w-[300px]">Music Director</th>
                <th className="w-[300px] rounded-tr-[10px] rounded-br-[10px] ">
                  Duration
                </th>
              </tr>
              {album?.songs?.map((song, ind) => {
                return (
                  <tr className="w-full  h-[50px] bg-[#232323] shadow-lg shadow-[#0f0e0e] hover:tranform hover:scale-[1.01] transition-all ease-in-out duration-500  cursor-pointer ">
                    <td className="text-center rounded-tl-[10px] rounded-bl-[10px]">
                      {ind + 1}
                    </td>
                    <td className="flex items-center gap-x-6 pl-10 ">
                      <span>
                        <span className="relative">
                          {isPlaying ? (
                            <FaPause
                              className="absolute right-[-35px] top-3.5 text-[20px] shadow-md shadow-black"
                              onClick={handlePauseSong}
                            />
                          ) : (
                            <FaPlay
                              className="absolute right-[-35px] top-3.5 text-[20px] shadow-md shadow-black"
                              onClick={() => {
                                handlePlaySong(
                                  song?.songUrl,
                                  song?.thumbnail,
                                  song?.songName
                                );
                              }}
                            />
                          )}{" "}
                        </span>
                        <img
                          src={song?.thumbnail}
                          alt=""
                          className="h-[48px] "
                        />
                      </span>{" "}
                      <span>{song?.songName}</span>
                    </td>
                    <td className="text-center">{song?.singers}</td>
                    <td className="text-center">{song?.musicDirector}</td>
                    <td className="text-center  rounded-tr-[10px] rounded-br-[10px]">
                      3.34
                    </td>
                  </tr>
                );
              })}
            </table>
          </main>
        </main>
      </article>
      {isPlaying && (
        <AudioPlayer
          src={selectedSong.src}
          title={selectedSong.songname}
          thumbnail={selectedSong.thumnail}
        />
      )}
    </section>
  );
};

export default AlbumDetails;
