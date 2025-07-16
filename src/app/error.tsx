"use client";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-neutral-800">
      <div className="p-6 rounded-2xl border border-neutral-200 shadow-md flex flex-col items-center max-w-md w-full">
        <svg
          className="h-12 w-12 text-red-500 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
          />
        </svg>
        <h1 className="text-xl font-semibold mb-2 text-white">
          Something went wrong
        </h1>
        <p className="text-sm text-center text-neutral-500 mb-4">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
