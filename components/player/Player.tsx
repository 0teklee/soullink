"use client";

import React, { useEffect, useMemo } from "react";
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

const Player = () => {
  const {
    currentSong,
    song,
    songId,
    prevSongId,
    selectedSongList: songList,
    playerState,
    setPlayerState,
    songListIndex,
    playerRef,
  } = usePlayerState();

  const { handleSongChange } = useSongCountUpdater();

  const { playing, volume, muted } = playerState;

  const songListSrcset = useMemo(() => {
    return handleSourceSet(songListIndex, songList);
  }, [songListIndex, songList]);

  useEffect(() => {
    if (!songId) {
      return;
    }
    if (!prevSongId.current) {
      prevSongId.current = songId;
    }

    if (playerState?.songStartedAt) {
      handleSongChange(prevSongId.current);
      prevSongId.current = songId;
    }

    setPlayerState({
      ...playerState,
      songStartedAt: dayjs(new Date()),
    });
  }, [currentSong]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handlePlayerKeyPress(e, playerRef, setPlayerState);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setPlayerState, playerRef]);

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
          setPlayerState({
            ...playerState,
            isLoading: true,
          });
        }}
        onBufferEnd={() => {
          setPlayerState({
            ...playerState,
            isLoading: false,
          });
        }}
        onReady={(ReactPlayer) => {
          setPlayerState({
            ...playerState,
            duration: formatSecondsToString(ReactPlayer.getDuration(), true),
            durationSec: ReactPlayer.getDuration(),
            isLoading: false,
          });
        }}
        onPlay={() => {
          setPlayerState({
            ...playerState,
            isLoading: false,
          });
        }}
        onProgress={(state) => {
          setPlayerState((prev) => ({
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
          if (songListIndex + 1 < songList.length) {
            setPlayerState((prev) => {
              return {
                ...prev,
                playing: true,
                played: "00:00",
                playedSec: 0,
                currentSongListIndex: songListIndex + 1,
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
