"use client";
import React from "react";
import { Skeleton } from "../ui/skeleton";

function AnimeHeroSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] ">
      {/* Image and Title Section */}
      <div className="relative w-full h-full bg-gray-800 flex items-center justify-center lg:justify-normal">
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-white text-center p-8 flex flex-col items-center lg:items-start">
          <div className="flex flex-col lg:flex-row lg:space-x-6 justify-center lg:justify-start items-center lg:items-start">
            <Skeleton className="w-[12rem] h-[15rem] rounded-md" />
            <div className="flex flex-col space-y-2">
              <div className="hidden lg:block">
                <Skeleton className="w-32 h-6" />
                <Skeleton className="w-48 h-6 mt-2" />
              </div>
              <Skeleton className="w-60 h-8 mt-2" />
              <div className="hidden lg:block">
                <Skeleton className="w-[50rem] h-16" />
              </div>
              <div className="flex flex-row space-x-2 justify-center lg:justify-start">
                <Skeleton className="w-32 h-10 rounded" />
                <Skeleton className="w-32 h-10 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Anime Info Section */}
      <div className="relative w-full bg-gray-800 flex items-center justify-start py-4">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white p-2 lg:p-8 flex flex-col lg:mt-6 items-start">
          <div className="text-left flex flex-col space-y-2 text-md">
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-56 h-6" />
            <Skeleton className="w-48 h-6" />
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-40 h-6" />
            <Skeleton className="w-44 h-6" />
            <div className="flex flex-wrap gap-2 mt-2">
              <Skeleton className="w-16 h-6 rounded" />
              <Skeleton className="w-16 h-6 rounded" />
              <Skeleton className="w-16 h-6 rounded" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeHeroSkeleton;
