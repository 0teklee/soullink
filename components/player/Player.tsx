"use client";

import React, { useEffect, useMemo, useRef } from "react";
import {
  formatPlayedSeconds,
  formatSecondsToString,
} from "@/libs/utils/client/formatter";
import ReactPlayer from "react-player";
import handlePlayerKeyPress, {
  handleSourceSet,
} from "@/components/player/utils";
import usePlayerState from "@/components/player/usePlayerState";
import dayjs from "dayjs";
import useSongCountUpdater from "@/libs/utils/hooks/useSongCountUpdater";
import { playerGlobalStore } from "@/libs/store";
import { useStore } from "zustand";

const Player = () => {
  const {
    currentSong,
    song,
    songId,
    prevSongId,
    selectedSongList: songList,
    currentSongListIndex,
    playerRef,
  } = usePlayerState();

  const { handleSongChange } = useSongCountUpdater();

  const { playing, volume, muted, songStartedAt } = useStore(playerGlobalStore);
  const audioContextRef = useRef<AudioContext | null>(null);

  const songListSrcset = useMemo(() => {
    return handleSourceSet(currentSongListIndex, songList);
  }, [currentSongListIndex, songList]);

  const handleVisibilityChange = () => {
    if (
      !audioContextRef?.current ||
      !audioContextRef.current?.state ||
      !playerRef?.current ||
      !playerRef?.current.getInternalPlayer ||
      typeof document === "undefined"
    ) {
      return;
    }

    const player = playerRef.current.getInternalPlayer() as HTMLMediaElement;

    if (document.hidden) {
      const audioSource = audioContextRef.current.createMediaElementSource(
        player as HTMLMediaElement,
      );
      audioSource.connect(audioContextRef.current.destination);
      return;
    }

    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().then(() => {
        if (
          audioContextRef?.current &&
          audioContextRef?.current.state === "running"
        ) {
          playerGlobalStore.setState((prev) => ({
            ...prev,
            playing: true,
          }));
        }
      });
    }
  };

  useEffect(() => {
    if (!songId) {
      return;
    }
    if (!prevSongId.current) {
      prevSongId.current = songId;
    }

    if (songStartedAt) {
      handleSongChange(prevSongId.current);
      prevSongId.current = songId;
    }

    playerGlobalStore.setState((prev) => ({
      ...prev,
      songStartedAt: dayjs(new Date()),
    }));
  }, [currentSong]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handlePlayerKeyPress(e, playerRef);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [playerRef]);

  useEffect(() => {
    if (
      !audioContextRef.current ||
      typeof document === "undefined" ||
      typeof window === "undefined"
    ) {
      return;
    }

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent,
      );

    if (!isMobile) {
      return;
    }

    if (!audioContextRef.current || typeof document === "undefined") {
      return;
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    audioContextRef.current = new AudioContext();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <ReactPlayer
        //@ts-ignore
        ref={playerRef}
        className={`hidden`}
        autoPlay={true}
        playsinline
        url={song}
        playing={playing}
        volume={volume}
        muted={muted}
        onBuffer={() => {
          playerGlobalStore.setState((prev) => ({
            ...prev,
            isLoading: true,
          }));
        }}
        onBufferEnd={() => {
          playerGlobalStore.setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }}
        onReady={(ReactPlayer) => {
          playerGlobalStore.setState((prev) => ({
            ...prev,
            duration: formatSecondsToString(ReactPlayer.getDuration(), true),
            durationSec: ReactPlayer.getDuration(),
            isLoading: false,
          }));
        }}
        onPlay={() => {
          playerGlobalStore.setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }}
        onProgress={(state) => {
          playerGlobalStore.setState((prev) => ({
            ...prev,
            played: formatSecondsToString(
              prev.durationSec > state.playedSeconds
                ? state.playedSeconds
                : formatPlayedSeconds(
                    state.playedSeconds,
                    prev?.songStartedAt,
                    prev.durationSec,
                  ),
            ),
            playedSec: formatPlayedSeconds(
              state.playedSeconds,
              prev?.songStartedAt,
              prev.durationSec,
            ),
          }));
        }}
        onEnded={() => {
          if (currentSongListIndex + 1 < songList.length) {
            playerGlobalStore.setState((prev) => {
              return {
                ...prev,
                playing: true,
                played: "00:00",
                playedSec: 0,
                currentSongListIndex: currentSongListIndex + 1,
              };
            });
          }
        }}
        stopOnUnmount={false}
        controls={true}
      >
        {songListSrcset?.map((song) => (
          <source key={`src_${song.src}`} src={song.src} />
        ))}
      </ReactPlayer>
    </>
  );
};

export default Player;
