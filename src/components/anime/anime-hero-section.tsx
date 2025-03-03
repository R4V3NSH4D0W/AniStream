"use client";
import { IAnimeResult } from "@consumet/extensions";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { truncateText } from "@/lib/utils";
import { IoPlayCircleOutline } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useRouter } from "next/navigation";

interface MovieHeroSectionProps {
  animeInfo: IAnimeResult | null;
}
type Title = {
  type: "Default" | "Synonym" | "Japanese" | "English";
  title: string;
};

type IType = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

function AnimeHeroSection({ animeInfo }: MovieHeroSectionProps) {
  const router = useRouter();

  const handleWatchNowClick = () => {
    if (animeInfo?.id && animeInfo?.episodes[0]) {
      const episodeId = animeInfo?.episodes[0].id;
      router.push(`/anime/watch/${animeInfo.id}/${episodeId}`);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] lg:h-[30rem]">
      {/* Image and Title Section */}
      <div
        className="relative w-full h-full bg-cover bg-center flex items-center justify-center lg:justify-normal"
        style={{
          backgroundImage: animeInfo?.image
            ? `url(${animeInfo.image})`
            : "none",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-black/70" />
        <div className="relative z-10 text-white text-center p-8 flex flex-col items-center lg:items-start">
          <div className="flex flex-col lg:flex-row lg:space-x-6 justify-center lg:justify-start items-center lg:items-start">
            <div className="relative w-[12rem] h-[15rem] overflow-hidden rounded-md">
              <Image
                src={animeInfo?.image || ""}
                alt={animeInfo?.title as string}
                fill
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="hidden lg:block">
                <div className="flex flex-row space-x-2">
                  <label>Home</label>
                  <label>{animeInfo?.type}</label>
                  <label>{animeInfo?.title as string}</label>
                </div>
              </div>
              <label className="text-3xl font-bold lg:text-left lg:max-w-[30rem]">
                {animeInfo?.title as string}
              </label>

              <div className="hidden lg:block">
                <label className="flex text-left max-w-[50rem]">
                  {truncateText(animeInfo?.description as string, 500)}
                </label>
              </div>

              <div className="flex flex-row space-x-2 justify-center lg:justify-start">
                <Button
                  variant="ghost"
                  className="bg-red-600"
                  onClick={handleWatchNowClick}
                >
                  <IoPlayCircleOutline size={24} />
                  Watch Now
                </Button>
                <Button
                  variant="outline"
                  className="border-red-600 bg-transparent text-red-600"
                >
                  <GoPlus size={24} />
                  Bookmark
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anime Info Section */}
      <div
        className="relative w-full bg-cover bg-center flex items-center justify-start py-4"
        style={{
          backgroundImage: animeInfo?.image
            ? `url(${animeInfo.image})`
            : "none",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-md bg-black/60" />
        <div className="relative z-10 text-white p-2 lg:p-8 flex flex-col lg:mt-6 items-start">
          <div className="text-left flex flex-col space-y-2 text-md">
            <div className=" block lg:hidden">
              <div className=" flex flex-col">
                <label className=" font-semibold">Overview:</label>
                <label>
                  {" "}
                  {truncateText(animeInfo?.description as string, 500)}
                </label>
              </div>
            </div>
            <label>
              <span className=" font-semibold">Japanese:</span>{" "}
              {animeInfo?.jikanData?.title_japanese}
            </label>
            <label>
              <span className=" font-semibold">Synonyms: </span>
              {animeInfo?.jikanData?.titles
                ?.filter((t: Title) => t.type === "Synonym")
                .map((t: Title) => t.title)
                .join(", ") || "N/A"}
            </label>
            <label>
              <span className=" font-semibold">Aired:</span>{" "}
              {animeInfo?.jikanData?.aired?.string}{" "}
            </label>
            <label>
              <span className=" font-semibold">Premiered:</span>{" "}
              {animeInfo?.jikanData?.season}{" "}
            </label>
            <label>
              <span className=" font-semibold">Duration:</span>{" "}
              {animeInfo?.jikanData?.duration}{" "}
            </label>
            <label>
              <span className=" font-semibold">Status:</span>
              {animeInfo?.jikanData?.status}{" "}
            </label>

            <div>
              <div className="border-1 border-gray-400 w-full" />
              <div className="flex flex-row items-center">
                <label className="flex flex-row items-center flex-wrap my-2">
                  <span className=" font-semibold"> Genres:</span>
                  {animeInfo?.jikanData?.genres?.map((genre: IType) => (
                    <label
                      key={genre.mal_id}
                      className="border-1 px-2 rounded-sm ml-2"
                    >
                      {genre.name}
                    </label>
                  )) || "N/A"}
                </label>
              </div>
              <div className="border-1 border-gray-400 w-full" />
            </div>

            <div className="flex flex-row items-center flex-wrap">
              <label className="flex flex-row items-center space-x-1 flex-wrap">
                <span className=" font-semibold"> Studios: </span>
                {animeInfo?.jikanData?.studios?.map((Studio: IType) => (
                  <label key={Studio.mal_id}>{Studio.name}</label>
                )) || "N/A"}
              </label>
            </div>

            <div className="flex flex-row items-center flex-wrap">
              <label className="flex flex-row items-center space-x-1 flex-wrap">
                <span className=" font-semibold"> Producers: </span>
                {animeInfo?.jikanData?.producers?.map(
                  (producer: IType, index: number, arr: IType[]) => (
                    <label key={producer.mal_id}>
                      {producer.name}
                      {index < arr.length - 1 && ", "}
                    </label>
                  )
                ) || "N/A"}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeHeroSection;
