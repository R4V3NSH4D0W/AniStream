"use client";

import React, { useState } from "react";
import { IAnimeResult } from "@consumet/extensions";
import { motion } from "framer-motion";
import Image from "next/image";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Button } from "../ui/button";
import { FaPlus, FaRegPlayCircle } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import { truncateText } from "@/lib/utils";

interface HeroSectionProps {
  spotlight: IAnimeResult[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ spotlight }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % spotlight.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + spotlight.length) % spotlight.length
    );
  };

  return (
    <div className="relative w-full h-[500px] lg:h-[600px] overflow-hidden z-40">
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
          <div className="absolute bottom-4 left-2 lg:bottom-0  lg:top-20  lg:left-40 z-20 flex flex-col space-y-2">
            <label className="text-white text-3xl font-bold">
              #{anime.rank as string}. Spotlight
            </label>
            <label className="text-white text-2xl font-bold ">
              {anime.title as string}
            </label>
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
                className=" border-red-500 bg-transparent text-red-500 rounded-2xl text-sm lg:text-md hover:bg-red-600 hover:text-white"
              >
                <FaPlus />
                Bookmark
              </Button>
            </div>
            <div className=" flex flex-row items-center space-x-4 py-2">
              <label className=" p-2 bg-red-500 rounded-lg text-white px-4 text-sm lg:text-md">
                {anime.quality}
              </label>
              <div className=" flex flex-row space-x-2 items-center text-white text-sm lg:text-md">
                <IoCalendarOutline size={26} />
                <label>{anime.releaseDate}</label>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Navigation Buttons */}
      <div className=" absolute right-2 lg:right-5 bottom-10 transform -translate-y-1/2 z-20">
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
      {/* <button
        onClick={prevSlide}
        className="absolute left-2 lg:left-5 top-1/2 transform -translate-y-1/2 z-20 border p-2 text-white cursor-pointer hover:scale-105"
      >
        <GrLinkPrevious />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 lg:right-5 top-1/2 transform -translate-y-1/2 z-20 border p-2 text-white cursor-pointer hover:scale-105"
      >
        <GrLinkNext />
      </button> */}
    </div>
  );
};

export default HeroSection;
