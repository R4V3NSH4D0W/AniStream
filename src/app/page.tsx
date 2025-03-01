import {
  getSpotLight,
  fetchAnimeList,
  type AnimeCategory,
} from "@/action/get-anime";
import { Card } from "@/components/card";

import HeroSection from "@/components/home/herosection";
import { Suspense } from "react";

const animeCategories: AnimeCategory[] = [
  "top-airing",
  "most-favorite",
  "most-popular",
  "movie",
  "recently-added",
];

export default async function Home() {
  const spotlight = await getSpotLight();

  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection spotlight={spotlight} />
      </Suspense>

      {animeCategories.map((category) => (
        <Suspense key={category} fallback={<div>Loading...</div>}>
          <AnimeSection category={category} />
        </Suspense>
      ))}
    </div>
  );
}

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

function formatCategoryTitle(category: AnimeCategory): string {
  return category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
