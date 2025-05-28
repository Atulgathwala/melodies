import { useEffect, useState } from "react";
import { __AUTH, __DB } from "../../backend/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import { MdOutlineDeleteForever } from "react-icons/md";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const YourPlayLists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(__AUTH, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchPlaylists = async () => {
    if (!user) {
      toast.error("User not logged in");
      return;
    }

    try {
      const ref = collection(__DB, "users", user.uid, "playlists");
      const snapshot = await getDocs(ref);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPlaylists(data);
    } catch (err) {
      console.error("Error fetching playlists:", err);
      toast.error("Failed to load playlists");
    }
  };

  const handleDelete = async (playlistId) => {
    if (!user) return;

    try {
      const docRef = doc(__DB, "users", user.uid, "playlists", playlistId);
      await deleteDoc(docRef);
      toast.success("Playlist deleted!");
      fetchPlaylists();
    } catch (err) {
      console.error("Error deleting playlist:", err);
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    if (user) {
      fetchPlaylists();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>; // Or spinner while auth state is loading
  }

  if (!user) {
    return <p>Please login to see your playlists.</p>;
  }

  return (
    <div className=" bg-[#181818] text-white p-6">
      <h1 className="text-2xl font-bold mb-4 text-[#EE10B0]">Your Playlists</h1>

      {playlists.length === 0 ? (
        <p className="text-gray-400">No playlists found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {playlists.map((playlist) => (
            <div
              onClick={() =>
                navigate("/playlist-songs", { state: { playlist } })
              }
              key={playlist.id}
              className="bg-[#232323] p-4 rounded shadow-md flex flex-col gap-2"
            >
              <h2 className="text-lg font-bold">{playlist.name}</h2>
              <p className="text-sm text-gray-400">
                {playlist.songs?.length || 0} song(s)
              </p>

              {/* Image preview section */}
              <div className="flex items-center gap-2 mt-1">
                {console.log(playlist)}
                {playlist.songs?.slice(0, 2).map((song, index) => (
                  <img
                    key={index}
                    src={song.thumbnail} // Make sure 'poster' field exists in song object
                    alt={song.name || "Song"}
                    className="w-[50px] h-[50px] rounded object-cover"
                  />
                ))}
                {/* Show +x more if more than 2 songs */}
                {playlist.songs?.length > 2 && (
                  <span className="text-xs text-gray-400">
                    +{playlist.songs.length - 2} more
                  </span>
                )}
              </div>

              <button
                onClick={() => handleDelete(playlist.id)}
                className="mt-2 px-3 py-1 text-sm rounded relative"
              >
                <MdOutlineDeleteForever className="absolute text-[30px] p-1 right-0 bottom-2 hover:bg-red-600 rounded-md" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourPlayLists;
