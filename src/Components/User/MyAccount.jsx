import React, { useContext } from "react";
import AuthContext, { AUTHContextAPI } from "../Context/AuthContext";

const MyAccount = () => {
  let { authUser } = useContext(AUTHContextAPI);

  return (
    <section className="h-[98%] w-[100%] flex items-center justify-center relative">
      <article className="bg-[#b8b7b7] h-[70%] w-[750px] absolute top-[10%] rounded-md shadow-lg shadow-purple-500/30 flex flex-col">
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
        <main className="bg-[#d1a9be] basis-[67%] flex items-center justify-center text-[#2E1B2B] rounded-b-md font-medium">
          Account Details
        </main>
      </article>
    </section>
  );
};

export default MyAccount;
