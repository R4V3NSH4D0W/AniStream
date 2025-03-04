"use client";
import React, { useMemo, useRef, useEffect } from "react";
import Hls from "hls.js";
import artplayerPluginHlsControl from "artplayer-plugin-hls-control";
import artplayerPluginAmbilight from "artplayer-plugin-ambilight";
import ArtPlayerComponent from "../art-player";
import { IEpisodeSource } from "@/types/anime";
import { IAnimeInfo } from "@consumet/extensions";
import Artplayer from "artplayer";
import { useStorage } from "@/provider/storage-provider";

type ArtPlayerWithHls = Artplayer & {
  hls?: Hls;
  notice?: {
    show: string;
  };
};

interface AnimePlayerProps {
  episodeInfo: IEpisodeSource;
  animeInfo: IAnimeInfo | null;
  subOrDub: "sub" | "dub";
  animeId: string;
  episodeId: string;
}

const AnimePlayer = ({
  episodeInfo,
  animeInfo,
  subOrDub,
  animeId,
  episodeId,
}: AnimePlayerProps) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const artInstance = useRef<ArtPlayerWithHls | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const uri = episodeInfo.sources[0]?.url;

  const proxiedUri = useMemo(() => {
    if (!episodeInfo?.sources[0]?.url) return "";
    try {
      const url = new URL(episodeInfo.sources[0].url);
      return `/api/proxy/${encodeURIComponent(url.host)}${url.pathname
        .split("/")
        .map((segment) => encodeURIComponent(segment))
        .join("/")}`;
    } catch {
      return "";
    }
  }, [episodeInfo]);

  const { storeContinueWatching } = useStorage();

  useEffect(() => {
    if (!animeInfo) return;

    storeContinueWatching(
      animeId,
      episodeId,
      {
        title: (animeInfo.title as string) ?? "",
        image: animeInfo.image ?? "",
      },
      animeInfo.episodes ?? []
    );
  }, [animeId, episodeId, animeInfo, storeContinueWatching]);

  useEffect(() => {
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (artInstance.current) {
        artInstance.current.destroy();
        artInstance.current = null;
      }
    };
  }, []);

  const options = useMemo(() => {
    const englishSubtitle = episodeInfo.tracks?.find(
      (track) => track.label === "English"
    );

    return {
      url: proxiedUri,
      customType: {
        m3u8: (video: HTMLVideoElement, url: string, art: ArtPlayerWithHls) => {
          if (Hls.isSupported()) {
            if (hlsRef.current) {
              hlsRef.current.destroy();
            }

            const hls = new Hls();
            hlsRef.current = hls;

            art.hls = hls;

            hls.loadSource(url);
            hls.attachMedia(video);

            art.on("destroy", () => {
              hls.destroy();
              hlsRef.current = null;
              art.hls = undefined;
            });
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          } else if (art.notice) {
            art.notice.show = "Unsupported playback format";
          }
        },
      },
      plugins: [
        artplayerPluginAmbilight({
          blur: "30px",
          opacity: 1,
          frequency: 10,
          duration: 0.3,
          zIndex: -1,
        }),
        artplayerPluginHlsControl({
          quality: {
            control: true,
            setting: true,
            getName: (level: { height: number }) => `${level.height}P`,
            title: "Quality",
            auto: "Auto",
          },
          audio: {
            control: true,
            setting: true,
            getName: (track: { name: string }) => track.name,
            title: "Audio",
            auto: "Auto",
          },
        }),
      ],
      title: animeInfo?.title ?? undefined,
      poster: animeInfo?.image ?? undefined,
      volume: 1,
      isLive: false,
      muted: false,
      autoplay: true,
      autoOrientation: true,
      pip: true,
      autoSize: false,
      autoMini: false,
      screenshot: true,
      setting: true,
      loop: false,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: false,
      subtitleOffset: false,
      miniProgressBar: false,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: "#F5316F",
      whitelist: ["*"],
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
      subtitle:
        subOrDub === "sub" && englishSubtitle
          ? {
              url: englishSubtitle.file,
              type: "vtt" as const,
              style: { color: "#fff" },
              encoding: "utf-8" as const,
              escape: false, // Added escape property
            }
          : undefined,
      hotkey: true, // Existing property retained
      icons: {
        // loading: `<img width="50" height="50" src="${loadingImage.src}">`, // Added loading icon
      },
    };
  }, [proxiedUri, animeInfo, episodeInfo.tracks, subOrDub]);

  return (
    <div
      ref={playerRef}
      className="w-full aspect-video rounded-lg overflow-hidden"
    >
      {uri ? (
        <ArtPlayerComponent
          animeId={animeId}
          episodeId={episodeId}
          option={options}
          tracks={episodeInfo.tracks}
          intro={episodeInfo.intro}
          outro={episodeInfo.outro}
          className="w-full h-full"
        />
      ) : (
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${animeInfo?.image})`,
            filter: "blur(20px)",
          }}
        />
      )}
    </div>
  );
};

export default AnimePlayer;
