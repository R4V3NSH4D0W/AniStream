"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface PlayedDurations {
  [animeId: string]: {
    [episodeId: string]: number;
  };
}

interface StorageContextType {
  bookmarks: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  fetchBookmarks: () => string[];
  playedDurations: PlayedDurations;
  addPlayedDuration: (
    animeId: string,
    episodeId: string,
    percentage: number
  ) => void;
  getPlayedDuration: (animeId: string, episodeId: string) => number;
}

const StorageContext = createContext<StorageContextType | null>(null);

export const StorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [playedDurations, setPlayedDurations] = useState<PlayedDurations>({});
  console.log("StorageProvider", playedDurations);

  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
      setBookmarks(JSON.parse(storedBookmarks));
    }
  }, []);

  useEffect(() => {
    const storedPlayedDurations = localStorage.getItem("playedDurations");
    if (storedPlayedDurations) {
      setPlayedDurations(JSON.parse(storedPlayedDurations));
    }
  }, []);

  const addBookmark = (id: string) => {
    const updatedBookmarks = [...bookmarks, id];
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const removeBookmark = (id: string) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark !== id);
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  const fetchBookmarks = () => {
    return bookmarks;
  };

  const addPlayedDuration = useCallback(
    (animeId: string, episodeId: string, percentage: number) => {
      setPlayedDurations((prev) => {
        const updated = { ...prev };
        updated[animeId] = updated[animeId] || {};
        updated[animeId][episodeId] = percentage;
        localStorage.setItem("playedDurations", JSON.stringify(updated));
        return updated;
      });
    },
    []
  );

  const getPlayedDuration = useCallback(
    (animeId: string, episodeId: string) => {
      return playedDurations[animeId]?.[episodeId] ?? 0;
    },
    [playedDurations]
  );

  return (
    <StorageContext.Provider
      value={{
        bookmarks,
        addBookmark,
        removeBookmark,
        fetchBookmarks,
        playedDurations,
        addPlayedDuration,
        getPlayedDuration,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

export const useStorage = () => {
  const context = useContext(StorageContext);
  if (!context) {
    throw new Error("useStorage must be used within a StorageProvider");
  }
  return context;
};
