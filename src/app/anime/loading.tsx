import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <div className="w-20 h-20 border-4 border-transparent  text-blue-800 text-4xl animate-spin flex items-center justify-center border-t-blue-800 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-red-500 text-2xl animate-spin flex items-center justify-center border-t-red-500 rounded-full"></div>
      </div>
    </div>
  );
}
