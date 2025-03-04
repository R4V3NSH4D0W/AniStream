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
    <div className=" px-2 lg:px-8">
      {animeInfo?.relatedAnime?.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
          <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
            {animeInfo?.relatedAnime.map((rel: IAnimeInfo) => (
              <Link
                key={rel.id}
                href={`/anime/${rel?.id}`}
                className="flex-shrink-0 w-48"
              >
                <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                  <Image
                    src={rel.image || "/default-image.jpg"}
                    alt={rel.title as string}
                    width={200}
                    height={250}
                    className="object-cover aspect-[2/2.3]"
                  />
                  <div className="p-3">
                    <p className="text-white text-sm font-medium truncate">
                      {rel.title as string}
                    </p>
                    <span className="text-xs text-gray-400 mt-1">
                      {rel.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReleatedCard;
