import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import MainSideBar from "./Components/pages/MainSideBar";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/pages/Footer";

const App = () => {
  return (
    <>
      <Toaster />
      <section className="bg-[#181818]  flex gap-2">
        <MainSideBar />
        <section className="basis-[82%] pt-[36px] pl-[20px] ">
          <Outlet />
          <Footer />
        </section>
      </section>
    </>
  );
};

export default App;
