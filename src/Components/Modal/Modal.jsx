import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { AUTHContextAPI } from "../Context/AuthContext";

const Modal = ({ children, isVisible, handleIsVisible }) => {
  let [animate, setAnimate] = useState(false);
  let { setWhichPortal } = useContext(AUTHContextAPI);

  useEffect(() => {
    isVisible ? setAnimate(true) : setAnimate(false);
  }, [isVisible]);

  if (!isVisible) return null;

  return createPortal(
    <section
      className="bg-[#00000090] z-[20] fixed top-0 left-0 items-center
    h-[100vh] w-[100%] flex justify-center"
      onClick={() => {
        setAnimate(false);
        setTimeout(() => {
          setWhichPortal(null);
          handleIsVisible(false);
        }, 500);
      }}
    >
      <article
        className={`transition-all duration-1000 relative rounded-md ${
          animate ? "scale-100" : "scale-0"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span
          className="absolute top-[10px] right-[10px] text-[25px] cursor-pointer"
          onClick={() => {
            setAnimate(false);
            setTimeout(() => {
              setWhichPortal(null);
              handleIsVisible(false);
            }, 500);
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
