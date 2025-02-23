import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

const AudioPlayer = ({ src, title, thumbnail }) => {
  const audioRef = useRef(new Audio(src));
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    // Set duration once metadata is loaded
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });

    // Update progress as song plays
    audio.addEventListener("timeupdate", () => {
      setProgress(audio.currentTime);
    });

    // Pause on unmount
    return () => {
      audio.pause();
    };
  }, []);

  // Play/Pause toggle
  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  // Format time in mm:ss
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
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={progress}
            onChange={handleProgressChange}
            className="w-full "
          />
          <span>{formatTime(duration - progress)}</span>
        </section>
      </section>
    </section>
  );
};

export default AudioPlayer;
