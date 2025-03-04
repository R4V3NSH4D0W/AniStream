import NavBar from "@/components/navigation/nav-bar";
import BrowseCard from "@/components/browse-card";
import { serchByGenres } from "@/action/get-anime";

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const currentPage = Number(resolvedSearchParams.page) || 1;
  const data = await serchByGenres(resolvedParams.type, currentPage);

  return (
    <div className="min-h-screen mt-14">
      <NavBar />
      <BrowseCard
        title={resolvedParams.type}
        animeList={data.results}
        currentPage={currentPage}
        hasNextPage={data.hasNextPage}
        category={resolvedParams.type}
        type="genre"
      />
    </div>
  );
}
