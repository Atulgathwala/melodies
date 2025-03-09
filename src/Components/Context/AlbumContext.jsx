import { collection, getDocs } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { __DB } from "../../backend/firebase";

export let AlbumContextApi = createContext();

const AlbumContext = ({ children }) => {
  let [allAlbums, setAllAlbums] = useState(null);
  let [allSongs, setAllsongs] = useState(null);

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

  useEffect(() => {
    fetchAllbums();
  }, []);

  return (
    <AlbumContextApi.Provider value={{ allAlbums, allSongs }}>
      {children}
    </AlbumContextApi.Provider>
  );
};

export default AlbumContext;
