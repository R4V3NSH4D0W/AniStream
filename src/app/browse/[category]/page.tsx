import { AnimeCategory, fetchAnimeList } from "@/action/get-anime";
import BrowseCard from "@/components/browse-card";

export default async function BrowsePage({
  params,
  searchParams,
}: {
  params: Promise<{ category: AnimeCategory }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 1;
  const data = await fetchAnimeList(resolvedParams.category, currentPage);

  return (
    <div className="min-h-screen mt-14">
      <BrowseCard
        title={formatCategoryTitle(resolvedParams.category)}
        animeList={data.results}
        currentPage={currentPage}
        hasNextPage={data.hasNextPage}
        category={resolvedParams.category}
      />
    </div>
  );
}

function formatCategoryTitle(category: string): string {
  return category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
