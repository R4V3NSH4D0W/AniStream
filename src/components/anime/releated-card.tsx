import { IAnimeInfo } from "@consumet/extensions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IReleatedProps {
  title: string;
  animeInfo: IAnimeInfo | null;
}

function ReleatedCard({ title, animeInfo }: IReleatedProps) {
  return (
    <div className=" px-4 lg:px-8 -mb-4">
      {animeInfo?.relatedAnime?.length > 0 && (
        <div className="mt-8">
          <h2 className=" text-lg lg:text-2xl font-semibold text-white mb-4">
            {title}
          </h2>
          <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
            {animeInfo?.relatedAnime.map((rel: IAnimeInfo) => (
              <div
                key={rel.id}
                className="flex-shrink-0 w-43 lg:w-48 h-70 lg:h-72 relative group hover:bg-gray-800/40 transition-colors rounded-lg overflow-hidden"
              >
                <Link
                  key={rel.id}
                  href={`/anime/${rel?.id}`}
                  className="flex-shrink-0 w-48"
                >
                  <div className="relative w-full h-55">
                    <Image
                      src={rel?.image || "/default-image.jpg"}
                      alt={(rel?.title as string) || "Unknown Title"}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <div className="p-3 z-40  bg-gray-800/50 rounded-b-md group-hover:bg-gray-700/40 transition-colors">
                    <p className="text-white text-sm font-medium truncate">
                      {rel.title as string}
                    </p>
                    <span className="text-xs text-gray-200 mt-1">
                      {rel.type}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReleatedCard;
