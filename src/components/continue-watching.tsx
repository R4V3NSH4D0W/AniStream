"use client";
import { useStorage } from "@/provider/storage-provider";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiTrash } from "react-icons/fi";
import { MdHistory } from "react-icons/md";

function ContinueWatching() {
  const { getContinueWatching, removeContinueWatching } = useStorage();
  const continueWatching = getContinueWatching();

  if (Object.keys(continueWatching).length === 0) {
    return null;
  }

  return (
    <div className="px-4 lg:px-8 -mb-6 lg:mb-0">
      <div className="mt-2 lg:mt-8">
        <div className="flex flex-row items-center  space-x-2 h-full mb-4">
          <MdHistory size={24} className="text-white" />
          <div>
            <label className=" text-xl lg:text-2xl font-semibold text-white ">
              Continue Watching
            </label>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
          {Object.keys(continueWatching).map((animeKey) => {
            const anime = continueWatching[animeKey];
            const { animeInfo, episodeId, episodeNumber } = anime;

            return (
              <div
                key={animeKey}
                className="flex-shrink-0 w-48 relative group hover:bg-gray-800/40 transition-colors rounded-lg overflow-hidden"
              >
                <Link href={`/anime/watch/${animeKey}/${episodeId}`}>
                  <div className="relative">
                    <Image
                      src={animeInfo?.image || "/default-image.jpg"}
                      alt={animeInfo?.title || "Unknown Title"}
                      width={200}
                      height={250}
                      className="object-cover aspect-[2/2.3] rounded-t-lg"
                    />

                    <button
                      onClick={() => removeContinueWatching(animeKey)}
                      className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiTrash size={20} />
                    </button>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded-b-md group-hover:bg-gray-600 transition-colors">
                    <p className="text-white text-sm font-medium truncate">
                      {animeInfo?.title}
                    </p>
                    <span className="text-xs text-gray-400 mt-1">
                      Episode {episodeNumber}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ContinueWatching;
