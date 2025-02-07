import React from "react";
import { LiaSearchSolid } from "react-icons/lia";

const NavbarInput = () => {
  return (
    <div className="py-[6px] px-[8px] w-[335px] h-[38px] bg-[#1F1F1F] rounded-[10px] relative">
      <input
        type="text"
        className="h-[25px] w-[320px] pl-[30px]"
        placeholder="Search For Musics , Artists ,  ..."
      />
      <span className="absolute top-[10px] text-[23px]">
        <LiaSearchSolid />
      </span>
    </div>
  );
};

export default NavbarInput;
