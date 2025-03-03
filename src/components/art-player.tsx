"use client";

import Artplayer from "artplayer";
import React, { useRef, useEffect } from "react";
import type { Option as ArtplayerOptions } from "artplayer/types/option";

interface ArtPlayerProps {
  intro?: { start?: number; end?: number };
  outro?: { start?: number; end?: number };
  tracks?: Array<{ label: string; file: string; kind?: string }>;
  option: Omit<ArtplayerOptions, "container">;
  getInstance?: (art: Artplayer) => void;
  className?: string;
}

const ArtPlayerComponent = ({
  intro,
  outro,
  tracks = [],
  option,
  getInstance,
  className,
}: ArtPlayerProps) => {
  const artRef = useRef<HTMLDivElement>(null);

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
          tooltip: "Subtitle",
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

    art.on("resize", () => {
      art.subtitle.style({ fontSize: `${art.height * 0.05}px` });
    });

    getInstance?.(art);

    return () => {
      art.destroy(true);
    };
  }, [option, tracks, intro, outro, getInstance]);

  return (
    <div ref={artRef} className={className} style={{ background: "none" }} />
  );
};

export default ArtPlayerComponent;
