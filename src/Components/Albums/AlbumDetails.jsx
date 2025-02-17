import React, { useContext, useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import MYAudioPlayer from "../utility/MYAudioPlayer";
import { SongContextApi } from "../Context/SongPlayerContext";

const AlbumDetails = () => {
  let albumData = useLocation();
  let album = albumData.state.album;

  let initialSongState = {
    src: "",
    thumnail: "",
    songname: "",
  };

  let [selectedSong, setSelectedSong] = useState(initialSongState);
  let [currentSongIndex, setCurrentSongIndex] = useState(null);
  let { isPlayingContext, setIsPlayingContext } = useContext(SongContextApi);

  let handlePlaySong = (Songsrc, Songthumbnail, SONGsongname, ind) => {
    setSelectedSong({
      src: Songsrc,
      thumnail: Songthumbnail,
      songname: SONGsongname,
    });
    setCurrentSongIndex(ind);
    setIsPlayingContext(true);
  };

  let handlePauseSong = () => {
    setIsPlayingContext(false);
    setSelectedSong(initialSongState);
    setCurrentSongIndex(null);
  };

  useEffect(() => {
    console.log(selectedSong);
  }, [currentSongIndex]);

  return (
    <section className="bg-[#181818] rounded-[10px]">
      <article className="relative">
        <header className="h-[350px] w-[96%] p-4 flex rounded-[10px] shadow-lg shadow-[#0f0e0e] relative">
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
                      key={ind}
                      className="w-full h-[50px] bg-[#232323] shadow-lg shadow-[#0f0e0e] hover:scale-[1.01] transition-all ease-in-out duration-500 cursor-pointer"
                    >
                      <td className="text-center rounded-tl-[10px] rounded-bl-[10px]">
                        {ind + 1}
                      </td>
                      <td className="flex items-center gap-x-6 pl-10">
                        <span className="relative">
                          {isPlayingContext && currentSongIndex === ind ? (
                            <FaPause
                              className="absolute left-[40px] top-[-10px] text-[20px] shadow-md shadow-black"
                              onClick={handlePauseSong}
                            />
                          ) : (
                            <FaPlay
                              className="absolute left-[40px] top-[-10px] text-[20px] shadow-md shadow-black"
                              onClick={() => {
                                handlePlaySong(
                                  song?.songUrl,
                                  song?.thumbnail,
                                  song?.songName,
                                  ind
                                );
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
      {isPlayingContext && (
        <MYAudioPlayer
          key={selectedSong.src} // Add this line
          src={selectedSong.src}
          title={selectedSong.songname}
          thumbnail={selectedSong.thumnail}
          Playing={isPlayingContext}
        />
      )}
    </section>
  );
};

export default AlbumDetails;
