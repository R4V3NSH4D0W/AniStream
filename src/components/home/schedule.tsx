"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { formatDateWithTimezone } from "@/lib/utils";
import Link from "next/link";

interface ScheduleItem {
  id: string;
  title: string;
  airingEpisode: string;
  image?: string;
  airingTime?: string;
  url: string;
}

export default function ScheduleComponent() {
  const [showAll, setShowAll] = useState(false);
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setCurrentTime(formatDateWithTimezone(new Date()));

    const interval = setInterval(() => {
      setCurrentTime(formatDateWithTimezone(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dateRange = Array.from({ length: 7 }).map((_, i) =>
    addDays(selectedDate, i - 3)
  );

  const fetchData = useCallback(async (date: string) => {
    try {
      const response = await fetch(`/api/schedule?date=${date}`);
      const data = await response.json();
      setScheduleData(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      setScheduleData([]);
    }
  }, []);

  useEffect(() => {
    fetchData(format(selectedDate, "yyyy-MM-dd"));
  }, [selectedDate, fetchData]);

  return (
    <div className=" text-white p-4 md:p-6 ">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4">
        <label className=" text-lg lg:text-2xl font-bold">
          Estimated Schedule
        </label>
        <label className=" text-sm lg:text-md">{currentTime}</label>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="flex flex-row lg:justify-center w-full">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2 overflow-x-auto w-full scrollbar-hide snap-x">
              <button
                onClick={() => setSelectedDate(subDays(selectedDate, 1))}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 shrink-0"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {dateRange.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`min-w-[70px] p-2 text-center rounded-lg transition-colors duration-200 shrink-0 snap-center cursor-pointer ${
                    format(date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                      ? "bg-red-600 text-white"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <div className="text-sm font-medium">
                    {format(date, "EEE")}
                  </div>
                  <div className="text-xs">{format(date, "d MMM")}</div>
                </button>
              ))}

              <button
                onClick={() => setSelectedDate(addDays(selectedDate, 1))}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200 shrink-0"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {(showAll ? scheduleData : scheduleData.slice(0, 5)).map((anime) => (
          <Link
            href={`/anime/${anime.id}`}
            prefetch={true}
            key={anime.id}
            className="group grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[10%_80%_10%] items-center border-b border-gray-700 py-3 
                       text-gray-300 hover:text-white transition-all duration-200 transform cursor-pointer
                       hover:scale-[1.02] hover:bg-gray-800 px-2 md:px-4"
          >
            <div className="border-r border-gray-700 pr-2 md:pr-3 text-sm md:text-base">
              {anime.airingTime}
            </div>
            <div className="border-r border-gray-700 pr-2 md:pr-3 truncate text-sm md:text-base ml-4">
              {anime.title}
            </div>
            <div className="text-center text-sm md:text-base">
              {anime.airingEpisode}
            </div>
          </Link>
        ))}

        {scheduleData.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-3 text-center text-red-400 hover:text-red-300  cursor-pointer
                       transition-colors duration-200 font-medium rounded-lg hover:bg-gray-800
                       sticky bottom-2 backdrop-blur-sm bg-gray-900/80"
          >
            {showAll
              ? `Show less`
              : `View all ${scheduleData.length} schedules`}
          </button>
        )}
      </div>
    </div>
  );
}
