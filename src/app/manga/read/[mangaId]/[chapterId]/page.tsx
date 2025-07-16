import { getChapters, getMangaDetail } from "@/action/get-manga";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChapterSelector } from "@/components/manga/ChapterSelector";

interface ReadPageProps {
  params: {
    mangaId: string;
    chapterId: string;
  };
}

interface IMangaInfo {
  title: string | { [key: string]: string };
  chapters?: Array<{
    id: string;
    chapterNumber: number;
    title?: string;
    pages?: number;
  }>;
}

async function ReadPage({ params }: ReadPageProps) {
  const { mangaId, chapterId } = params;
  const mangaChapters = await getChapters(chapterId);
  const mangaDetail = (await getMangaDetail(mangaId)) as IMangaInfo;

  const currentChapterIndex =
    mangaDetail?.chapters?.findIndex((chap) => chap.id === chapterId) ?? 0;

  const prevChapter = mangaDetail?.chapters?.[currentChapterIndex + 1];
  const nextChapter = mangaDetail?.chapters?.[currentChapterIndex - 1];

  if (!mangaChapters || !mangaDetail) {
    return (
      <div className="text-center py-20 text-white">Chapter not found</div>
    );
  }

  return (
    <div className="min-h-screen mt-10 text-white">
      {/* Simple Title Section */}
      <div className="container mx-auto px-4 pt-6">
        <div className="max-w-4xl mx-auto mb-6">
          <h1 className="text-2xl font-bold text-gray-100 truncate">
            {typeof mangaDetail.title === "string"
              ? mangaDetail.title
              : mangaDetail.title?.en || "Unknown Title"}
          </h1>
          <p className="text-lg text-gray-400">
            Chapter {mangaDetail.chapters?.[currentChapterIndex]?.chapterNumber}
          </p>
        </div>
      </div>

      {/* Chapter Pages */}
      <main className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {mangaChapters.map((page) => (
            <div key={page.page} className="relative w-full  last:mb-0">
              <div className="max-w-4xl mx-auto">
                <Image
                  src={page.img}
                  alt={`Page ${page.page}`}
                  width={1200}
                  height={1800}
                  className="w-full h-auto object-contain"
                  quality={90}
                  sizes="100vw"
                  priority={page.page === 1}
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center gap-4">
            {prevChapter && (
              <Link
                href={`/manga/read/${mangaId}/${prevChapter.id}`}
                className="hover:scale-105 transition-transform"
              >
                <Button className="bg-red-600/90 hover:bg-red-700 rounded-full px-6 py-4">
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Prev
                </Button>
              </Link>
            )}
            {nextChapter && (
              <Link
                href={`/manga/read/${mangaId}/${nextChapter.id}`}
                className="hover:scale-105 transition-transform"
              >
                <Button className="bg-red-600/90 hover:bg-red-700 rounded-full px-6 py-4">
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
          </div>

          <ChapterSelector
            mangaId={mangaId}
            chapters={
              mangaDetail.chapters?.map((ch) => ({
                id: ch.id,
                chapterNumber: ch.chapterNumber,
                title: ch.title,
              })) || []
            }
            currentChapterId={chapterId}
          />
        </div>
      </div>
    </div>
  );
}

export default ReadPage;
