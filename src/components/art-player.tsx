"use client";

import Artplayer from "artplayer";
import React, { useRef, useEffect } from "react";
import type { Option as ArtplayerOptions } from "artplayer/types/option";
import { useStorage } from "@/provider/storage-provider";

interface ArtPlayerProps {
  intro?: { start?: number; end?: number };
  outro?: { start?: number; end?: number };
  tracks?: Array<{ label: string; file: string; kind?: string }>;
  option: Omit<ArtplayerOptions, "container">;
  getInstance?: (art: Artplayer) => void;
  className?: string;
  animeId: string;
  episodeId: string;
}

const ArtPlayerComponent = ({
  intro,
  outro,
  tracks = [],
  option,
  getInstance,
  className,
  animeId,
  episodeId,
}: ArtPlayerProps) => {
  const artRef = useRef<HTMLDivElement>(null);
  const artInstance = useRef<Artplayer | null>(null);
  const { addPlayedDuration, getPlayedDuration } = useStorage();
  const storedPlayedPercentage = getPlayedDuration(animeId, episodeId);
  console.log("ArtPlayerComponent", storedPlayedPercentage);

  useEffect(() => {
    if (!artRef.current) return;

    const highlight = [
      { time: intro?.start, text: "Intro Start" },
      { time: intro?.end, text: "Intro End" },
      { time: outro?.start, text: "Outro Start" },
      { time: outro?.end, text: "Outro End" },
    ].filter(
      (item): item is { time: number; text: string } =>
        typeof item.time === "number"
    );

    const trackOptions = tracks
      .filter((track) => track.kind === "captions")
      .map((track) => ({
        default: track.label === "English",
        html: track.label,
        url: track.file,
      }));

    const art = new Artplayer({
      ...option,
      container: artRef.current,
      highlight,
      url: option.url,
      settings: [
        {
          width: 250,
          html: "Subtitle",
          tooltip: "Show",
          selector: [
            {
              html: "Display",
              tooltip: "Show",
              switch: true,
              onSwitch: (item) => {
                art.subtitle.show = !item.switch;
                return !item.switch;
              },
            },
            ...trackOptions,
          ],
          onSelect: (item) => {
            art.subtitle.switch(item.url, { name: item.html });
            return item.html;
          },
        },
      ],
    });

    artInstance.current = art;

    art.on("resize", () => {
      art.subtitle.style({ fontSize: `${art.height * 0.05}px` });
    });

    art.on("video:timeupdate", () => {
      const currentTime = art.currentTime;
      const duration = art.duration;
      const percentage = (currentTime / duration) * 100;
      addPlayedDuration(animeId, episodeId, percentage);
    });

    getInstance?.(art);

    return () => {
      art.destroy(true);
      artInstance.current = null;
    };
  }, [
    option,
    tracks,
    intro,
    outro,
    getInstance,
    animeId,
    episodeId,
    addPlayedDuration,
  ]);

  useEffect(() => {
    if (artInstance.current && storedPlayedPercentage > 0) {
      const duration = artInstance.current.duration;
      const seekToTime = (storedPlayedPercentage / 100) * duration;
      if (Math.abs(artInstance.current.currentTime - seekToTime) > 0.5) {
        artInstance.current.currentTime = seekToTime;
      }
    }
  }, [storedPlayedPercentage]);

  return (
    <div ref={artRef} className={className} style={{ background: "none" }} />
  );
};

export default ArtPlayerComponent;
