import { IAnimeResult } from "@consumet/extensions";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { FaPlus, FaRegPlayCircle } from "react-icons/fa";

interface MovieHeroSectionProps {
  animeInfo: IAnimeResult | null;
}

function AnimeHeroSection({ animeInfo }: MovieHeroSectionProps) {
  return (
    <div className="relative w-full h-[500px]  overflow-hidden z-40">
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-transparent z-10" />

      <div className="absolute inset-0 w-full h-full  transition-opacity">
        {animeInfo && (
          <Image
            src={animeInfo.image as string}
            alt={animeInfo.title as string}
            layout="fill"
            objectFit="cover"
            className="absolute z-0"
          />
        )}
        <div className="absolute bottom-4 left-2 lg:bottom-0  lg:top-20  lg:left-40 z-20 flex flex-col space-y-2">
          <div className=" flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-x-4">
            <Image
              src={animeInfo?.image as string}
              alt={animeInfo?.title as string}
              width={200}
              height={300}
              className="rounded-lg object-cover aspect-[2/3] hidden lg:block"
            />
            <div className=" flex flex-col space-y-2">
              <label className="text-white text-3xl font-bold">
                {animeInfo?.title as string}
              </label>
              <label className=" text-white max-w-[40rem] ">
                {animeInfo?.description as string}
              </label>
              <label className=" text-white max-w-[40rem] ">
                {animeInfo?.country as string}
              </label>
              <div className=" flex flex-row space-x-4 mt-2 z-30">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeHeroSection;
