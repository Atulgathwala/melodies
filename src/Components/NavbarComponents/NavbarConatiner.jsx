import React from "react";

import Menu from "./Menu";
import NavbarInput from "./NavbarInput";
import AuthMenu from "./AuthMenu";

const NavbarConatiner = () => {
  return (
    <section className=" w-full sticky top-0">
      <article className=" h-full w-[100%]  m-auto flex justify-between items-center">
        <NavbarInput />
        <Menu />
        <AuthMenu />
      </article>
    </section>
  );
};

export default NavbarConatiner;
