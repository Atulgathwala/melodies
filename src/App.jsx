import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import MainSideBar from "./Components/pages/MainSideBar";
import { Toaster } from "react-hot-toast";
import Footer from "./Components/pages/Footer";

const App = () => {
  return (
    <>
      <section className="bg-[#181818] h-[200vh] flex gap-2">
        <Toaster position="top-center" reverseOrder={false} />
        <MainSideBar />
        <section className="basis-[82%] pt-[36px] pl-[20px] ">
          <Outlet />
        </section>
      </section>

      {/* <Footer /> */}
    </>
  );
};

export default App;
