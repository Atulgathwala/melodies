// AddPlayLists.jsx
import { useState, useContext } from "react";

import toast from "react-hot-toast";
import { AlbumContextApi } from "../Context/AlbumContext";

const AddPlayLists = () => {
  const [playlistName, setPlaylistName] = useState("");
  const { likedSongs, addUserPlaylist } = useContext(AlbumContextApi);

  const handleAddPlaylist = async () => {
    if (!playlistName.trim()) {
      toast.error("Enter a valid playlist name");
      return;
    }

    await addUserPlaylist(playlistName, likedSongs); // You can pass selected songs too
    toast.success("Playlist created successfully!");
    setPlaylistName("");
  };

  return (
    <div className="p-6 bg-[#1e1e1e] text-white rounded max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Playlist</h2>
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        className="w-full p-2 mb-4 rounded bg-[#2a2a2a] text-white"
        placeholder="Enter playlist name"
      />
      <button
        onClick={handleAddPlaylist}
        className="bg-[#EE10B0] px-4 py-2 rounded hover:bg-pink-600"
      >
        Create
      </button>
    </div>
  );
};

export default AddPlayLists;
