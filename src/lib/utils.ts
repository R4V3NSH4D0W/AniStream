import { AnimeCategory } from "@/action/get-anime";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(text: string, maxLength: number = 300): string {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

export const getColorFromLetter = (letter: string) => {
  const colorMap: { [key: string]: string } = {
    A: "text-red-500",
    B: "text-blue-500",
    C: "text-green-500",
    D: "text-yellow-500",
    E: "text-purple-500",
    F: "text-pink-500",
    G: "text-indigo-500",
    H: "text-teal-500",
    I: "text-orange-500",
    J: "text-gray-500",
    K: "text-cyan-500",
    L: "text-lime-500",
    M: "text-emerald-500",
    N: "text-sky-500",
    O: "text-rose-500",
    P: "text-amber-500",
    Q: "text-fuchsia-500",
    R: "text-violet-500",
    S: "text-indigo-500",
    T: "text-pink-500",
    U: "text-yellow-500",
    V: "text-green-500",
    W: "text-blue-500",
    X: "text-purple-500",
    Y: "text-teal-500",
    Z: "text-orange-500",
  };


  const firstLetter = letter.toUpperCase().charAt(0);
  return colorMap[firstLetter] || "text-gray-500";
  
};

export const formatDateWithTimezone = (date: Date): string => {
  const tzOffset = date.getTimezoneOffset();
  const tzHours = Math.floor(Math.abs(tzOffset) / 60);
  const tzMinutes = Math.abs(tzOffset) % 60;
  const tzSign = tzOffset > 0 ? "-" : "+"; 

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }).format(date);

  return `(GMT${tzSign}${tzHours}:${tzMinutes.toString().padStart(2, "0")}) ${formattedDate}`;
};

export function formatCategoryTitle(category: AnimeCategory): string {
  return category
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

