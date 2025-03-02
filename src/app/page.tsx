export const dynamic = "force-dynamic";
import { Suspense } from "react";
import { getSpotLight, getGernres } from "@/action/get-anime";

import HeroSection from "@/components/home/herosection";
import GenresCard from "@/components/home/genres";
import ScheduleComponent from "@/components/home/schedule";
import { AnimeSection, VerticalCardSection } from "@/lib/helper";

export default async function Home() {
  const spotlight = await getSpotLight();
  const genres = await getGernres();

  return (
    <div className="min-h-screen bg-gray-900">
      <HeroSection spotlight={spotlight} />

      <div className="grid grid-cols-1  lg:grid-cols-[70%_30%] xl:grid-cols-[75%_25%]">
        <div>
          <Suspense fallback={<div>Loading Anime Sections...</div>}>
            <AnimeSection category="top-airing" />
            <AnimeSection category="recently-added" />
            <ScheduleComponent />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<div>Loading Vertical Cards...</div>}>
            <VerticalCardSection category="most-popular" />
          </Suspense>
          <GenresCard genres={genres} />
        </div>
      </div>
    </div>
  );
}
