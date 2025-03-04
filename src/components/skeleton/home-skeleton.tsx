"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="relative h-[400px] w-full">
        <Skeleton className="absolute inset-0 h-full w-full bg-gray-800/50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] xl:grid-cols-[75%_25%] gap-6 px-4 lg:px-8 py-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-32 bg-gray-800/50" />
            <Skeleton className="h-6 w-20 bg-gray-800/50" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-40 w-full rounded-md bg-gray-800/50"
              />
            ))}
          </div>

          <div className="flex justify-between items-center my-4">
            <Skeleton className="h-6 w-32 bg-gray-800/50" />
            <Skeleton className="h-6 w-20 bg-gray-800/50" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-40 w-full rounded-md bg-gray-800/50"
              />
            ))}
          </div>

          <Skeleton className="h-16 w-full my-6 bg-gray-800/50" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-40 bg-gray-800/50" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex space-x-3">
                <Skeleton className="h-20 w-16 rounded-md bg-gray-800/50" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 bg-gray-800/50" />
                  <Skeleton className="h-4 w-1/2 bg-gray-800/50" />
                </div>
              </div>
            ))}
          </div>
          <Skeleton className="h-6 w-40 mt-6 bg-gray-800/50" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-full rounded-md bg-gray-800/50"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
