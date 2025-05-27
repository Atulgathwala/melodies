import { useContext } from "react";
import { AlbumContextApi } from "../Context/AlbumContext";
import { SongContextApi } from "../Context/SongPlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";
import MYAudioPlayer from "../utility/MYAudioPlayer";
import { MdOutlineDeleteForever } from "react-icons/md";

const YourFavourites = () => {
  const { likedSongs, likeOrUnlikeSong } = useContext(AlbumContextApi);
  const { songs, setSongs, songIndex, setSongIndex, isPlaying, setIsPlaying } =
    useContext(SongContextApi);

  const handlePlay = (index) => {
    setSongs(likedSongs);
    setSongIndex(index);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setSongIndex(null);
  };

  return (
    <section className="p-6 bg-[#181818] min-h-screen text-white">
      <h1 className="text-[28px] font-bold mb-6">
        Your <span className="text-[#EE10B0]">Favourites</span>
      </h1>

      {likedSongs.length === 0 ? (
        <p className="text-gray-400">No favourites yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedSongs.map((song, index) => (
            <div
              key={index}
              className={`relative bg-[#232323] rounded-lg p-4 shadow-md hover:scale-[1.02] transition-all cursor-pointer ${
                isPlaying && songIndex === index ? "playingGradient" : ""
              }`}
              onClick={() => handlePlay(index)}
            >
              <img
                src={song.thumbnail}
                alt={song.songName}
                className="w-full h-[180px] object-cover rounded-md mb-3"
              />
              <div>
                <h2 className="font-semibold text-lg">{song.songName}</h2>
                <p className="text-sm text-gray-400">
                  {Array.isArray(song.singers)
                    ? song.singers.join(", ")
                    : song.singers}
                </p>
                <p className="text-sm text-gray-400">{song.genre}</p>
              </div>

              {/* Delete Button */}
              <div className="absolute top-[-5px] right-[-10px]  ">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering play on card
                    likeOrUnlikeSong(song); // This will remove the song from likedSongs
                  }}
                  className="cursor-pointer text-white hover:bg-red-700 hover:text-white px-3 py-1 rounded text-[20px] font-bold"
                >
                  <MdOutlineDeleteForever />
                </button>
              </div>

              <div
                className="absolute bottom-4 right-4 text-white text-[20px]"
                onClick={(e) => {
                  e.stopPropagation();
                  isPlaying && songIndex === index
                    ? handlePause()
                    : handlePlay(index);
                }}
              >
                {isPlaying && songIndex === index ? <FaPause /> : <FaPlay />}
              </div>
            </div>
          ))}
        </div>
      )}

      {songIndex !== null && (
        <MYAudioPlayer
          key={likedSongs[songIndex]?.songUrl}
          src={likedSongs[songIndex]?.songUrl}
          songsAlbum={likedSongs}
          index={songIndex}
        />
      )}
    </section>
  );
};

export default YourFavourites;
