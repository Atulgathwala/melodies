import React, { useContext, useState } from "react";
import { AUTHContextAPI } from "../Context/AuthContext";
import { MdDeleteForever } from "react-icons/md";
import { deleteUser } from "firebase/auth";

import GIF from "../../assets/images/delets.gif";

import toast from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert";

const DeleteAccount = () => {
  let { authUser } = useContext(AUTHContextAPI);
  let [userChoice, setUserChoice] = useState("");
  let [compVisible, setCompVisible] = useState(false);

  let [deleteGif, setDeleteGif] = useState(false);

  let userDelete = async () => {
    try {
      if (authUser) {
        console.log("deleting");

        // await deleteUser(authUser);
        // console.log("userDeleted Successfully");
        // toast.success("user Deleted Successfully");

        setInterval(() => {
          setDeleteGif(true);
        }, 200);
        setInterval(() => {
          setDeleteGif(false);
          window.location.assign("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.code.slice(5));
    }
  };

  return (
    <section className="h-[98%] w-[100%] flex items-center justify-center relative">
      <article className="bg-[#b8b7b7] h-[70%] w-[750px] absolute top-[10%] rounded-md shadow-lg shadow-purple-500/30 flex flex-col ">
        <header className="bg-gradient-to-r from-pink-500 to-blue-500 basis-[33%]  text-white text-lg font-semibold rounded-t-md flex items-center py-2 px-6 gap-6">
          <aside>
            <img
              src={authUser?.photoURL}
              alt=""
              className="h-[125px] w-[125px] rounded-full"
            />
          </aside>
          <aside>
            <h1> {authUser?.displayName}</h1>
            <p>{authUser?.email}</p>
          </aside>
        </header>
        <main className="bg-[#d1a9be] basis-[67%] flex flex-col gap-5 items-center justify-center text-[#2E1B2B] rounded-b-md font-medium p-2">
          <header className="text-[32px] flex gap-5 items-center">
            <span>We Are feeling Sad !!</span>
            {/* <img
              src="https://media.tenor.com/COXFu_k06msAAAAj/crying-emoji-crying.gif "
              alt=""
              className="h-[75px]"
            /> */}
            <span>🥹</span>
          </header>
          <footer>
            <button
              onClick={() => {
                setCompVisible(true);
              }}
              className="flex items-center bg-red-600 py-2 px-5 rounded-[10px] text-[20px] cursor-pointer"
            >
              <span>
                <MdDeleteForever />
              </span>
              <span>Delete Account</span>
            </button>
          </footer>
        </main>
      </article>

      {compVisible && (
        <section className="h-[100vh] w-[100%] bg-[#0000005f] fixed top-0 left-0 z-2">
          <section className="h-[300px] w-[900px] bg-white fixed top-[25%] left-[28%] rounded-2xl shadow-xl z-3 flex flex-col items-center justify-center gap-7">
            <header className="text-2xl font-bold text-red-600">
              Are You Sure You Want to Delete?
            </header>
            <footer className="flex gap-4">
              <button
                onClick={() => {
                  userDelete();
                  setCompVisible(false);
                }}
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg transition-all duration-300 shadow-md"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setCompVisible(false);
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg transition-all duration-300 shadow-md"
              >
                No
              </button>
            </footer>
          </section>
        </section>
      )}

      {deleteGif && (
        <section
          className="h-[100vh] w-[100%] bg-[#0505055f]  fixed top-0 left-[8%] flex justify-center items-center"
          l
        >
          <img src={GIF} alt=""  className="h-[200px]"/>
        </section>
      )}
    </section>
  );
};

export default DeleteAccount;
