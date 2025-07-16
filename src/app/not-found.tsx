"use client";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-neutral-800">
      <div className="p-6 rounded-2xl border border-neutral-200 shadow-md flex flex-col items-center max-w-md w-full">
        <svg
          className="h-16 w-16 text-red-500 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.635-1.14 1.06-2.05L13.06 4.95c-.527-.91-1.593-.91-2.12 0L3.022 16.95c-.575.91.006 2.05 1.06 2.05z"
          />
        </svg>
        <h1 className="text-2xl font-semibold mb-2 text-white">
          Page Not Found
        </h1>
        <p className="text-sm text-center text-red-500 mb-4">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-4 py-2 rounded-lg bg-red-800 text-white text-sm font-medium hover:bg-red-900 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
