import { getAnimeInfo } from "@/action/get-anime";
import AnimeHeroSection from "@/components/anime/anime-hero-section";
import { Card } from "@/components/card";
import EpisodesCard from "@/components/episode-card";

import { VerticalCardSection } from "@/lib/helper";
import React, { Suspense } from "react";

async function AnimeDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const animeInfo = await getAnimeInfo(id);

  return (
    <div className="space-y-8">
      <Suspense
        fallback={
          <div className="text-white text-center py-8">Loading anime...</div>
        }
      >
        <AnimeHeroSection animeInfo={animeInfo} />
      </Suspense>

      {animeInfo?.episodes && (
        <EpisodesCard episodes={animeInfo?.episodes} id={animeInfo.id} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] xl:grid-cols-[75%_25%]  ">
        <Card
          title="Recommended for you"
          animeList={animeInfo?.recommendations}
          viewAllLink={""}
          showViewAll={false}
        />
        <VerticalCardSection category="most-popular" slice={7} />
      </div>
    </div>
  );
}

export default AnimeDetail;
