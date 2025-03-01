import { AnimeCategory, fetchAnimeList } from "@/action/get-anime";
import NavBar from "@/components/navigation/nav-bar";
import { Suspense } from "react";
import BrowseCard from "@/components/browse-card";

export default async function BrowsePage({
  params,
  searchParams,
}: {
  params: { category: AnimeCategory };
  searchParams: { page?: string };
}) {
  const currentPage = Number(searchParams.page) || 1;
  const data = await fetchAnimeList(params.category, currentPage);

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <NavBar />
      <Suspense
        fallback={
          <div className="text-white text-center py-8">Loading anime...</div>
        }
      >
        <BrowseCard
          title={formatCategoryTitle(params.category)}
          animeList={data.results}
          currentPage={currentPage}
          hasNextPage={data.hasNextPage}
          category={params.category}
        />
      </Suspense>
    </div>
  );
}

function formatCategoryTitle(category: string): string {
  return category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
