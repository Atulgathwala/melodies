import React from "react";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="h-[100vh] w-[100%] bg-[#0000001f] flex justify-center items-center fixed top-0 left-0">
      <div className="container">
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Spinner;
