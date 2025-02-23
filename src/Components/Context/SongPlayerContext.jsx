import React, { createContext, useState } from "react";

export let SongContextApi = createContext(null);

const SongPlayerContext = ({ children }) => {
  let [isPlaying, setIsPlaying] = useState(false);
  let [songs, setSongs] = useState(null);
  let [songIndex, setSongIndex] = useState(null);

  return (
    <SongContextApi.Provider
      value={{
        isPlaying,
        setIsPlaying,
        songs,
        setSongs,
        songIndex,
        setSongIndex,
      }}
    >
      {children}
    </SongContextApi.Provider>
  );
};

export default SongPlayerContext;
