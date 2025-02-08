import React from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const Modal = ({ children, isVisible, handleIsVisible }) => {
  if (!isVisible) return null;

  return createPortal(
    <section
      className="bg-[#00000090] z-[20] fixed top-0 left-0 items-center
    h-[100vh] w-[100%] flex justify-center"
      onClick={() => {
        handleIsVisible(false);
      }}
    >
      <article
        className="relative rounded-md"
        onClick={(e) => e.stopPropagation()} // Prevent click event from bubbling up
      >
        <span
          className="absolute top-[10px] right-[10px] text-[25px] cursor-pointer"
          onClick={() => {
            handleIsVisible(false);
          }}
        >
          <IoClose />
        </span>

        {children}
      </article>
    </section>,
    document.getElementById("modal")
  );
};

export default Modal;
