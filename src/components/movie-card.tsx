// components/movie-card.tsx
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IMovieResult } from "@consumet/extensions";

interface MovieCardProps {
  title: string;
  movieList: IMovieResult[];
}

export function MovieCard({ title, movieList }: MovieCardProps) {
  const router = useRouter();
  const handleMovieClick = (id: string) => {
    const encodedId = encodeURIComponent(id);
    router.push(`/movies/${encodedId}`);
  };

  return (
    <div className="mt-5 p-2 lg:px-40">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
        {movieList.map((movie) => (
          <div
            key={movie.id}
            className="relative cursor-pointer transition-transform hover:scale-105"
            onClick={() => handleMovieClick(movie.id)}
          >
            <Image
              src={movie.image || "/placeholder.jpg"}
              alt={movie.title as string}
              width={300}
              height={400}
              className="rounded-lg object-cover aspect-[2/3] hidden lg:block"
            />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
              <p className="text-white text-sm font-medium truncate">
                {movie.title as string}
              </p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-xs text-gray-300">
                  {movie.releaseDate}
                </span>
                <span className="text-xs text-gray-300">
                  {movie.duration as string}
                </span>
              </div>
            </div>
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-sm text-sm">
              {movie.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
