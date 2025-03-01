import { getMovieInfo } from "@/action/get-drama";
import MovieHeroSection from "@/components/movie/movie-hero-section";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

async function MoviePage({ params }: { params: { id: string } }) {
  const decodedId = decodeURIComponent(params.id);
  const movieInfo = await getMovieInfo(decodedId);
  return (
    <div>
      <Suspense
        fallback={
          <div className="text-white text-center">Loading movie...</div>
        }
      >
        <MovieHeroSection movieInfo={movieInfo} />
        <div className="px-2 lg:px-40">
          {movieInfo && movieInfo.episodes && movieInfo.episodes.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Episodes
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {movieInfo.episodes.map((episode) => (
                  <Link
                    key={episode.id}
                    href={`/movies/watch/${encodeURIComponent(
                      movieInfo.id
                    )}/${encodeURIComponent(episode.id)}`}
                    className=" p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white font-medium truncate">
                          {episode.title}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Season {episode.season} • Episode {episode.number}
                        </p>
                      </div>
                      <span className="text-gray-400">▶</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {movieInfo &&
            movieInfo.recommendations &&
            movieInfo.recommendations.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  More Like This
                </h2>
                <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
                  {movieInfo.recommendations.map((rec) => (
                    <Link
                      key={rec.id}
                      href={`/movies/${encodeURIComponent(rec.id)}`}
                      className="flex-shrink-0 w-48"
                    >
                      <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
                        <Image
                          src={rec.image || "/default-image.jpg"}
                          alt={rec.title as string}
                          width={200}
                          height={300}
                          className="object-cover aspect-[2/3]"
                        />
                        <div className="p-3">
                          <p className="text-white text-sm font-medium truncate">
                            {rec.title as string}
                          </p>
                          <span className="text-xs text-gray-400 mt-1">
                            {rec.type}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      </Suspense>
    </div>
  );
}

export default MoviePage;
