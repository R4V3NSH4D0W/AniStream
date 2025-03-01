import { getAnimeInfo } from "@/action/get-anime";
import AnimeHeroSection from "@/components/anime/anime-hero-section";
import React, { Suspense } from "react";

async function AnimeDetail({ params }: { params: { id: string } }) {
  const { id } = await params;
  const animeInfo = await getAnimeInfo(id);

  return (
    <div>
      <Suspense
        fallback={
          <div className="text-white text-center py-8">Loading anime...</div>
        }
      >
        <AnimeHeroSection animeInfo={animeInfo} />
      </Suspense>
    </div>
  );
}

export default AnimeDetail;
