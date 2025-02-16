import React from "react";
import AdminSideBar from "./AdminSideBar";
import { Outlet } from "react-router-dom";
import NavbarConatiner from "../NavbarComponents/NavbarConatiner";

const AdminContainer = () => {
  return (
    <section className="flex bg-[#181818]">
      <AdminSideBar />
      <section className="basis-[84%] py-10 px-5">
        <NavbarConatiner />
        <section className="py-4">
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default AdminContainer;
