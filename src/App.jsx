import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarConatiner from "./Components/NavbarComponents/NavbarConatiner";
import MainSideBar from "./Components/pages/MainSideBar";

const App = () => {
  let [sideBarToggle, setSideBarToggle] = useState(false);

  let handleSideBarToggle = () => {
    setSideBarToggle(!sideBarToggle);
  };
  return (
    <section className="bg-[#181818] h-[200vh] flex gap-2">
      <MainSideBar />
      <section className="basis-[82%] pt-[36px] pl-[20px]">
        <Outlet />
      </section>
    </section>
  );
};

export default App;
