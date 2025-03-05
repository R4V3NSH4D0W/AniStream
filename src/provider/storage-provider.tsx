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

interface ContinueWatching {
  [animeId: string]: {
    episodeId: string;
    episodeNumber: number;
    animeInfo: {
      title: string;
      image: string;
    };
    timestamp: number;
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
  continueWatching: ContinueWatching;
  storeContinueWatching: (
    animeId: string,
    episodeId: string,
    animeInfo: { title: string; image: string },
    episodes: { id: string; number: number }[]
  ) => void;
  getContinueWatching: () => ContinueWatching;
  removeContinueWatching: (animeId: string) => void;
}

const StorageContext = createContext<StorageContextType | null>(null);

export const StorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [playedDurations, setPlayedDurations] = useState<PlayedDurations>({});
  const [continueWatching, setContinueWatching] = useState<ContinueWatching>(
    {}
  );
  console.log("continue Watching", continueWatching);
  useEffect(() => {
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) setBookmarks(JSON.parse(storedBookmarks));

    const storedPlayedDurations = localStorage.getItem("playedDurations");
    if (storedPlayedDurations)
      setPlayedDurations(JSON.parse(storedPlayedDurations));

    const storedContinueWatching = localStorage.getItem("continueWatching");
    if (storedContinueWatching)
      setContinueWatching(JSON.parse(storedContinueWatching));
  }, []);

  const storeContinueWatching = useCallback(
    (
      animeId: string,
      episodeId: string,
      animeInfo: { title: string; image: string },
      episodes: { id: string; number: number }[]
    ) => {
      const episode = episodes.find((ep) => ep.id === episodeId);
      if (!episode) return;

      const timestamp = Date.now(); // Get current timestamp

      setContinueWatching((prev) => {
        const updated = {
          ...prev,
          [animeId]: {
            episodeId,
            episodeNumber: episode.number,
            animeInfo,
            timestamp,
          },
        };

        localStorage.setItem("continueWatching", JSON.stringify(updated));
        return updated;
      });
    },
    [setContinueWatching]
  );

  const getContinueWatching = useCallback(() => {
    const sorted = Object.entries(continueWatching)
      .sort(([, a], [, b]) => b.timestamp - a.timestamp)
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as ContinueWatching);

    return sorted;
  }, [continueWatching]);

  const removeContinueWatching = useCallback((animeId: string) => {
    setContinueWatching((prev) => {
      const updated = { ...prev };
      delete updated[animeId];
      localStorage.setItem("continueWatching", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const updated = [...prev, id];
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const updated = prev.filter((bookmark) => bookmark !== id);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const fetchBookmarks = useCallback(() => bookmarks, [bookmarks]);

  const addPlayedDuration = useCallback(
    (animeId: string, episodeId: string, percentage: number) => {
      setPlayedDurations((prev) => {
        const updated = {
          ...prev,
          [animeId]: { ...prev[animeId], [episodeId]: percentage },
        };
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
        continueWatching,
        storeContinueWatching,
        getContinueWatching,
        removeContinueWatching,
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
