import { getEpisdoeServers } from "@/action/get-drama";

export default async function WatchPage({
  params,
}: {
  params: { ids: string[] };
}) {
  const [movieId, episodeId] = params.ids;
  const getServer = await getEpisdoeServers(episodeId, movieId);

  console.log("server", getServer);

  return (
    <div>
      <h1>Movie ID: {movieId}</h1>
      <h2>Episode ID: {episodeId}</h2>
    </div>
  );
}
