"use client";
import React, { useCallback, useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import Icon from "./Icon";
import { UserType } from "@/Types";
import HeaderLi from "./HeaderLi";

const HeaderClient = ({ user }: { user: UserType | null }) => {
  const [menu, setMenu] = useState(false);

  const menuBar = useCallback(() => setMenu((prev) => !prev), []);

  return (
    <>
      <div className="bg-[#0C312A] w-[100vw] z-[999] fixed top-0 h-28 text-white flex justify-between items-center px-5 md:px-12">
        <div className="pt-5">
          <h1 className="text-5xl font-Sofia leading-5 w-[178px]">
            greenhouse{" "}
            <span className="font-Roboto text-[16px] font-thin px-7 tracking-[0.2rem]">
              creative
            </span>
          </h1>
        </div>
        {menu ? (
          <div
            className="text-white text-[25px] border-green-500 border-[3px] rounded-full p-4 sm:p-[14px] sm:px-9 cursor-pointer flex flex-row-reverse gap-x-3 items-center"
            onClick={menuBar}
          >
            <RxCross1 />
            <h1 className="hidden sm:block font-bold text-xl font-Roboto">
              Close
            </h1>
          </div>
        ) : (
          <div
            className="text-white text-[25px] border-green-500 border-[3px] rounded-full p-4 sm:p-[14px] sm:px-9 cursor-pointer flex flex-row-reverse gap-x-3 items-center"
            onClick={menuBar}
          >
            <RxHamburgerMenu />
            <p className="hidden sm:block font-bold text-xl font-Roboto">
              Menu
            </p>
          </div>
        )}
      </div>
      <div className="block lg:hidden">
        <div
          onClick={menuBar}
          className={`h-[100vh] w-full z-[999] bg-[#0C312A] fixed top-[7rem] flex flex-col items-center text-white text-3xl font-Sf space-y-12 py-16 transition-all duration-500 ${
            menu ? "translate-y-0" : "-translate-y-[150vh]"
          }`}
        >
          {/* Render user-specific navigation */}
          <HeaderLi user={user} />
        </div>
      </div>
      <div className="hidden lg:block">
        <div
          className={`flex justify-between h-[100vh] w-full z-[9] fixed top-[0] ${
            menu ? "translate-y-0" : "-translate-y-[150vh]"
          } transition-all duration-500`}
        >
          <div
            onClick={menuBar}
            className="w-[50%] bg-[#0C312A] flex flex-col items-center justify-center text-white text-4xl font-Sf space-y-12 py-44"
          >
            {/* Render user-specific navigation */}
            <HeaderLi user={user} />
          </div>
          <div
            onClick={menuBar}
            className="w-[50%] flex flex-col justify-center items-center bg-cover bg-no-repeat bg-[url(/hero.jpg)]"
          >
            <Icon />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderClient;
