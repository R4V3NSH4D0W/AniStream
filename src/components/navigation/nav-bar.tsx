"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { useRouter } from "next/navigation";
import React from "react";
import { FiMenu } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

function NavBar() {
  const router = useRouter();
  return (
    <div className=" p-4 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-gray-900 to-transparent">
      {/* Small Screen */}
      <div className="block lg:hidden">
        <div className=" flex flex-row items-center  justify-between">
          <label className=" text-2xl font-semibold text-white">
            Ani<label className=" text-red-500">Stream</label>
          </label>
          <div className=" flex flex-row items-center space-x-4">
            <div className=" h-8 w-8 rounded-full flex items-center justify-center bg-red-500">
              <IoSearchOutline className=" text-white" />
            </div>
            <FiMenu size={24} className=" text-red-500" />
          </div>
        </div>
      </div>
      {/* Large Screen */}
      <div className=" hidden lg:block px-[9rem]">
        <div className=" flex flex-row items-center justify-between">
          <div className=" flex flex-row items-center space-x-4">
            <label className=" text-3xl font-semibold text-white">
              Ani<label className=" text-red-500">Stream</label>
            </label>
            <div className=" h-8 w-8 rounded-full flex items-center justify-center bg-red-500">
              <IoSearchOutline className=" text-white" />
            </div>
          </div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="text-white space-x-4 cursor-pointer">
                <NavigationMenuLink>Home</NavigationMenuLink>
                <NavigationMenuLink>Manga</NavigationMenuLink>
                <NavigationMenuLink>Drama</NavigationMenuLink>
                <NavigationMenuLink onClick={() => router.push("/movies")}>
                  Movies
                </NavigationMenuLink>
                <NavigationMenuLink className="bg-red-500 rounded-2xl p-2 px-4">
                  Signup
                </NavigationMenuLink>
                <NavigationMenuLink className=" border border-red-500 p-2 px-4 rounded-2xl text-red-500">
                  Login
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
