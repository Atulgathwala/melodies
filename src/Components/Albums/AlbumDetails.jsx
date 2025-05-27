import React, { useContext } from "react";
import { FaPause, FaPlay, FaHeart, FaPlus } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import MYAudioPlayer from "../utility/MYAudioPlayer";
import { SongContextApi } from "../Context/SongPlayerContext";
import { AlbumContextApi } from "../Context/AlbumContext";

import { useState, useEffect } from "react";
import { __AUTH, __DB } from "../../backend/firebase";
import { getDocs, collection } from "firebase/firestore";
import toast from "react-hot-toast";

const AlbumDetails = () => {
  const albumData = useLocation();
  const album = albumData.state?.album;
  const [showDropdownIndex, setShowDropdownIndex] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);

  const { isPlaying, setIsPlaying, songs, setSongs, songIndex, setSongIndex } =
    useContext(SongContextApi);

  const { likeOrUnlikeSong, likedSongs, addSongToPlaylist } =
    useContext(AlbumContextApi);

  const handleLikeSong = (song) => {
    likeOrUnlikeSong(song);
  };

  const handlePauseSong = () => {
    setIsPlaying(false);
    setSongIndex(null);
  };

  const handleAddToPlaylist = async (playlistId, song) => {
    await addSongToPlaylist(playlistId, song);
    toast.success(`${song.songName} added to playlist`);
    setShowDropdownIndex(null);
  };

  const isSongLiked = (songId) => {
    return likedSongs.some((s) => s.id === songId);
  };

  useEffect(() => {
    const fetchPlaylists = async () => {
      const user = __AUTH.currentUser;
      if (!user) return;

      const snap = await getDocs(
        collection(__DB, "users", user.uid, "playlists")
      );
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUserPlaylists(data);
    };

    fetchPlaylists();
  }, []);

  return (
    <section className="bg-[#181818] rounded-[10px]">
      {/* Album Info */}
      <article className="relative">
        <header className="h-[350px] w-[96%] bg-[#232323] p-4 flex rounded-[10px] shadow-lg shadow-[#0f0e0e] relative">
          {/* Album Image */}
          <aside className="basis-[30%] flex justify-center items-center relative">
            <img
              src={album?.albumPoster}
              alt=""
              className="w-[300px] h-[300px] rounded-[9px]"
            />
            <span className="absolute bg-[#EE10B0] text-[12px] rounded-[4px] p-[2px] flex items-center top-0 right-3 shadow-sm shadow-[#373737]">
              #Top
              <span className="text-[16px] font-[600]">
                {albumData.state?.ind + 1}
              </span>
            </span>
          </aside>

          {/* Album Details */}
          <aside className="flex items-center">
            <main className="h-[290px]">
              <header>
                <p className="w-[700px] flex py-2">
                  <span className="font-[600]">
                    Description : {album?.description}
                  </span>
                </p>
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
                    {album?.languages.join(", ")}
                  </span>
                </p>
                <p className="py-1">
                  <span className="font-[600]">Album Type :</span>{" "}
                  <span className="text-[14px]">{album?.albumType}</span>
                </p>
              </header>
            </main>
          </aside>
        </header>

        {/* Songs List */}
        <main className="w-[96%] mt-[5vh] mb-[10vh]">
          <h1 className="text-[24px] font-[600] py-2">
            All <span className="text-[#EE10B0]">Songs</span>
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
              {album?.songs?.map((song, ind) => (
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

                    <div className="relative">
                      <FaPlus
                        className="hover:text-[#10EEA3] cursor-pointer"
                        title="Add to Playlist"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDropdownIndex(
                            ind === showDropdownIndex ? null : ind
                          );
                        }}
                      />

                      {showDropdownIndex === ind && (
                        <div className="absolute top-8 right-0 bg-[#2a2a2a] text-white text-sm rounded shadow-md w-[160px] z-10">
                          {userPlaylists.length === 0 ? (
                            <p className="p-2">No playlists found</p>
                          ) : (
                            userPlaylists.map((playlist) => (
                              <div
                                key={playlist.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToPlaylist(playlist.id, song);
                                }}
                                className="p-2 hover:bg-[#383838] cursor-pointer"
                              >
                                {playlist.name}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </article>

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

export default AlbumDetails;
