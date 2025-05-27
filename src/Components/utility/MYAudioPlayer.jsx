import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { SongContextApi } from "../Context/SongPlayerContext";
import toast from "react-hot-toast";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { ImVolumeHigh, ImVolumeLow, ImVolumeMedium } from "react-icons/im";

const MYAudioPlayer = () => {
  let { isPlaying, setIsPlaying, songs, setSongs, songIndex, setSongIndex } =
    useContext(SongContextApi);

  let [songToPlay, setSongToPlay] = useState(songs[songIndex]);
  const audioRef = useRef(new Audio(songToPlay?.songUrl));
  let [progressBar, setProgressBar] = useState(0);
  let [duration, setDuration] = useState(0);
  let [volume, setVolume] = useState(1);
  let [muted, setmuted] = useState(false);

  useEffect(() => {
    let audio = audioRef.current;
    audio.src = songToPlay?.songUrl;

    const updateDuration = () => setDuration(audio.duration);
    const updateProgress = () => setProgressBar(audio.currentTime);

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("timeupdate", updateProgress);

    if (isPlaying) {
      audio.play();
      setIsPlaying(true);
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, [songIndex, isPlaying, songs, songToPlay]);

  useEffect(() => {
    setSongToPlay(songs[songIndex]); // Force update song
  }, [songToPlay]);

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

  // handle next song play

  let handleNextSongPlay = () => {
    console.log("song index", songIndex);

    if (songIndex < songs?.length - 1) {
      console.log("song index inside", songIndex);
      setSongIndex((prevSate) => prevSate + 1);
      setSongToPlay(songs[songIndex]);
    } else {
      setSongIndex(0);
    }
  };

  // handle Previous
  let handlePreviousSongPlay = () => {
    setSongIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      toast.error("no previous song available");
      return prevIndex; // Prevent going below 0
    });
  };

  // song Changing UseEffect
  useEffect(() => {
    setSongToPlay(songs[songIndex]);
  }, [songIndex, songToPlay?.songUrl]);

  let handleVolumeChange = (e) => {
    let newVloume = e.target.value;
    setVolume(newVloume);

    audioRef.current.volume = volume;
  };

  let handleMute = () => {
    audioRef.current.muted = !audioRef.current.muted;
    setmuted(!muted);
  };

  return (
    <section className="bg-[#232323] text-white rounded-lg p-4 shadow-md shadow-[#0f0e0e] w-[78%] h-[140px] flex items-center fixed bottom-4 right-12 z-20">
      <div className="basis-[10%]    flex flex-col items-center justify-center gap-2">
        <picture>
          <img
            src={
              songToPlay?.thumbnail
                ? songToPlay?.thumbnail
                : "https://i.ibb.co/S747PBgD/music-Disc-BG.png"
            }
            alt={songToPlay?.title}
            className={
              isPlaying
                ? " w-[75px] h-[75px] object-cover rounded-full rotation360"
                : " w-[75px] h-[75px] object-cover rounded-full"
            }
          />
        </picture>

        <h3 className="text-lg font-semibold">
          {songToPlay?.songName?.slice(0, 10)}...
        </h3>
      </div>
      {/* Picture and titlw ends  */}

      <section className=" flex flex-col justify-center items-center basis-[80%]">
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

        {/* below button section */}
        <section className="flex justify-between w-full  items-center px-20 ">
          <span
            onClick={handleMute}
            className="text-xl cursor-pointer flex flex-col items-center text-[16px]  w-[60px]"
          >
            {muted ? <HiSpeakerXMark /> : <HiSpeakerWave />}
            <span className="text-[12px]">{muted ? "unmute" : "mute"}</span>
          </span>
          <div className="">
            <button
              onClick={handlePreviousSongPlay}
              className=" text-white p-2 rounded-full"
            >
              <FaStepBackward className="text-[24px] cursor-pointer" />
            </button>
            <button
              onClick={togglePlay}
              className=" text-white p-2 rounded-full"
            >
              {isPlaying ? (
                <FaPause className="text-[24px] cursor-pointer" />
              ) : (
                <FaPlay className="text-[24px] cursor-pointer" />
              )}
            </button>
            <button className=" text-white p-2 cursor-pointer">
              <FaStepForward
                className="text-[24px]"
                onClick={handleNextSongPlay}
              />
            </button>
          </div>
          <section className="flex items-center justify-between gap-2 py-2  w-[130px]  ">
            <span className="">
              {volume < 0.25 && <ImVolumeLow />}
              {volume > 0.25 && volume < 0.5 && <ImVolumeMedium />}
              {volume > 0.5 && <ImVolumeHigh />}
            </span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-[100px] cursor-pointer"
            />
          </section>
        </section>
        {/*  buttons sections ended here */}
      </section>
    </section>
  );
};

export default MYAudioPlayer;
