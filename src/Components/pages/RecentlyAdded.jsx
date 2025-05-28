import React, { useContext } from "react";
import { AlbumContextApi } from "../Context/AlbumContext";
import { SongContextApi } from "../Context/SongPlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";
import MYAudioPlayer from "../utility/MYAudioPlayer";

const RecentlyAdded = () => {
  const { allSongs } = useContext(AlbumContextApi);
  const { songs, setSongs, songIndex, setSongIndex, isPlaying, setIsPlaying } =
    useContext(SongContextApi);

  const handlePlayPause = (song) => {
    const indexInAll = allSongs.findIndex((s) => s.id === song.id);
    if (indexInAll !== -1) {
      if (songIndex === indexInAll && isPlaying) {
        setIsPlaying(false); // Pause if already playing
      } else {
        setSongs(allSongs); // Play selected song
        setSongIndex(indexInAll);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Recently Added</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allSongs?.slice(0, 10)?.map((song) => {
          const isCurrentSong =
            songIndex !== null && allSongs[songIndex]?.id === song.id;
          return (
            <div
              key={song.id}
              className="bg-[#1c1c1c] p-3 rounded-lg shadow hover:shadow-lg transition relative group"
            >
              <img
                src={
                  song.thumbnail ||
                  "https://i.ibb.co/S747PBgD/music-Disc-BG.png"
                }
                alt={song.songName}
                className="w-full h-[140px] object-cover rounded"
              />
              <h3 className="mt-2 text-sm font-semibold">{song.songName}</h3>
              <button
                onClick={() => handlePlayPause(song)}
                className="absolute top-2 right-2 bg-green-500 p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                {isCurrentSong && isPlaying ? (
                  <FaPause className="text-white text-sm" />
                ) : (
                  <FaPlay className="text-white text-sm" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {songIndex !== null && (
        <MYAudioPlayer
          key={songs[songIndex]?.id}
          src={songs[songIndex]?.songUrl}
          songsAlbum={songs}
          index={songIndex}
        />
      )}
    </div>
  );
};

export default RecentlyAdded;
