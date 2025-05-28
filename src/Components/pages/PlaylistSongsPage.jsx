import React, { useContext, useEffect, useState } from "react";
import { FaPause, FaPlay, FaHeart } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { SongContextApi } from "../Context/SongPlayerContext";
import { AlbumContextApi } from "../Context/AlbumContext";
import MYAudioPlayer from "../utility/MYAudioPlayer";
import toast from "react-hot-toast";

const PlaylistSongsPage = () => {
  const location = useLocation();
  const playlist = location.state?.playlist;

  const { isPlaying, setIsPlaying, songs, setSongs, songIndex, setSongIndex } =
    useContext(SongContextApi);

  const { likeOrUnlikeSong, likedSongs } = useContext(AlbumContextApi);

  const handlePauseSong = () => {
    setIsPlaying(false);
    setSongIndex(null);
  };

  const handleLikeSong = (song) => {
    likeOrUnlikeSong(song);
    toast.success("Updated liked songs!");
  };

  const isSongLiked = (songId) => {
    return likedSongs.some((s) => s.id === songId);
  };

  return (
    <section className="bg-[#181818] rounded-[10px]">
      <header className="p-4">
        <h1 className="text-[28px] font-bold text-white">
          Playlist: <span className="text-[#EE10B0]">{playlist?.name}</span>
        </h1>
        <p className="text-sm text-gray-400">{playlist?.songs?.length} songs</p>
      </header>

      {/* Songs List */}
      <main className="w-[96%] mt-[5vh] mb-[10vh]">
        <h1 className="text-[24px] font-[600] py-2 text-white">
          Songs in <span className="text-[#EE10B0]">{playlist?.name}</span>
        </h1>

        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="w-full h-[50px] bg-[#232323] shadow-lg shadow-[#0f0e0e]">
              <th className="w-[70px] rounded-tl-[10px] rounded-bl-[10px]">
                #
              </th>
              <th className="w-[500px]">Song</th>
              <th>Singers</th>
              <th>Music Director</th>
              <th>Duration</th>
              <th className="rounded-tr-[10px] rounded-br-[10px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {playlist?.songs?.map((song, ind) => (
              <tr
                key={ind}
                onClick={() => {
                  setSongs(playlist?.songs);
                  setSongIndex(ind);
                  setIsPlaying(true);
                }}
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
                          e.stopPropagation();
                          handlePauseSong();
                        }}
                      />
                    ) : (
                      <FaPlay
                        className="absolute left-[40px] top-[-10px] text-[20px] shadow-md shadow-black"
                        onClick={(e) => {
                          e.stopPropagation();
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
                <td className="text-center">3.34</td>
                <td className="flex justify-center items-center gap-4 text-lg">
                  {isSongLiked(song.id) ? (
                    <FaHeart
                      className="text-[#EE10B0] cursor-pointer"
                      title="Unlike"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeSong(song);
                      }}
                    />
                  ) : (
                    <FaHeart
                      className="hover:text-[#EE10B0] cursor-pointer"
                      title="Like"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikeSong(song);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      {/* Audio Player */}
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

export default PlaylistSongsPage;
