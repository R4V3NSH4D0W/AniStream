"use client";
import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Button } from "../ui/button";
import { getColorFromLetter } from "@/lib/utils";

interface IGenresProps {
  genres: string[] | null;
}

function GenresCard({ genres }: IGenresProps) {
  const [showAll, setShowAll] = useState(false);
  const visibleGenres = showAll ? genres : genres?.slice(0, 26);

  return (
    <div className="mt-8 px-4 lg:px-0 flex flex-col space-y-2 w-full">
      <label className="text-2xl text-white font-bold">Genres</label>
      <div className="grid grid-cols-3 gap-2">
        {visibleGenres?.map((genre, index) => (
          <span
            key={index}
            className={`px-3 py-1 text-left rounded-md ${getColorFromLetter(
              genre
            )} cursor-pointer`}
          >
            {genre}
          </span>
        ))}
      </div>
      {genres && genres.length > 16 && (
        <Button
          variant="ghost"
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-red-500 hover:underline w-[8rem] hover:bg-transparent hover:text-red-800"
        >
          {showAll ? "Show Less" : "Show More"}
          <FaAngleRight />
        </Button>
      )}
    </div>
  );
}

export default GenresCard;
