"use client";
import { IAnimeResult } from "@consumet/extensions";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { AnimeCategory } from "@/action/get-anime";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { BsCcSquare } from "react-icons/bs";

interface BrowseCardProps {
  title: string;
  animeList: IAnimeResult[];
  currentPage: number;
  hasNextPage: boolean | undefined;
  category: AnimeCategory | string;
  type?: string;
}

export default function BrowseCard({
  title,
  animeList,
  currentPage,
  hasNextPage,
  category,
  type,
}: BrowseCardProps) {
  const router = useRouter();

  const handlePagination = (direction: "prev" | "next") => {
    const newPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (type === "genre") {
      router.push(`/genres/${category}?page=${newPage}`);
    } else {
      router.push(`/browse/${category}?page=${newPage}`);
    }
  };

  return (
    <div className="p-4 lg:px-8">
      <h1 className="text-3xl font-bold text-white mb-8">{title}</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
        {animeList.map((anime) => (
          <div
            key={anime.id}
            className="relative cursor-pointer group transition-transform duration-300 transform hover:scale-105"
            onClick={() => router.push(`/anime/${anime.id}`)}
          >
            <Image
              src={anime.image || "/placeholder.jpg"}
              alt={anime.title?.toString() || "Anime image"}
              width={300}
              height={400}
              className="rounded-lg object-cover aspect-[2/3]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
              <p className="text-white text-sm lg:text-md font-medium truncate">
                {anime.title as string}
              </p>
              <div className="flex flex-row space-x-1 mt-2">
                <div className="flex flex-row items-center text-white text-sm space-x-1 bg-red-700 bg-opacity-50 px-2 py-1 rounded-sm">
                  <BsCcSquare />
                  <label>{anime.sub}</label>
                </div>
                <div className="flex flex-row items-center text-white text-sm space-x-1 bg-green-500 bg-opacity-50 px-2 py-1 rounded-sm">
                  <MdOutlineKeyboardVoice />
                  <label>{anime.dub}</label>
                </div>
              </div>
            </div>
            <div className="absolute top-2 left-2 bg-red-700 text-white px-2 py-1 rounded-lg">
              {anime.type}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          variant="ghost"
          className="text-red-500 gap-1 hover:text-white hover:bg-red-500"
          disabled={currentPage === 1}
          onClick={() => handlePagination("prev")}
        >
          <IoIosArrowBack className="text-lg" />
          Previous
        </Button>

        <span className="flex items-center px-4 text-white font-medium">
          Page-<span className=" text-red-500"> {currentPage}</span>
        </span>

        <Button
          variant="ghost"
          className="text-red-500 gap-1 hover:text-white hover:bg-red-500"
          disabled={!hasNextPage}
          onClick={() => handlePagination("next")}
        >
          Next
          <IoIosArrowForward className="text-lg" />
        </Button>
      </div>
    </div>
  );
}
