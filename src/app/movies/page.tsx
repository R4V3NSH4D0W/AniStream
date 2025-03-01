// app/movies/page.tsx
import {
  getRecentMovie,
  getRecentTVShows,
  getTrendingMovie,
} from "@/action/get-drama";
import { MovieCard } from "@/components/movie-card";
import { Suspense } from "react";

async function Movies() {
  const trendingTvShows = await getRecentTVShows();
  const recentMovie = await getRecentMovie();
  const trendingMovie = await getTrendingMovie();

  return (
    <div className="mt-[5rem]">
      <Suspense
        fallback={
          <div className="text-white text-center">Loading movies...</div>
        }
      >
        <MovieCard
          title="Trending TV Shows"
          movieList={
            Array.isArray(trendingTvShows.results)
              ? trendingTvShows.results
              : []
          }
        />
        {/* <MovieCard title="Recent Movies" movieList={recentMovie.results} />
        <MovieCard title="Trending Movies" movieList={trendingMovie.results} /> */}
      </Suspense>
    </div>
  );
}

export default Movies;
