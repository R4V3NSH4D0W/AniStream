import { Suspense } from "react";
import { getSpotLight, getGernres } from "@/action/get-anime";
import HeroSection from "@/components/home/herosection";
import GenresCard from "@/components/home/genres";
import ScheduleComponent from "@/components/home/schedule";
import { AnimeSection, VerticalCardSection } from "@/lib/helper";
import HomeSkeleton from "@/components/skeleton/home-skeleton";
import ContinueWatching from "@/components/continue-watching";

export default async function Home() {
  const spotlight = await getSpotLight();
  const genres = await getGernres();

  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<HomeSkeleton />}>
        <HeroSection spotlight={spotlight} />
        <ContinueWatching />

        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] xl:grid-cols-[75%_25%] lg:mb-4">
          <div>
            <AnimeSection category="most-favorite" />
            <AnimeSection category="top-airing" />
            <ScheduleComponent />
            <AnimeSection category="recently-added" />
          </div>

          <div className="mb-4 lg:mb-0">
            <VerticalCardSection category="most-popular" />
            <GenresCard genres={genres} />
            <VerticalCardSection category="latest-completed" slice={8} />
          </div>
        </div>
      </Suspense>
    </div>
  );
}
