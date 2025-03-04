"use client";
import { IAnimeInfo } from "@consumet/extensions";
import Link from "next/link";
import { FiPlay, FiChevronRight, FiClock } from "react-icons/fi";
import { useState } from "react";
import { useStorage } from "@/provider/storage-provider";
import clsx from "clsx";

interface EpisodeListProps {
  episodes: IAnimeInfo["episodes"];
  currentEpisodeId: string;
  animeId: string;
}

const EpisodeList = ({
  episodes,
  currentEpisodeId,
  animeId,
}: EpisodeListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { getPlayedDuration } = useStorage();

  const filteredEpisodes = episodes?.filter(
    (episode) =>
      episode.number.toString().includes(searchTerm) ||
      episode.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl p-4 h-[700px] overflow-y-auto border border-gray-800 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-700 bg-clip-text text-transparent">
          Episodes
        </h3>
        <input
          type="text"
          placeholder="Search episode..."
          className="px-3 py-1 rounded-lg bg-gray-800/30 text-white border border-gray-600 "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        {filteredEpisodes?.map((episode) => {
          const isCurrent = episode.id === currentEpisodeId;
          const playedPercentage = getPlayedDuration(animeId, episode.id);

          return (
            <Link
              key={episode.id}
              href={`/anime/watch/${animeId}/${episode.id}`}
              className={`group relative flex items-center p-3 rounded-lg transition-all duration-300 ${
                isCurrent
                  ? "bg-gradient-to-r from-red-500/30 to-red-500/30 border border-red-600/50"
                  : "hover:bg-gray-700/50 border border-transparent hover:border-gray-600"
              }`}
            >
              {/* Progress bar showing played percentage */}
              <div
                className={clsx("absolute bottom-0 left-0 h-[2px] bg-red-500")}
                style={{
                  width: playedPercentage > 0 ? `${playedPercentage}%` : "2%",
                }}
              />

              <div className="flex-shrink-0">
                <div
                  className={`mr-3 ${
                    isCurrent ? "text-white" : "text-red-500"
                  }`}
                >
                  {isCurrent ? (
                    <FiPlay className="text-white text-lg" />
                  ) : (
                    <span className="text-gray-300 group-hover:text-white">
                      {episode.number}
                    </span>
                  )}
                </div>
              </div>

              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-sm truncate ${
                      isCurrent
                        ? "text-purple-50 font-semibold"
                        : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {episode.title || `Episode ${episode.number}`}
                  </p>
                  {episode.isFiller && (
                    <span className="flex items-center px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs">
                      <FiClock className="mr-1" />
                      Filler
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-400">24m • HD • Sub</span>
                </div>
              </div>

              <FiChevronRight
                className={`ml-2 text-lg ${
                  isCurrent ? "text-purple-300" : "text-gray-500"
                }`}
              />
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 80, 80, 0.5);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default EpisodeList;
