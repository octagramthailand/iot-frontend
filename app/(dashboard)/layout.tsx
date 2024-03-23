import Topbar from "@/components/topbar/topbar";
import Sidebar from "@/components/sidebar/sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-200 min-h-screen max-h-fit">
      <Sidebar />
      <div className="flex flex-col w-[calc(100%-18rem)] ml-72">
        <Topbar />
        <div className="mt-[68px] p-6">
          <div className=" bg-white w-full px-4 rounded-sm">{children}</div>
          {/* <div className="flex gap-2 items-center w-full justify-end mt-4">
            Power by
            <img src="/i_power_logo.png" alt="logo" width={100} className="" />
          </div> */}
        </div>
      </div>
    </div>
  );
}
