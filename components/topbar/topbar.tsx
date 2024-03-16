"use client";

import { LogOut } from "lucide-react";
const Topbar = () => {
  return (
    <div className="flex items-center justify-between bg-white drop-shadow-md px-6 py-4 fixed z-50 w-[calc(100%-18rem)]">
      <h1 className=" text-black font-medium text-lg">ศูนย์ควบคุม</h1>
      <button className="hover:text-red-500 flex gap-1.5 items-center">
        <LogOut className="h-4" strokeWidth={2} />
        Log out
      </button>
    </div>
  );
};

export default Topbar;
