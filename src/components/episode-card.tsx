"use client";

import { useStorage } from "@/provider/storage-provider";
import { IAnimeEpisode } from "@consumet/extensions";
import Link from "next/link";
import { useState } from "react";

export default function EpisodesCard({
  episodes,
  id,
}: {
  episodes: IAnimeEpisode[] | null;
  id: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayCount, setDisplayCount] = useState(50);
  const [currentRange, setCurrentRange] = useState<[number, number]>([1, 50]);
  const { getPlayedDuration } = useStorage();

  const filteredEpisodes = episodes?.filter(
    (ep) =>
      ep.number.toString().includes(searchTerm) ||
      ep.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEpisodes = episodes?.length || 0;
  const ranges: [number, number][] = [];
  for (let i = 0; i < totalEpisodes; i += 50) {
    ranges.push([i + 1, Math.min(i + 50, totalEpisodes)]);
  }

  const visibleEpisodes = searchTerm
    ? filteredEpisodes
    : filteredEpisodes?.slice(currentRange[0] - 1, currentRange[1]);

  const loadMore = () => {
    setDisplayCount((prev) => prev + 50);
    setCurrentRange([1, displayCount + 50]);
  };

  const calculateBackgroundFill = (episodeId: string) => {
    const playedDuration = getPlayedDuration(id, episodeId);
    return `linear-gradient(to right, rgba(220, 38, 38, 0.8) ${playedDuration}%, rgba(75, 85, 99, 0.5) ${playedDuration}%)`;
  };

  return (
    <div className="px-4 md:px-6 bg-gray-800">
      <div className="w-full">
        <div className="mb-4 space-y-2">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
            <label className="text-2xl font-bold text-white">Episodes</label>

            <div className="flex flex-col md:flex-row md:items-center w-full md:w-auto gap-2">
              {!searchTerm && (
                <select
                  className="text-white px-3 py-2 md:py-3 rounded-lg bg-gray-700 border border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-red-500 w-full md:w-auto"
                  value={currentRange.join("-")}
                  onChange={(e) => {
                    const [start, end] = e.target.value.split("-").map(Number);
                    setCurrentRange([start, end]);
                  }}
                >
                  {ranges.map(([start, end]) => (
                    <option key={start} value={`${start}-${end}`}>
                      Episodes {start} - {end}
                    </option>
                  ))}
                </select>
              )}
              <div className="relative w-full md:w-[24rem]">
                <input
                  type="text"
                  placeholder="Search episodes..."
                  className="w-full px-4 py-2 md:py-3 rounded-lg text-white bg-gray-700 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-red-500 pr-12 border border-gray-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute right-3 top-2.5 md:top-3 h-6 w-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
          {visibleEpisodes?.map((ep) => (
            <Link
              key={ep.id}
              href={`/anime/watch/${id}/${ep.id}`}
              className="group relative block p-4 bg-gray-700 rounded-lg
                hover:bg-gray-600 transition-all duration-200 border border-gray-600
                hover:border-red-500/30 hover:shadow-xl"
              style={{
                background: calculateBackgroundFill(ep.id),
              }}
            >
              <div
                className="absolute top-2 right-2 text-xs font-bold px-2 py-1 
                bg-red-600 rounded-md text-white"
              >
                EP {ep.number}
              </div>
              <div className="text-white font-medium truncate pr-14 text-sm">
                {ep.title || `Episode ${ep.number}`}
              </div>
              <div
                className="mt-2 text-xs text-red-400 opacity-0 group-hover:opacity-100 
                transition-opacity duration-200"
              >
                Watch Now →
              </div>
            </Link>
          ))}
        </div>

        {visibleEpisodes?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No episodes found matching your search
            </p>
          </div>
        )}

        {!searchTerm && visibleEpisodes && currentRange[1] < totalEpisodes && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg
                transition-all duration-200 font-semibold border border-red-700/50"
            >
              Load More (+50)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
