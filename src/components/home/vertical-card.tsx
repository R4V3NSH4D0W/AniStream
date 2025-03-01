import { IAnimeResult } from "@consumet/extensions";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { truncateText } from "@/lib/utils";
import { BsCcSquare } from "react-icons/bs";
import { IoMicOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { FaAngleRight } from "react-icons/fa";

interface IVerticalCardProps {
  title: string;
  verticalData: IAnimeResult[];
  viewAllLink: string;
}

function VerticalCard({
  title,
  verticalData,
  viewAllLink,
}: IVerticalCardProps) {
  return (
    <div className="mt-4 lg:mt-8 px-2 sm:px-4 lg:px-0 flex flex-col space-y-2 w-full ">
      <span className="text-white text-xl sm:text-2xl font-semibold px-2 sm:px-0">
        {title}
      </span>
      <div className="flex flex-col space-y-2 sm:space-y-4 mt-1 sm:mt-2">
        {verticalData.slice(0, 6).map((anime) => (
          <div key={anime.id} className="group">
            <div className="flex flex-row space-x-2 sm:space-x-3 text-white p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
              {/* Image Container */}
              <div className="relative w-16 h-20 sm:w-20 sm:h-22 aspect-square">
                <Image
                  src={anime.image || "/placeholder.jpg"}
                  fill
                  alt={anime.title as string}
                  className="rounded-md object-cover"
                  sizes="(max-width: 640px) 64px, 80px"
                />
              </div>

              {/* Content Container */}
              <div className="flex flex-col justify-center flex-1">
                <label className="font-medium text-sm sm:text-base truncate">
                  {truncateText(anime.title as string, 40)}
                </label>

                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-1 mt-0.5 sm:mt-1">
                  <div className="flex items-center space-x-1 bg-red-700 px-1 py-0.5 rounded-l-sm text-xs">
                    <BsCcSquare className="hidden sm:inline" size={12} />
                    <span>{anime.sub}</span>
                  </div>

                  <div className="flex items-center space-x-1 bg-green-600 px-1 py-0.5 text-xs">
                    <IoMicOutline className="hidden sm:inline" size={12} />
                    <span>{anime.dub}</span>
                  </div>

                  <span className="bg-pink-800 px-1 py-0.5 rounded-r-sm text-xs">
                    {anime.episodes}
                  </span>

                  <span className="text-xs sm:text-sm font-semibold ml-1">
                    {anime.type}
                  </span>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mx-2 sm:mx-0 w-full" />
          </div>
        ))}

        <Link href={viewAllLink} className="px-2 sm:px-0">
          <Button
            variant="ghost"
            className="w-full sm:w-auto text-red-500 hover:underline text-sm hover:bg-transparent hover:text-red-800 justify-between"
          >
            View More
            <FaAngleRight className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default VerticalCard;
