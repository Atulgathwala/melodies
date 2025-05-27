import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { __DB, __AUTH } from "../../backend/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export let AlbumContextApi = createContext();

const AlbumContext = ({ children }) => {
  let [allAlbums, setAllAlbums] = useState(null);
  let [allSongs, setAllsongs] = useState(null || []);
  let [randomSongs, setRandomSongs] = useState(null);
  const [likedSongs, setLikedSongs] = useState([]);

  function getRandomElements(arr, num) {
    let shuffled = arr.sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffled.slice(0, num); // Get first `num` elements
  }

  useEffect(() => {
    const fetchLikedSongs = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      try {
        const docRef = doc(__DB, "users_likes", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setLikedSongs(docSnap.data().likedSongs || []);
        }
      } catch (err) {
        console.error("Failed to load liked songs", err);
      }
    };

    fetchLikedSongs();
  }, []);

  let fetchAllbums = async () => {
    try {
      let albumsCollectionRef = collection(__DB, "album_collection");
      let getAlbums = await getDocs(albumsCollectionRef);

      let albums = getAlbums.docs.map((doc) => ({
        id: doc.id,
        ...doc?.data(),
      }));

      setAllAlbums(albums);

      let allSongsList = albums
        .map((album) => {
          return album.songs || [];
        })
        .flat();
      setAllsongs(allSongsList);
    } catch (error) {
      console.log(error);
      toast.error("failed to fetch the data");
    }
  };

  const likeOrUnlikeSong = async (song) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("Please login to like songs");
      return;
    }

    const docRef = doc(__DB, "users_likes", user.uid);

    setLikedSongs((prev) => {
      const alreadyLiked = prev.some((s) => s.id === song.id);

      const updated = alreadyLiked
        ? prev.filter((s) => s.id !== song.id)
        : [...prev, song];

      // Save to Firestore
      setDoc(docRef, { likedSongs: updated });

      toast.success(alreadyLiked ? "Removed from liked" : "Added to liked 💖");

      return updated;
    });
  };

  let RandomSongsData = getRandomElements(allSongs, 6); // Get 4 random elements

  console.log("Hii this is liked songs", likedSongs);

  useEffect(() => {
    fetchAllbums();
    setRandomSongs(RandomSongsData);
  }, []);

  useEffect(() => {
    if (allSongs.length > 0) {
      setRandomSongs(getRandomElements(allSongs, 6));
    }
  }, [allSongs]); // Runs when allSongs updates

  const fetchLikedSongs = async () => {
    try {
      let LikedSongs = collection(__DB, "users_likes");
      let likedSongsData = await getDocs(LikedSongs);

      let AllLikedSongsOfAllusers = likedSongsData.docs.map((doc) => ({
        id: doc.id,
        ...doc?.data(),
      }));
      console.log(AllLikedSongsOfAllusers);

      console.log("user idddd  ", __AUTH.currentUser?.uid);

      let favSongs = AllLikedSongsOfAllusers.filter((el) => {
        return el.id == __AUTH.currentUser.uid;
      });
      setLikedSongs(favSongs[0].likedSongs || []);

      // console.log(__AUTH.currentUser.uid == albums[0].id);
    } catch (err) {
      console.log(err);
    }
  };

  const addPlaylist = async (playlistName, songs = []) => {
    const user = __AUTH.currentUser;
    if (!user) {
      toast.error("Please login to create playlist");
      return;
    }

    const playlistData = {
      name: playlistName.trim(),
      songs: songs,
      createdAt: new Date(),
      userId: user.uid,
    };

    try {
      const playlistRef = collection(__DB, "user_playlists");
      await addDoc(playlistRef, playlistData);
      toast.success("Playlist created successfully");
    } catch (err) {
      console.error("Error creating playlist", err);
      toast.error("Failed to create playlist");
    }
  };

  useEffect(() => {
    fetchLikedSongs();
  }, []);

  const addUserPlaylist = async (playlistName, songs = []) => {
    const user = __AUTH.currentUser;
    if (!user || !playlistName.trim()) return;

    try {
      const playlistRef = collection(__DB, "users", user.uid, "playlists");
      await addDoc(playlistRef, {
        name: playlistName,
        songs: songs,
        createdAt: new Date(),
      });
    } catch (err) {
      console.error("Error adding playlist:", err);
    }
  };

  const addSongToPlaylist = async (playlistId, songObj) => {
    const user = __AUTH.currentUser;
    if (!user) return;

    const playlistRef = doc(__DB, "users", user.uid, "playlists", playlistId);
    await updateDoc(playlistRef, {
      songs: arrayUnion(songObj), // prevents duplicates if song object is same
    });
  };

  return (
    <AlbumContextApi.Provider
      value={{
        allAlbums,
        allSongs,
        randomSongs,
        likeOrUnlikeSong,
        likedSongs,
        addPlaylist,
        addUserPlaylist,
        addSongToPlaylist,
      }}
    >
      {children}
    </AlbumContextApi.Provider>
  );
};

export default AlbumContext;
