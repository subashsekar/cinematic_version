"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { withBasePath } from "@/lib/basePath";

const BACKGROUND_ID = "background";
const BACKGROUND_SRC = withBasePath("/audio/background-music.mp3");

interface AudioContextType {
  activeTrackId: string | null;
  isPlaying: boolean;
  isBackgroundPlaying: boolean;
  playTrack: (id: string, src: string, options?: { loop?: boolean }) => Promise<void>;
  pause: () => void;
  toggleTrack: (id: string, src: string, options?: { loop?: boolean }) => Promise<void>;
  toggleBackground: () => Promise<void>;
  pauseAllVideos: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

function pauseOtherVideos(except?: HTMLVideoElement | null) {
  if (typeof document === "undefined") return;
  document.querySelectorAll("video").forEach((video) => {
    if (video !== except && !video.paused) {
      video.pause();
    }
  });
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const trackSrcRef = useRef<string | null>(null);
  const volume = 0.35;

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "metadata";
      audio.volume = volume;
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setActiveTrackId(null);
      });
      audio.addEventListener("pause", () => {
        if (audio === audioRef.current) {
          setIsPlaying(false);
        }
      });
      audio.addEventListener("play", () => {
        if (audio === audioRef.current) {
          setIsPlaying(true);
        }
      });
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const onVideoPlay = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLVideoElement)) return;
      pauseOtherVideos(target);
      const audio = audioRef.current;
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
        setActiveTrackId(null);
      }
    };

    document.addEventListener("play", onVideoPlay, true);
    return () => document.removeEventListener("play", onVideoPlay, true);
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    setIsPlaying(false);
    setActiveTrackId(null);
  }, []);

  const pauseAllVideos = useCallback(() => {
    pauseOtherVideos(null);
  }, []);

  const playTrack = useCallback(
    async (id: string, src: string, options?: { loop?: boolean }) => {
      const audio = ensureAudio();
      pauseOtherVideos(null);

      if (trackSrcRef.current !== src) {
        audio.src = src;
        trackSrcRef.current = src;
      }

      audio.loop = options?.loop ?? id === BACKGROUND_ID;
      audio.volume = volume;

      try {
        await audio.play();
        setActiveTrackId(id);
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
        setActiveTrackId(null);
      }
    },
    [ensureAudio]
  );

  const toggleTrack = useCallback(
    async (id: string, src: string, options?: { loop?: boolean }) => {
      if (activeTrackId === id && isPlaying) {
        pause();
        return;
      }
      await playTrack(id, src, options);
    },
    [activeTrackId, isPlaying, pause, playTrack]
  );

  const toggleBackground = useCallback(async () => {
    await toggleTrack(BACKGROUND_ID, BACKGROUND_SRC, { loop: true });
  }, [toggleTrack]);

  return (
    <AudioContext.Provider
      value={{
        activeTrackId,
        isPlaying,
        isBackgroundPlaying: isPlaying && activeTrackId === BACKGROUND_ID,
        playTrack,
        pause,
        toggleTrack,
        toggleBackground,
        pauseAllVideos,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}

export { BACKGROUND_ID, BACKGROUND_SRC };
