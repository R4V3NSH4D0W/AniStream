/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { IoSearchOutline, IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { Input } from "../ui/input";
import Link from "next/link";
import { IAnimeResult } from "@consumet/extensions";
import { searchAnime } from "@/action/get-anime";
import {
  FaFire,
  FaFilm,
  FaCheckCircle,
  FaBroadcastTower,
  FaCalendarAlt,
  FaTv,
  FaPlayCircle,
  FaPlusCircle,
} from "react-icons/fa";
import Image from "next/image";

function NavBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IAnimeResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchDesktopRef = useRef<HTMLDivElement>(null);
  const searchMobileRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const SideBarItems = [
    {
      id: 1,
      name: "Most Popular",
      link: "/browse/most-popular?page=1",
      icon: <FaFire />,
    },
    { id: 2, name: "Movie", link: "/browse/movie?page=1", icon: <FaFilm /> },
    {
      id: 3,
      name: "Latest Completed",
      link: "/browse/latest-completed?page=1",
      icon: <FaCheckCircle />,
    },
    {
      id: 4,
      name: "Top Airing",
      link: "/browse/top-airing?page=1",
      icon: <FaBroadcastTower />,
    },
    {
      id: 5,
      name: "Top Upcoming",
      link: "/browse/top-upcoming?page=1",
      icon: <FaCalendarAlt />,
    },
    { id: 6, name: "ONA", link: "/browse/ONA?page=1", icon: <FaPlayCircle /> },
    { id: 7, name: "OVA", link: "/browse/OVA?page=1", icon: <FaPlayCircle /> },
    { id: 8, name: "TV", link: "/browse/TV?page=1", icon: <FaTv /> },
    {
      id: 9,
      name: "Recently Added",
      link: "/browse/recently-added?page=1",
      icon: <FaPlusCircle />,
    },
  ];
  const debouncedSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const results = await searchAnime(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedSearch(query);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [query, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isDesktop = window.innerWidth >= 768;
      let shouldCloseSearch = false;
      let shouldCloseDrawer = false;

      if (isDesktop) {
        if (
          searchDesktopRef.current &&
          !searchDesktopRef.current.contains(event.target as Node)
        ) {
          shouldCloseSearch = true;
        }
      } else {
        if (
          isSearchOpen &&
          searchMobileRef.current &&
          !searchMobileRef.current.contains(event.target as Node)
        ) {
          shouldCloseSearch = true;
        }
      }

      if (
        isDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        shouldCloseDrawer = true;
      }

      if (shouldCloseSearch) {
        setQuery("");
        setIsSearchOpen(false);
      }
      if (shouldCloseDrawer) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearchOpen, isDrawerOpen]);

  const renderResults = (results: IAnimeResult[]) => (
    <div className="absolute top-full left-0 w-full mt-2 bg-gray-800 rounded-lg shadow-xl max-h-96 overflow-y-auto z-50">
      {isSearching ? (
        <div className="p-4 text-gray-500">Searching...</div>
      ) : results.length > 0 ? (
        results.map((result) => (
          <Link
            key={result.id}
            href={`/anime/${result.id}`}
            className="flex items-center p-3 hover:bg-gray-900 transition-colors"
            onClick={() => {
              setIsSearchOpen(false);
              setQuery("");
            }}
          >
            <img
              src={result.image}
              alt={result.title as string}
              className="w-12 h-14 object-cover rounded"
            />
            <div className="ml-3">
              <p className="text-white font-medium line-clamp-1">
                {result.title as string}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div className="p-4 text-gray-500">No results found</div>
      )}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="p-4 px-2 lg:px-8 fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-gray-900 to-transparent">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center ">
            <button
              className="text-white text-2xl p-1 hover:bg-gray-800 rounded-lg transition-all"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              {isDrawerOpen ? <IoClose /> : <FiMenu />}
            </button>
            <Link href={"/"} className=" flex flex-row items-center gap-2">
              <Image
                src="/anistream.png"
                alt="AniStream"
                width={40}
                height={40}
                className="rounded-md"
              />
              <label className="text-2xl md:text-3xl font-semibold text-white cursor-pointer">
                Ani<span className="text-red-500">Stream</span>
              </label>
            </Link>
          </div>

          <div className="flex items-center gap-x-4">
            {/* Desktop Search */}
            <div
              ref={searchDesktopRef}
              className="hidden md:block relative w-[24rem]"
            >
              <Input
                placeholder="Search ..."
                className="w-full text-white pr-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && renderResults(searchResults)}
            </div>

            {/* Mobile Search Toggle */}
            <button
              className="md:hidden text-white text-xl"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <IoSearchOutline />
            </button>
          </div>
        </div>

        {/* Mobile Search Row */}
        {isSearchOpen && (
          <div ref={searchMobileRef} className="mt-4 relative md:hidden">
            <Input
              placeholder="Search ..."
              className="w-full text-white pr-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && renderResults(searchResults)}
          </div>
        )}
      </div>

      {/* Navigation Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-2 px-4 border-b border-gray-700 pt-2">
          <Link
            href={"/"}
            onClick={() => setIsDrawerOpen(false)}
            className=" flex flex-row items-center gap-2"
          >
            <Image
              src="/anistream.png"
              alt="AniStream"
              width={40}
              height={40}
              className="rounded-md"
            />
            <label className="text-2xl md:text-3xl font-semibold text-white cursor-pointer">
              Ani<span className="text-red-500">Stream</span>
            </label>
          </Link>
        </div>
        <nav className="p-2">
          <ul className="space-y-2">
            {SideBarItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.link}
                  className="flex items-center p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <span className="text-md lg:text-lg">{item.icon}</span>
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* <div className=" border-t border-gray-700">
          <ul className="px-2 py-2 space-y-2">
            <Link href={"/bookmark"} onClick={() => setIsDrawerOpen(false)}>
              <li className="flex items-center p-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                <FaRegBookmark className=" text-lg" />
                <span className="ml-2">BookMarks</span>
              </li>
            </Link>
          </ul>
        </div> */}
      </div>
    </>
  );
}

export default NavBar;
