"use client";

import SidebarMenu from "./sidebar-menu";

const Sidebar = () => {
  return (
    <div className="fixed h-full w-72 bg-white flex flex-col ">
      <img
        src="/logo.png"
        alt="logo"
        width={240}
        className="self-center mt-10 mb-3"
      />
      <SidebarMenu />
      <div className="flex gap-2 items-center w-full justify-center self-center absolute bottom-5 text-white">
        <img src="/i_power_logo.png" alt="logo" width={140} className="" />
      </div>
    </div>
  );
};

export default Sidebar;
