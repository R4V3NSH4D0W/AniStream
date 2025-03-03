"use client";

import React, { useState } from "react";
import { IAnimeResult } from "@consumet/extensions";
import { motion } from "framer-motion";
import Image from "next/image";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Button } from "../ui/button";
import { FaPlus, FaRegPlayCircle } from "react-icons/fa";
import { IoCalendarOutline, IoPlayCircleOutline } from "react-icons/io5";
import { truncateText } from "@/lib/utils";
import { GoClock } from "react-icons/go";
import { MdOutlineMicNone } from "react-icons/md";
import { BsCcSquare } from "react-icons/bs";
import { useStorage } from "@/provider/storage-provider";

interface HeroSectionProps {
  spotlight: IAnimeResult[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ spotlight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addBookmark, removeBookmark, bookmarks } = useStorage();
  console.log("Bookamrks", bookmarks);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % spotlight.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + spotlight.length) % spotlight.length
    );
  };

  const toggleBookmark = (id: string) => {
    if (bookmarks.includes(id)) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };

  return (
    <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden z-40">
      {/* Gradient Overlay Layer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-transparent z-10" />

      {spotlight.map((anime, index) => (
        <motion.div
          key={anime.id}
          className="absolute inset-0 w-full h-full  transition-opacity"
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={anime.banner || ""}
            alt={anime.title as string}
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
          />
          <div className="absolute bottom-10 left-4 lg:bottom-0  lg:top-20  lg:left-8 z-20 flex flex-col space-y-4">
            <label className="text-white text-lg font-bold">
              #{anime.rank as string}. Spotlight
            </label>
            <label className="text-white text-xl lg:text-3xl font-bold w-2xl max-w-[20rem] lg:max-w-full ">
              {anime.title as string}
            </label>
            <div className=" flex flex-row items-center space-x-3 text-white flex-wrap">
              <div className=" flex flex-row items-center space-x-1 space-y-1">
                <IoPlayCircleOutline />
                <span> {anime.type}</span>
              </div>
              <div className=" flex flex-row items-center space-x-1">
                <GoClock />
                <span> {anime.duration}</span>
              </div>
              <div className=" flex flex-row items-center space-x-1">
                <IoCalendarOutline />
                <span> {anime.releaseDate}</span>
              </div>
              <div className=" flex flex-row items-center space-x-2">
                <span>{anime.quality}</span>
                <div className=" flex flex-row items-center space-x-1">
                  <div className=" flex flex-row justify-center items-center bg-green-600 px-2 rounded-l-md">
                    <BsCcSquare />
                    <label className=" pl-1"> {anime.dub}</label>
                  </div>
                  <div className=" flex flex-row justify-center items-center bg-red-600 px-2 rounded-r-md">
                    <MdOutlineMicNone />
                    <label className=" pl-1"> {anime.dub}</label>
                  </div>
                </div>
              </div>
            </div>
            <label className=" text-white max-w-[40rem] hidden lg:block">
              {truncateText(anime.description as string, 600)}
            </label>
            <div className=" flex flex-row space-x-4 mt-4 z-30">
              <Button className=" bg-red-500 text-white rounded-2xl text-sm lg:text-md hover:bg-red-600">
                <FaRegPlayCircle />
                Watch Now
              </Button>
              <Button
                variant="outline"
                className={`border-red-500 text-sm lg:text-md ${
                  bookmarks.includes(anime.id)
                    ? "bg-red-500 text-white"
                    : "bg-transparent text-red-500"
                }`}
                onClick={() => toggleBookmark(anime.id)}
              >
                <FaPlus />
                {bookmarks.includes(anime.id) ? "Bookmarked" : "Bookmark"}
              </Button>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Navigation Buttons */}
      <div className=" absolute right-2 lg:right-5 bottom-4  z-20">
        <div className=" flex flex-col space-y-2">
          <Button
            variant="outline"
            className=" bg-transparent text-white"
            onClick={prevSlide}
          >
            <GrLinkNext />
          </Button>

          <Button
            variant="outline"
            className=" bg-transparent text-white"
            onClick={nextSlide}
          >
            <GrLinkPrevious />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
