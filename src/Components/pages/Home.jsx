import React, { useState } from "react";
import NavbarConatiner from "../NavbarComponents/NavbarConatiner";
import { NavLink } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Modal from "../Modal/Modal";

const Home = () => {
  return (
    <section className=" mainHomeSection ">
      <article className="bg-[url('https://i.ibb.co/6cRkVX1j/pixelcut-export.png')] bg-cover bg-center h-[75vh] w-[98%] py-4 px-8  rounded-2xl relative">
        <NavbarConatiner />

        <section className="h-[314px] w-[352px]  absolute bottom-[60px] p-[10px] flex flex-col gap-[16px]">
          <h1 className="text-[40px] font-[600] ">
            All the <span className="text-[#EE10B0]">Best Songs</span> in One
            Place
          </h1>
          <p className="text-[12px] font-[300] text-justify">
            On our website, you can access an amazing collection of popular and
            new songs. Stream your favorite tracks in high quality and enjoy
            without interruptions. Whatever your taste in music, we have it all
            for you
          </p>
          <div className="">
            <NavLink className="py-[8px] px-[24px] w-[40px] bg-[#EE10B0] rounded-6px ">
              Discover Now
            </NavLink>{" "}
            <NavLink className="py-[8px] px-[24px] w-[40px] border-[1px] border-[#0E9EEF] text-[#0E9EEF] rounded-6px mx-[10px] ">
              Discover Now
            </NavLink>
          </div>
        </section>
      </article>
      {/* after Image */}

      {/* <Register /> */}
    </section>
  );
};

export default Home;
