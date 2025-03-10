import { getMangaDetail } from "@/action/get-manga";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaBookmark } from "react-icons/fa";
import { RiPagesLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

interface MangaDetailProps {
  params: { id: string };
}

interface MangaInfo {
  id: string;
  title: string | { [key: string]: string };
  image?: string;
  status?: string;
  releaseDate?: string;
  chapters?: {
    id: string;
    chapterNumber: number;
    title?: string;
    pages?: number;
  }[];
  description?: string | { [key: string]: string };
  altTitles?: Array<{ [key: string]: string }>;
  genres?: string[];
  themes?: string[];
}

async function MangaDetail({ params }: MangaDetailProps) {
  const mangaInfo = (await getMangaDetail(params.id)) as MangaInfo;

  if (!mangaInfo) {
    return <div className="text-center py-20 text-white">Manga not found</div>;
  }

  const getPrimaryTitle = () => {
    if (typeof mangaInfo.title === "string") return mangaInfo.title;
    return (
      mangaInfo.title?.en ||
      Object.values(mangaInfo.title || {})[0] ||
      "Unknown Title"
    );
  };

  const getDescription = () => {
    if (!mangaInfo?.description) return "No description available.";
    if (typeof mangaInfo.description === "string") return mangaInfo.description;
    return Object.values(mangaInfo.description)[0];
  };

  const getAltTitles = () => {
    return (
      mangaInfo.altTitles?.map((titleObj) => Object.values(titleObj)[0]) || []
    );
  };

  const firstChapterId = mangaInfo.chapters?.[0]?.id;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="container mx-auto px-2 sm:px-4 lg:px-6 py-6 md:py-8">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8 md:mb-12">
          {/* Cover Image */}
          <div className="lg:w-1/3 xl:w-1/4 relative group">
            {mangaInfo.image && (
              <div className="relative aspect-[3/4] rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-xl transform transition-transform duration-300 hover:scale-102">
                <Image
                  src={mangaInfo.image}
                  alt={getPrimaryTitle()}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              </div>
            )}
          </div>

          {/* Title and Info Section */}
          <div className="lg:flex-1 space-y-4 md:space-y-6">
            {/* Title Row */}
            <div className="flex flex-col md:flex-row justify-between gap-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 leading-tight">
                {getPrimaryTitle()}
              </h1>
            </div>

            {/* Status Badge */}
            {mangaInfo.status && (
              <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700">
                <span className="text-sm font-semibold text-red-400">
                  {mangaInfo.status}
                </span>
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {mangaInfo.releaseDate && (
                <div className="flex items-center gap-3 p-3 md:p-4 bg-gray-800/50 rounded-lg md:rounded-xl backdrop-blur-sm">
                  <div className="p-2 md:p-3 bg-red-600/20 rounded-md">
                    <FaCalendarAlt className="text-xl md:text-2xl text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-400">
                      Release Year
                    </p>
                    <p className="text-base md:text-xl font-semibold text-gray-100">
                      {mangaInfo.releaseDate}
                    </p>
                  </div>
                </div>
              )}

              {mangaInfo.chapters && (
                <div className="flex items-center gap-3 p-3 md:p-4 bg-gray-800/50 rounded-lg md:rounded-xl backdrop-blur-sm">
                  <div className="p-2 md:p-3 bg-red-600/20 rounded-md">
                    <RiPagesLine className="text-xl md:text-2xl text-red-400" />
                  </div>
                  <div>
                    <p className="text-xs md:text-sm text-gray-400">
                      Total Chapters
                    </p>
                    <p className="text-base md:text-xl font-semibold text-gray-100">
                      {mangaInfo.chapters.length}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button className="gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full px-4 py-3 md:px-6 md:py-4 text-sm md:text-base">
                <FaBookmark className="text-lg" />
                Bookmark
              </Button>
              {firstChapterId && (
                <Link
                  href={`/manga/read/${mangaInfo?.id}/${firstChapterId}`}
                  passHref
                >
                  <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-full px-6 py-4 text-sm md:text-base w-full">
                    Read Now
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            {/* Synopsis Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-gray-700/50">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-4 md:mb-6">
                Synopsis
              </h2>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                {getDescription()}
              </p>
            </div>

            {/* Chapters Card */}
            {mangaInfo.chapters && mangaInfo.chapters.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl border border-gray-700/50">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
                    Chapters
                  </h2>
                  <span className="text-xs md:text-sm text-gray-400 bg-gray-700/50 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                    {mangaInfo.chapters.length} Chapters
                  </span>
                </div>
                <div className="grid gap-2 md:gap-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {mangaInfo.chapters.map((chapter) => (
                    <Link
                      key={chapter.id}
                      href={`/manga/read/${mangaInfo.id}/${chapter.id}`}
                      className="group p-3 md:p-4 hover:bg-gray-700/30 rounded-lg md:rounded-xl transition-all duration-300 border border-transparent hover:border-gray-600"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="flex items-center gap-2 md:gap-3">
                            <span className="text-red-400 font-semibold text-base md:text-lg">
                              Ch. {chapter.chapterNumber}
                            </span>
                            {/* {chapter.title && (
                              <span className="text-base md:text-lg text-gray-100">
                                {chapter.title}
                              </span>
                            )} */}
                          </div>
                          {chapter.pages && (
                            <p className="text-xs md:text-sm text-gray-400 mt-1">
                              {chapter.pages} pages
                            </p>
                          )}
                        </div>
                        <span className="text-xl md:text-2xl text-gray-400 group-hover:text-red-400 transform transition-transform group-hover:translate-x-2">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            {/* Alternative Titles Card */}
            {getAltTitles().length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-700/50">
                <h3 className="text-lg md:text-xl font-semibold text-gray-100 mb-3">
                  Alternative Titles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {getAltTitles().map((title, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs md:text-sm"
                    >
                      {title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MangaDetail;
