"use client";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "../ui/input";
import Link from "next/link";

function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="p-4 px-8 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-gray-900 to-transparent">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href={"/"}>
          <label className="text-2xl md:text-3xl font-semibold text-white cursor-pointer">
            Ani<span className="text-red-500">Stream</span>
          </label>
        </Link>

        <div className="flex items-center gap-x-4">
          <div
            className={`absolute top-full left-0 w-full px-4 py-2  transition-transform duration-300 md:static md:w-[24rem] md:bg-transparent md:p-0 md:block ${
              isSearchOpen ? "block" : "hidden"
            } md:flex`}
          >
            <Input placeholder="Search ..." className="w-full text-white" />
          </div>

          <button
            className="md:hidden text-white text-xl"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <IoSearchOutline />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
