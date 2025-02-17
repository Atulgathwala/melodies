import React, { createContext, useState } from "react";

export let SongContextApi = createContext(null);

const SongPlayerContext = ({ children }) => {
  let [isPlayingContext, setIsPlayingContext] = useState(false);
  return (
    <SongContextApi.Provider value={{ isPlayingContext, setIsPlayingContext }}>
      {children}
    </SongContextApi.Provider>
  );
};

export default SongPlayerContext;
