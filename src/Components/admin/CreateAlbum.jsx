import axios from "axios";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import Spinner from "../utility/Spinner/Spinner";
import { __DB } from "../../backend/firebase";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const CreateAlbum = () => {
  let initialAlBumState = {
    albumTitle: "",
    albumPoster: "",
    date: "",
    albumType: "",
    languages: [],
    language: "",
    description: "",
    songs: [],
  };

  let initialSongsState = {
    id: uuidv4(), // <-- this is the unique id
    songUrl: "",
    songName: "",
    thumbnail: "",
    genre: "",
    singers: [],
    singersInput: "",
    mood: "",
    actors: [],
    actorsInput: "",
    lyricists: [],
    lyricistsInput: "",
    musicDirector: "",
  };

  let [albumState, setAlbumState] = useState(initialAlBumState);
  let [songsState, setSongState] = useState([initialSongsState]);
  let [AlbumPoster, setAlbumPoster] = useState("");
  let [isLoading, setIsloading] = useState(false);

  let handleAlbumPoster = (e) => {
    setAlbumPoster(e.target.files[0]);
  };

  let {
    albumTitle,
    albumPoster,
    date,
    albumType,
    languages,
    language,
    description,
  } = albumState || {};

  let addSongSection = (e) => {
    e.preventDefault();
    setSongState([
      ...songsState,
      {
        id: uuidv4(), // <-- this is the unique id
        songUrl: "",
        songName: "",
        thumbnail: "",
        genre: "",
        singers: [],
        singersInput: "",
        director: "",
        actors: [],
        actorsInput: "",
        lyricists: [],
        lyricistsInput: "",
        musicDirector: "",
      },
    ]);
  };

  let removeSongSection = (index) => {
    if (index > 0) {
      setSongState(
        songsState.filter((_, ind) => {
          return ind != index;
        })
      );
    }
  };

  let handleAlbumChange = (e) => {
    let { name, value } = e.target;

    setAlbumState({
      ...albumState,
      [name]: value,
    });
  };

  // handling files inout of songs

  let fileHandleChangeSongsSection = (index, feild, e) => {
    let updatedSongs = [...songsState];
    updatedSongs[index][feild] = e.target.files[0];
    setSongState(updatedSongs);
  };

  let handleSongsChange = (index, e) => {
    let updatedSongs = [...songsState];
    updatedSongs[index][e.target.name] = e.target.value;
    setSongState(updatedSongs);
  };

  let handleLanguagesChange = () => {
    if (language && !languages.includes(language)) {
      setAlbumState({
        ...albumState,
        languages: [...languages, language],
        language: "",
      });
    }
  };

  let handleRemoveLaguages = (ind) => {
    setAlbumState({
      ...albumState,
      languages: languages.filter((_, index) => {
        return index != ind;
      }),
    });
  };

  let handleSongsKeyDownChanges = (index, feild) => {
    let updatedSongs = [...songsState];
    let inputFeild = `${feild}Input`;

    if (
      updatedSongs[index][inputFeild] &&
      !updatedSongs[index][feild].includes(updatedSongs[index][inputFeild])
    ) {
      updatedSongs[index][feild] = [
        ...updatedSongs[index][feild],
        updatedSongs[index][inputFeild],
      ];
      updatedSongs[index][inputFeild] = "";
      setSongState(updatedSongs);
    }
  };

  let removeHandleSongsKeyDown = (Songindex, feild, itemInd) => {
    let updatedSongs = [...songsState];

    updatedSongs[Songindex][feild] = updatedSongs[Songindex][feild].filter(
      (_, ind) => {
        return ind != itemInd;
      }
    );
    setSongState(updatedSongs);
  };

  let handleSubmitCreateAlbum = async (e) => {
    e.preventDefault();
    setIsloading(true);

    try {
      let PosterFormData = new FormData();
      PosterFormData.append("file", AlbumPoster);
      PosterFormData.append("upload_preset", "melodies_music");
      PosterFormData.append("cloud_name", "dasa3kzyf");

      let { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dasa3kzyf/upload",
        PosterFormData
      );

      let albumPOsterURl = data.url;

      let songsWithUrls = songsState.map(async (song) => {
        let songThumnailFormData = new FormData();

        songThumnailFormData.append("file", song.thumbnail);
        songThumnailFormData.append("upload_preset", "melodies_music");
        songThumnailFormData.append("cloud_name", "dasa3kzyf");

        let songThumnailCloudinaryResp = await axios.post(
          "https://api.cloudinary.com/v1_1/dasa3kzyf/upload",
          songThumnailFormData
        );

        let songSonhSrcFormData = new FormData();

        songSonhSrcFormData.append("file", song.songUrl);
        songSonhSrcFormData.append("upload_preset", "melodies_music");
        songSonhSrcFormData.append("cloud_name", "dasa3kzyf");

        let songSongSrcCloudinaryResp = await axios.post(
          "https://api.cloudinary.com/v1_1/dasa3kzyf/upload",
          songSonhSrcFormData
        );

        console.log("song Thumnail Url", songThumnailCloudinaryResp.data.url);
        console.log("song song Url", songSongSrcCloudinaryResp.data.url);

        return {
          ...song,
          songUrl: songSongSrcCloudinaryResp.data.url,
          thumbnail: songThumnailCloudinaryResp.data.url,
        };
      });

      let songsWithUrlsresponse = await Promise.all(songsWithUrls);
      console.log("response map", songsWithUrlsresponse);

      let payLoad = {
        ...albumState,
        albumPoster: albumPOsterURl,
        songs: songsWithUrlsresponse,
      };

      const album_collection_data = collection(__DB, "album_collection"); // Use uid as document ID
      let albumDoc = await addDoc(album_collection_data, payLoad);

      console.log("album doc", albumDoc);
      toast.success("Data Saved Successfully");

      setIsloading(false);

      console.log("final", albumState);
    } catch (error) {
      console.log(error);
      toast.error(error.code.slice(5));
      setIsloading(false);
    }
  };

  return (
    <section className=" w-[90%] m-auto bg-gray-900 p-8 rounded-lg shadow-lg text-gray-300">
      <article>
        <header className="text-[32px] text-center font-bold text-white">
          <h1>Create Album</h1>
        </header>

        <hr className="my-5 border-gray-700" />

        <main>
          <form action="" onSubmit={handleSubmitCreateAlbum}>
            <header className="text-[20px] font-semibold text-indigo-400">
              Album Details
            </header>
            <article className="flex justify-between w-full py-2">
              <div className="basis-[32%]">
                <label
                  htmlFor="name"
                  className="block font-[500] py-2 text-gray-400"
                >
                  Album Title
                </label>
                <div className="py-[8px] border-[2px] border-gray-700 bg-gray-800 pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    onChange={handleAlbumChange}
                    name="albumTitle"
                    value={albumTitle}
                    className="h-[24px] px-[5px] w-full outline-none bg-transparent text-gray-300 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="basis-[32%]">
                <label
                  htmlFor="name"
                  className="block font-[500] py-2 text-gray-400"
                >
                  Album Poster
                </label>
                <div className="py-[8px] border-[2px] border-gray-700 bg-gray-800 pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="file"
                    name="Poster"
                    onChange={handleAlbumPoster}
                    className="h-[24px] px-[5px] w-full outline-none file:px-2 file:bg-indigo-600 file:text-white file:rounded-[2px]"
                  />
                </div>
              </div>
              <div className="basis-[32%]">
                <label
                  htmlFor="name"
                  className="block font-[500] py-2 text-gray-400"
                >
                  Album Type
                </label>
                <div className="py-[8px] border-[2px] border-gray-700 bg-gray-800 pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="text"
                    placeholder="Enter Album type"
                    name="albumType"
                    value={albumType}
                    onChange={handleAlbumChange}
                    className="h-[24px] px-[5px] w-full outline-none bg-transparent text-gray-300 focus:border-indigo-500"
                  />
                </div>
              </div>
            </article>

            {/* first row ends here album */}

            {/* second row album  starts here*/}
            <article className="flex justify-between w-full py-2">
              <div className="basis-[32%]">
                <label
                  htmlFor="date"
                  className="block font-[500] py-2 text-gray-400"
                >
                  Date
                </label>
                <div className="py-[8px] border-[2px] border-gray-700 bg-gray-800 pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="date"
                    onChange={handleAlbumChange}
                    name="date"
                    value={date}
                    placeholder="Enter Your Name"
                    className="h-[24px] px-[5px] w-full outline-none bg-transparent text-gray-300 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="basis-[32%]">
                <label
                  htmlFor="name"
                  className="block font-[500] py-2 text-gray-400"
                >
                  Language
                </label>
                <div className="py-[8px] border-[2px] border-gray-700 bg-gray-800 pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="text"
                    onChange={handleAlbumChange}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        e.preventDefault();
                        handleLanguagesChange();
                      }
                    }}
                    value={language}
                    name="language"
                    placeholder="Enter the languages ..."
                    className="h-[24px] px-[5px] w-full outline-none file:px-2 file:bg-indigo-600 file:text-white file:rounded-[2px]"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages?.length > 0 &&
                    languages.map((lng, ind) => {
                      return (
                        <span className="bg-red-600 text-white py-1 px-2 rounded-[8px] flex items-center gap-2">
                          {lng}
                          <span>
                            <IoCloseSharp
                              className="cursor-pointer"
                              onClick={() => handleRemoveLaguages(ind)}
                            />
                          </span>
                        </span>
                      );
                    })}
                </div>
              </div>
              <div className="basis-[32%]">
                <label
                  htmlFor="name"
                  className="block font-[500] py-2 text-gray-400"
                >
                  Description
                </label>
                <div className="py-[8px] border-[2px] border-gray-700 bg-gray-800 pl-[8px] pr-[4px] flex items-center gap-1 rounded-[7px]">
                  <input
                    type="text"
                    placeholder="Enter Album Description"
                    name="description"
                    value={description}
                    onChange={handleAlbumChange}
                    className="h-[24px] px-[5px] w-full outline-none bg-transparent text-gray-300 focus:border-indigo-500"
                  />
                </div>
              </div>
            </article>
            {/* second row ends here album */}

            {/* songs section starts from here */}
            <main className="my-5">
              <header>
                <h1 className="text-2xl font-bold">Songs Section</h1>
              </header>
              <main className="w-full mt-4">
                {songsState?.map((song, index) => {
                  return (
                    <section
                      key={index}
                      className=" bg-gray-800 text-white my-4 p-4 rounded-lg shadow-lg "
                    >
                      <header className="text-[20px] pb-2 font-[600] text-blue-600">
                        Song {index + 1}
                      </header>
                      {/* First Row: Title, Song URL, Poster */}
                      <article className="flex justify-between gap-4">
                        <div className="w-1/3">
                          <label className="block font-semibold mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            name={"songName"}
                            value={song.songName}
                            onChange={(e) => handleSongsChange(index, e)}
                            placeholder="Enter Song Title"
                            className="w-full h-10 px-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none"
                          />
                        </div>

                        <div className="w-1/3">
                          <label className="block font-semibold mb-2">
                            Song Url
                          </label>
                          <input
                            type="file"
                            name={"songUrl"}
                            onChange={(e) => {
                              fileHandleChangeSongsSection(index, "songUrl", e);
                            }}
                            className="w-full h-10 text-gray-400 file:px-2 file:py-1 file:bg-gray-400 file:text-white file:rounded-md"
                          />
                        </div>

                        <div className="w-1/3">
                          <label className="block font-semibold mb-2">
                            Thumbnail
                          </label>
                          <input
                            type="file"
                            name="thumbnail"
                            onChange={(e) => {
                              fileHandleChangeSongsSection(
                                index,
                                "thumbnail",
                                e
                              );
                            }}
                            className="w-full h-10 text-gray-400 file:px-2 file:py-1 file:bg-gray-400 file:text-white file:rounded-md"
                          />
                        </div>
                      </article>

                      {/* Second Row: Genre, Singers, Director */}
                      <article className="flex justify-between gap-4 mt-4">
                        <div className="w-1/3">
                          <label className="block font-semibold mb-2">
                            Genre
                          </label>
                          <input
                            type="text"
                            name="genre"
                            value={song.genre}
                            onChange={(e) => handleSongsChange(index, e)}
                            placeholder="Enter Song Genre"
                            className="w-full h-10 px-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none"
                          />
                        </div>

                        <div className="w-1/3">
                          <label className="block font-semibold mb-2">
                            Singers
                          </label>
                          <input
                            type="text"
                            name="singersInput"
                            value={song.singersInput}
                            onChange={(e) => handleSongsChange(index, e)}
                            onKeyDown={(e) => {
                              if (e.key == "Enter") {
                                e.preventDefault();
                                handleSongsKeyDownChanges(index, "singers");
                              }
                            }}
                            placeholder="Enter Singers ..."
                            className="w-full h-10 px-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none"
                          />
                          <div className="flex flex-wrap gap-2">
                            {song.singers.map((singers, ind) => {
                              return (
                                <span
                                  key={ind}
                                  className="bg-red-600 text-white py-1 px-2 rounded-[8px] flex items-center gap-2"
                                >
                                  {singers}
                                  <span>
                                    <IoCloseSharp
                                      className="cursor-pointer"
                                      onClick={() =>
                                        removeHandleSongsKeyDown(
                                          index,
                                          "singers",
                                          ind
                                        )
                                      }
                                    />
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="w-1/3">
                          <label className="block font-semibold mb-2">
                            Mood
                          </label>
                          <input
                            type="text"
                            name="mood"
                            value={song.mood}
                            onChange={(e) => handleSongsChange(index, e)}
                            placeholder="Enter Director"
                            className="w-full h-10 px-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none"
                          />
                        </div>
                      </article>

                      {/* Third Row: Actors, Lyricist, Music Director */}
                      <article className="flex justify-between gap-4 mt-4">
                        <div className="w-1/3">
                          <label className="block font-semibold mb-2">
                            Actors
                          </label>
                          <input
                            type="text"
                            name="actorsInput"
                            value={song.actorsInput}
                            onChange={(e) => handleSongsChange(index, e)}
                            onKeyDown={(e) => {
                              if (e.key == "Enter") {
                                e.preventDefault();
                                handleSongsKeyDownChanges(index, "actors");
                              }
                            }}
                            placeholder="Enter Actors ..."
                            className="w-full h-10 px-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none"
                          />
                          <div className="flex flex-wrap gap-2">
                            {song.actors.map((actors, ind) => {
                              return (
                                <span
                                  key={ind}
                                  className="bg-red-600 text-white py-1 px-2 rounded-[8px] flex items-center gap-2"
                                >
                                  {actors}
                                  <span>
                                    <IoCloseSharp
                                      className="cursor-pointer"
                                      onClick={() =>
                                        removeHandleSongsKeyDown(
                                          index,
                                          "actors",
                                          ind
                                        )
                                      }
                                    />
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="w-1/3">
                          <label className="block font-semibold mb-2">
                            Lyricist
                          </label>
                          <input
                            type="text"
                            name="lyricistsInput"
                            value={song.lyricistsInput}
                            onChange={(e) => handleSongsChange(index, e)}
                            onKeyDown={(e) => {
                              if (e.key == "Enter") {
                                e.preventDefault();
                                handleSongsKeyDownChanges(index, "lyricists");
                              }
                            }}
                            placeholder="Enter Lyricist"
                            className="w-full h-10 px-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none"
                          />
                          <div className="flex flex-wrap gap-2">
                            {song?.lyricists?.map((lyrcist, ind) => {
                              return (
                                <span
                                  key={ind}
                                  className="bg-red-600 text-white py-1 px-2 rounded-[8px] flex items-center gap-2"
                                >
                                  {lyrcist}
                                  <span>
                                    <IoCloseSharp
                                      className="cursor-pointer"
                                      onClick={() =>
                                        removeHandleSongsKeyDown(
                                          index,
                                          "lyricists",
                                          ind
                                        )
                                      }
                                    />
                                  </span>
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="w-1/3">
                          <label className="block font-semibold mb-2">
                            Music Director
                          </label>
                          <input
                            type="text"
                            name="musicDirector"
                            value={song.musicDirector}
                            onChange={(e) => handleSongsChange(index, e)}
                            placeholder="Enter Music Director"
                            className="w-full h-10 px-3 border border-gray-600 rounded-md bg-gray-900 text-white outline-none"
                          />
                        </div>
                      </article>

                      {/* Footer Buttons */}
                      <footer className="flex justify-between gap-4 mt-6">
                        <button
                          className="bg-green-600 hover:bg-green-700 transition text-white py-2 px-4 rounded-md"
                          onClick={addSongSection}
                        >
                          Add Section
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 transition text-white py-2 px-4 rounded-md"
                          onClick={(e) => {
                            e.preventDefault();
                            removeSongSection(index);
                          }}
                        >
                          Remove Section
                        </button>
                      </footer>
                    </section>
                  );
                })}
              </main>
            </main>
            {/* form footer */}
            <footer>
              <button className="py-2 px-6 bg-[#EE10B0] rounded-[10px] w-full cursor-pointer">
                submit
              </button>
            </footer>
          </form>
        </main>
      </article>
      {isLoading && <Spinner />}
    </section>
  );
};

export default CreateAlbum;
