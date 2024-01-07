"use client";

import React, { RefObject, useEffect, useMemo } from "react";
import {
  formatPlayedSeconds,
  formatSecondsToString,
} from "@/libs/utils/client/formatter";
import ReactPlayer from "react-player";
import { PlayerProps, SongType } from "@/libs/types/song&playlistType";
import { PlayerType } from "@/libs/types/playerType";
import { SetterOrUpdater } from "recoil";
import { handleSourceSet } from "@/components/player/utils";

const Player = ({
  song,
  songList,
  playerState,
  setPlayerState,
  songListIndex,
  playerRef,
}: {
  playerState: PlayerType;
  setPlayerState: SetterOrUpdater<PlayerType>;
  song: string;
  songList: SongType[];
  songListIndex: number;
  playerRef: RefObject<PlayerProps>;
}) => {
  const { playing, volume, muted } = playerState;

  const songListSrcset = useMemo(() => {
    return handleSourceSet(songListIndex, songList);
  }, [songListIndex, songList]);

  const handleUnloadChange = () => {
    playerRef.current?.seekTo(playerState?.durationSec || 0);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnloadChange);
    return () => {
      window.removeEventListener("beforeunload", handleUnloadChange);
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
        controls={true}
      />
      <audio
        className={`hidden`}
        autoPlay={true}
        playsInline={true}
        muted={true}
      >
        {songListSrcset?.map((song) => (
          <source key={`src_${song.src}`} src={song.src} />
        ))}
      </audio>
    </>
  );
};

export default Player;
