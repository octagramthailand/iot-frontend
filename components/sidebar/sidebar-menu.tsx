"use client";

import {
  Bus,
  FerrisWheel,
  LucideIcon,
  Map,
  MapPin,
  Plane,
  Star,
  User,
  ChevronRight,
  Gauge,
  Settings,
  NotebookText,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface SidebarMenuProps {
  title: string;
  icon: LucideIcon;
  chevron?: LucideIcon;
  path: string;
  subMenu?: SidebarMenuProps[];
}

const sidebarMenu: SidebarMenuProps[] = [
  {
    title: "ศูนย์ควบคุม",
    icon: Gauge,
    path: "/manage-user",
  },
  {
    title: "รายงานแสดงผล",
    icon: NotebookText,
    path: "/manage-attraction",
  },
  {
    title: "ตั้งค่า",
    icon: Settings,
    path: "/manage-trip",
  },
  {
    title: "จัดการผู้ใช้",
    icon: User,
    path: "/manage-local-trip",
  },
];

const SidebarMenu = () => {
  const [toggleSub, setToggleSub] = useState(false);

  return (
    <div className="flex flex-col text-[#8b8ba7] py-6 text-[15px]">
      {/* <div className="text-sm pb-3 pl-4">menu</div> */}
      {sidebarMenu.map((menu, index) => {
        return (
          <div key={index}>
            {menu.subMenu ? (
              <>
                <div
                  className={`flex flex-col gap-3 px-6 py-4 hover:bg-muted-foreground hover:cursor-pointer`}
                  onClick={() => setToggleSub(!toggleSub)}
                  key={menu.title}
                >
                  <div className="gap-3 cursor-pointer flex items-center">
                    <menu.icon className="w-6" strokeWidth={1.5} />
                    <div>{menu.title}</div>
                    <ChevronRight
                      className={` transition-all duration-400 ${
                        toggleSub ? "rotate-90 " : ""
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
                <div
                  className={`flex flex-col transition-opacity duration-1000  delay-600 ${
                    toggleSub ? "opacity-100" : " opacity-0"
                  }`}
                >
                  {toggleSub &&
                    menu.subMenu.map((sub) => (
                      <Link href={sub.path}>
                        <div
                          key={sub.title}
                          className={` hover:bg-muted-foreground p-4 cursor-pointer  `}
                        >
                          <h1 className=" ml-10">{sub.title}</h1>
                        </div>
                      </Link>
                    ))}
                </div>
              </>
            ) : (
              <div
                className="px-6 py-4 hover:bg-muted-foreground hover:cursor-pointer"
                key={menu.title}
              >
                <Link href={menu.path}>
                  <div className="flex gap-3 items-center">
                    <menu.icon className="w-6" strokeWidth={1.5} />
                    <div>{menu.title}</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarMenu;
