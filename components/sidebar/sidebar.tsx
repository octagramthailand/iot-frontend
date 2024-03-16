"use client";

import SidebarMenu from "./sidebar-menu";

const Sidebar = () => {
  return (
    <div className="fixed h-full w-72 bg-[#405189] flex flex-col ">
      <img
        src="/logo.png"
        alt="logo"
        width={200}
        className="self-center mt-10 mb-3"
      />
      <SidebarMenu />
    </div>
  );
};

export default Sidebar;
