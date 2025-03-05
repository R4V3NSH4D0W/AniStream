import { getAnimeInfo, getAnimeSource } from "@/action/get-anime";
import AnimePlayer from "@/components/anime/anime-player";
import EpisodeList from "@/components/anime/episode-list";
import ReleatedCard from "@/components/anime/releated-card";
import { Card } from "@/components/card";
import { VerticalCardSection } from "@/lib/helper";
import Image from "next/image";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string; episode: string }>;
}) {
  const { id, episode } = await params;
  const decodedEpisode = decodeURIComponent(episode);

  const [animeInfo, animeServer] = await Promise.all([
    getAnimeInfo(id),
    getAnimeSource(decodedEpisode),
  ]);

  if (!animeServer) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white bg-gray-900">
        <div className="mb-4 animate-bounce">
          <Image src="/robot.png" alt="Sad Robot" width={100} height={100} />
        </div>

        <h1 className=" text-xl lg:text-3xl font-bold text-center text-red-500 drop-shadow-md">
          Oops! Something went wrong.
        </h1>
        <p className="text-sm lg:text-lg text-gray-300 mt-2">
          Please try again later.
        </p>
      </div>
    );
  }

  const episodeData = {
    sources: animeServer.sources,
    tracks: animeServer.subtitles?.map(
      (sub: { lang: string; url: string }) => ({
        label: sub.lang,
        file: sub.url,
        kind: "subtitles",
      })
    ),
    intro: animeServer.intro,
    outro: animeServer.outro,
  };

  const subOrDub = animeServer.subtitles?.some(
    (sub: { lang: string; url: string }) => sub.lang === "English"
  )
    ? "sub"
    : "dub";

  return (
    <div className=" mb-4">
      <div className="p-2 lg:p-8 mt-[4rem] lg:mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-[75%_25%] gap-6">
          <div className="h-full w-full">
            <AnimePlayer
              key={animeServer.sources[0].url}
              episodeInfo={episodeData}
              animeInfo={animeInfo}
              subOrDub={subOrDub}
              animeId={id}
              episodeId={decodedEpisode}
            />
          </div>

          <div className="w-full">
            <EpisodeList
              episodes={animeInfo?.episodes}
              currentEpisodeId={decodedEpisode}
              animeId={id}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center mt-4 space-y-4 sm:space-y-0 sm:space-x-4 px-4 sm:px-8">
        <div className="relative w-full sm:w-[12rem] h-[20rem] sm:h-[15rem]">
          <Image
            src={animeInfo?.image || "/placeholder.jpg"}
            alt={animeInfo?.title as string}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col space-y-2 text-white max-w-full sm:max-w-[70%] break-words">
          <h1 className="text-2xl sm:text-3xl">{animeInfo?.title as string}</h1>
          <p className="text-sm sm:text-md text-gray-300 overflow-hidden">
            {animeInfo?.description}
          </p>
        </div>
      </div>
      <ReleatedCard title="Releated Anime" animeInfo={animeInfo} />
      <div className="grid grid-cols-1 lg:grid-cols-[75%_25%]">
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
