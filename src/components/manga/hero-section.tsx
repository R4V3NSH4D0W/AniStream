"use client";

import React, { useState } from "react";
import { IMangaResult } from "@consumet/extensions";
import { motion } from "framer-motion";
import Image from "next/image";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { Button } from "../ui/button";
import { truncateText } from "@/lib/utils";
import Link from "next/link";

interface HeroSectionProps {
  manga: IMangaResult[] | undefined;
}

const HeroSection: React.FC<HeroSectionProps> = ({ manga }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (!manga || manga.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % manga.length);
  };

  const prevSlide = () => {
    if (!manga || manga.length === 0) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + manga.length) % manga.length
    );
  };

  return (
    <section className="relative w-full h-[500px] lg:h-[500px] overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent z-10" />

      {manga?.map((mangaItem, index) => (
        <motion.div
          key={mangaItem.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            scale: index === currentIndex ? 1 : 1.1,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={mangaItem.image || "/placeholder.jpg"}
            alt={mangaItem.title as string}
            fill
            className="object-cover object-center"
            priority={index === currentIndex}
          />

          {/* Content Container */}
          <div className="container h-full mx-auto px-4 lg:px-8">
            <div className="absolute bottom-8 left-0 right-0 lg:bottom-1/4 lg:left-8 z-20">
              <div className="flex flex-col lg:flex-row items-center lg:items-end gap-6 max-w-6xl ">
                {/* Manga Cover - Hidden on mobile */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="relative w-48 h-64 lg:w-64 lg:h-80 shadow-2xl aspect-[2/3] hidden lg:block"
                >
                  <Image
                    src={mangaItem.image || "/placeholder.jpg"}
                    alt={mangaItem.title as string}
                    fill
                    className="object-cover rounded-lg mt-10"
                  />
                </motion.div>

                {/* Text Content - Right aligned on mobile */}
                <div className="flex flex-col space-y-4 text-left px-2 w-full lg:w-auto">
                  <motion.h1
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl lg:text-4xl font-bold text-white drop-shadow-md"
                  >
                    {mangaItem.title as string}
                  </motion.h1>

                  <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-200 text-sm lg:text-base max-w-2xl line-clamp-6 ml-auto lg:mx-0"
                  >
                    {truncateText(mangaItem.description as string, 600)}
                  </motion.p>

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    // className="ml-auto lg:mx-0"
                  >
                    <Link
                      href={`/manga/${mangaItem.id}`}
                      className="inline-block"
                    >
                      <Button
                        size="lg"
                        className="bg-red-600 hover:bg-red-700 text-white text-sm lg:text-md px-4 py-2 lg:py-4 rounded-lg transition-transform hover:scale-105"
                      >
                        Read Now
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Bottom Navigation Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 bg-black/30 hover:bg-black/50 text-white rounded-full"
          onClick={prevSlide}
        >
          <GrLinkPrevious className="text-2xl" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 bg-black/30 hover:bg-black/50 text-white rounded-full"
          onClick={nextSlide}
        >
          <GrLinkNext className="text-2xl" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
