"use client";
import { useStorage } from "@/provider/storage-provider";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { IAnimeInfo } from "@consumet/extensions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

function BookMarkPage() {
  const { bookmarks, removeBookmark } = useStorage();
  const [animeData, setAnimeData] = useState<IAnimeInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookmarkData = async () => {
      try {
        setLoading(true);
        const promises = bookmarks.map((id) =>
          fetch(
            `https://api.lenishmagar.me/api/zoroanime/animeinfo?id=${id}`
          ).then((res) => (res.ok ? res.json() : null))
        );
        const results = await Promise.all(promises);
        setAnimeData(results.filter(Boolean) as IAnimeInfo[]);
      } catch {
        setError("Failed to load bookmarks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (bookmarks.length > 0) {
      fetchBookmarkData();
    } else {
      setLoading(false);
    }
  }, [bookmarks]);

  const handleConfirmDelete = () => {
    if (deleteId) {
      removeBookmark(deleteId);
      setAnimeData((prev) => prev.filter((anime) => anime.id !== deleteId));
      setDeleteId(null);
    }
  };

  if (error) {
    return (
      <div className="text-center py-20 text-red-500 text-xl">{error}</div>
    );
  }

  if (!loading && bookmarks.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-300 mb-4">
            Your Anime Library is Empty
          </h2>
          <p className="text-gray-500">
            Discover amazing anime and save them here for later!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-screen px-0 mt-12 lg:px-8 py-8">
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent className="bg-gray-800 text-white border border-gray-700 shadow-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Remove Bookmark
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              Are you sure you want to remove this anime from your bookmarks?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white border border-gray-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={handleConfirmDelete}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h1 className="text-2xl font-bold text-white mb-4 px-2">My Bookmarks</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 px-2">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-64 w-full rounded-lg bg-gray-800"
              />
            ))
          : animeData.map((anime) => (
              <div
                key={anime.id}
                className="relative group  rounded-lg overflow-hidden hover:shadow-xl transition-transform duration-300 hover:scale-105"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 z-10 p-1 h-8 w-8 bg-red-600/90 hover:bg-red-500/90 backdrop-blur-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteId(anime.id);
                  }}
                >
                  <Trash2 size={24} className="text-lg text-white" />
                </Button>

                <Link href={`/anime/${anime.id}`} className="block h-full">
                  <div className="relative w-full aspect-[2/3]">
                    <Image
                      src={anime.image as string}
                      alt={anime.title as string}
                      fill
                      className="rounded-lg object-cover aspect-[2/3] "
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <p className="text-white text-sm font-medium truncate">
                        {anime.title as string}
                      </p>
                      <div className="flex gap-1 mt-1">
                        <Badge className="text-xs px-1 py-0 bg-red-600/80 backdrop-blur-sm">
                          {anime.type}
                        </Badge>
                        {anime.jikanData?.score && (
                          <Badge className="text-xs px-1 py-0 bg-yellow-600/80">
                            ★ {anime.jikanData.score.toFixed(1)}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
      </div>

      {!loading && bookmarks.length === 0 && (
        <div className="text-center py-12 px-2">
          <div className="max-w-md mx-auto">
            <div className="text-4xl mb-3">📚</div>
            <h2 className="text-xl font-semibold text-gray-300 mb-2">
              No Bookmarks Found
            </h2>
            <p className="text-gray-500 text-sm">
              Your favorite anime will appear here!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookMarkPage;
