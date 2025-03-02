import { AnimeCategory, fetchAnimeList } from "@/action/get-anime";
import VerticalCard from "@/components/home/vertical-card";
import { formatCategoryTitle } from "./utils";
import { Card } from "@/components/card";

export async function VerticalCardSection({
  category,
  slice = 5,
}: {
  category: AnimeCategory;
  slice?: number;
}) {
  const data = await fetchAnimeList(category, 1);

  return (
    <VerticalCard
      title={formatCategoryTitle(category)}
      slice={slice}
      verticalData={data.results.slice(0, slice)}
      viewAllLink={`/browse/${category}?page=1`}
    />
  );
}

export async function AnimeSection({ category }: { category: AnimeCategory }) {
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
