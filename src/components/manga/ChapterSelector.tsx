"use client";
interface Chapter {
  id: string;
  chapterNumber: number;
  title?: string;
}

interface ChapterSelectorProps {
  mangaId: string;
  chapters: Chapter[];
  currentChapterId: string;
}

export function ChapterSelector({
  mangaId,
  chapters,
  currentChapterId,
}: ChapterSelectorProps) {
  return (
    <div className=" p-4 rounded-xl  ">
      <select
        value={currentChapterId}
        onChange={(e) => {
          window.location.href = `/manga/read/${mangaId}/${e.target.value}`;
        }}
        className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none w-full"
      >
        {chapters.map((chapter) => (
          <option key={chapter.id} value={chapter.id}>
            Ch. {chapter.chapterNumber} {chapter.title && `- ${chapter.title}`}
          </option>
        ))}
      </select>
    </div>
  );
}
