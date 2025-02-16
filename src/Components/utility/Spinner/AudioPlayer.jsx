import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

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
    <div className="bg-[#232323] text-white rounded-lg p-4 shadow-md shadow-[#0f0e0e] w-[100%] h-[150px]">
      <picture>
        <img
          src={thumbnail}
          alt={title}
          className="rounded-lg w-[50px] h-[50px] object-cover mb-3"
        />
      </picture>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="flex items-center justify-between mt-2">
        <button
          onClick={togglePlay}
          className="bg-[#EE10B0] text-white p-2 rounded-full"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <span>{formatTime(progress)}</span>
      </div>
      <input
        type="range"
        min="0"
        max={duration}
        value={progress}
        onChange={handleProgressChange}
        className="w-full mt-2"
      />
    </div>
  );
};

export default AudioPlayer;
