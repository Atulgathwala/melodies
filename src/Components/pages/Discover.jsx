import React, { useContext, useMemo } from "react";
import { AlbumContextApi } from "../Context/AlbumContext";
import { SongContextApi } from "../Context/SongPlayerContext";
import MYAudioPlayer from "../utility/MYAudioPlayer";
import { FaPlay } from "react-icons/fa";

const Discover = () => {
  const { randomSongs, allAlbums } = useContext(AlbumContextApi);
  const { isPlaying, setIsPlaying, setSongs, setSongIndex, songIndex, songs } =
    useContext(SongContextApi);

  // Top Albums: first 6 albums
  const topAlbums = useMemo(() => allAlbums?.slice(0, 6) || [], [allAlbums]);

  // Recently Added: sort by date descending, take 6
  const recentAlbums = useMemo(
    () =>
      allAlbums
        ? [...allAlbums]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 6)
        : [],
    [allAlbums]
  );

  const handlePlaySong = (list, index) => {
    setSongs(list);
    setSongIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="bg-[#181818] w-[80vw] text-white p-6 space-y-16">
      {/* Random Picks Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Random Picks for You</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {randomSongs?.map((song, idx) => (
            <div
              key={song.id || idx}
              onClick={() => handlePlaySong(randomSongs, idx)}
              className="relative bg-[#232323] rounded-[10px] p-3 cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={song.thumbnail}
                alt={song.songName}
                className="w-full h-32 object-cover rounded-md"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm truncate">{song.songName}</span>
                <FaPlay className="text-xl text-[#EE10B0]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Albums Section */}
      <section className="scrollbar-hide">
        <h2 className="text-2xl font-semibold mb-4">Top Albums</h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
          {topAlbums.map((album) => (
            <div
              key={album.id}
              className="min-w-[200px] bg-[#232323] rounded-[10px] p-4 cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={album.albumPoster}
                alt={album.albumTitle}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-2 font-medium truncate">{album.albumTitle}</h3>
              <p className="text-xs text-gray-400">{album.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recently Added Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Recently Added</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentAlbums.map((album) => (
            <div
              key={album.id}
              className="bg-[#232323] rounded-[10px] p-4 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <img
                src={album.albumPoster}
                alt={album.albumTitle}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="mt-3 font-medium">{album.albumTitle}</h3>
              <p className="text-sm text-gray-400">{album.albumType}</p>
              <p className="text-xs mt-1">
                Languages: {album.languages.join(", ")}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Audio Player */}
      {songIndex !== null && (
        <MYAudioPlayer
          key={songs[songIndex]?.songUrl}
          src={songs[songIndex]?.songUrl}
          songsAlbum={songs}
          index={songIndex}
        />
      )}
    </div>
  );
};

export default Discover;
