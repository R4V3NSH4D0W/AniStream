export const dynamic = "force-dynamic";
import { getAnimeInfo } from "@/action/get-anime";
import AnimeHeroSection from "@/components/anime/anime-hero-section";
import { Card } from "@/components/card";
import EpisodesCard from "@/components/episode-card";
import { VerticalCardSection } from "@/lib/helper";
import React from "react";

async function AnimeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const animeInfo = await getAnimeInfo(id);

  return (
    <div className="space-y-8 mb-4">
      <AnimeHeroSection animeInfo={animeInfo} />

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
