"use client";
import { IAnimeResult, IMovieResult } from "@consumet/extensions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { AnimeCategory } from "@/action/get-anime";
import { FaRegKeyboard } from "react-icons/fa";
import { MdOutlineKeyboardVoice } from "react-icons/md";

interface CardProps {
  title: string;
  category?: AnimeCategory;
  animeList: IAnimeResult[] | IMovieResult[];
  viewAllLink: string;
  showViewAll: boolean;
}

export function Card({
  title,
  animeList,
  viewAllLink,
  showViewAll,
}: CardProps) {
  const router = useRouter();

  return (
    <div className="mt-5 p-4 lg:p-2 lg:px-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {showViewAll && (
          <Button
            variant="ghost"
            className="text-red-500 hover:bg-transparent hover:text-red-600 cursor-pointer"
            onClick={() => router.push(viewAllLink)}
          >
            View All
            <IoIosArrowForward className="ml-1" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 ">
        {animeList.map((anime) => (
          <div
            key={anime.id}
            className="relative cursor-pointer transition-transform hover:scale-105"
            onClick={() => router.push(`/anime/${anime.id}`)}
          >
            <Image
              src={anime.image || "/placeholder.jpg"}
              alt={anime.title?.toString() || "Anime image"}
              width={300}
              height={400}
              className="rounded-lg object-cover aspect-[2/3] "
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent rounded-b-md">
              <p className="text-white text-sm lg:text-md font-medium truncate">
                {anime.title as string}
              </p>
              <div className=" flex flex-row space-x-2 mt-2">
                <div className="flex flex-row items-center text-white text-sm space-x-2 bg-red-700 bg-opacity-50 px-2 py-1 rounded-sm">
                  <FaRegKeyboard />
                  <label>{anime.sub}</label>
                </div>
                <div className="flex flex-row items-center text-white text-sm space-x-2 bg-green-500 bg-opacity-50 px-2 py-1 rounded-sm">
                  <MdOutlineKeyboardVoice />
                  <label>{anime.dub}</label>
                </div>
              </div>
            </div>
            <div className=" absolute top-2 left-2 bg-red-700 text-white px-2 py-1 rounded-lg">
              {anime.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
