import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { SongContextApi } from "../Context/SongPlayerContext";

const MYAudioPlayer = ({ src, title, thumbnail }) => {
  let { isPlayingContext, setIsPlayingContext } = useContext(SongContextApi);

  const audioRef = useRef(new Audio(src));
  let [isPlaying, setIsPlaying] = useState();
  let [progressBar, setProgressBar] = useState(0);
  let [duration, setDuration] = useState(0);

  useEffect(() => {
    let audio = audioRef.current;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      setProgressBar(audio.currentTime);
    });

    if (isPlayingContext) {
      audio.play();
      setIsPlaying(true)
    }

    return () => {
      audio.pause();
    };
  }, []);

  let togglePlay = () => {
    let audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  let handleProgessChange = (e) => {
    let audio = audioRef.current;

    audio.currentTime = e.target.value;

    setProgressBar(e.target.value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <section className="bg-[#232323] text-white rounded-lg p-4 shadow-md shadow-[#0f0e0e] w-[78%] h-[140px] flex items-center fixed bottom-4 right-12 ">
      <div className="basis-[10%]    flex flex-col items-center justify-center gap-2">
        <picture>
          <img
            src={thumbnail}
            alt={title}
            className=" w-[75px] h-[75px] object-cover rounded-full  "
          />
        </picture>

        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {/* Picture and titlw ends  */}

      <section className=" flex flex-col justify-center items-center basis-[80%]">
        <div className="">
          <button onClick={togglePlay} className=" text-white p-2 rounded-full">
            <FaStepBackward className="text-[24px]" />
          </button>
          <button onClick={togglePlay} className=" text-white p-2 rounded-full">
            {isPlaying ? (
              <FaPause className="text-[24px] " />
            ) : (
              <FaPlay className="text-[24px]" />
            )}
          </button>
          <button className=" text-white p-2 ">
            <FaStepForward className="text-[24px]" />
          </button>
        </div>

        {/* audio */}
        <section className=" flex items-center gap-2 py-4 w-full">
          <span>{formatTime(progressBar)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={progressBar}
            onChange={handleProgessChange}
            className="w-full "
          />
          <span>{formatTime(duration - progressBar)}</span>
        </section>
      </section>
    </section>
  );
};

export default MYAudioPlayer;
