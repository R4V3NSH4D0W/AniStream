export const dynamic = "force-dynamic";
import { Suspense } from "react";
import {
  getSpotLight,
  fetchAnimeList,
  type AnimeCategory,
  getGernres,
} from "@/action/get-anime";
import { Card } from "@/components/card";
import HeroSection from "@/components/home/herosection";
import VerticalCard from "@/components/home/vertical-card";
import GenresCard from "@/components/home/genres";
import ScheduleComponent from "@/components/home/schedule";

async function AnimeSection({ category }: { category: AnimeCategory }) {
  const data = await fetchAnimeList(category, 1);

  return (
    <Card
      title={formatCategoryTitle(category)}
      category={category}
      animeList={data.results.slice(0, 12)}
      viewAllLink={`/browse/${category}?page=1`}
      showViewAll={data.results.length > 12}
    />
  );
}

async function VerticalCardSection({ category }: { category: AnimeCategory }) {
  const data = await fetchAnimeList(category, 1);

  return (
    <VerticalCard
      title={formatCategoryTitle(category)}
      verticalData={data.results.slice(0, 5)}
      viewAllLink={`/browse/${category}?page=1`}
    />
  );
}

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

function formatCategoryTitle(category: AnimeCategory): string {
  return category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
