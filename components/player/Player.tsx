"use client";

import React, { Dispatch, RefObject, SetStateAction } from "react";
import { secondsFormatter } from "@/libs/utils/client/formatter";
import ReactPlayer from "react-player";
import {
  PlayerProps,
  PlayerState,
  SongType,
} from "@/libs/types/common/Song&PlaylistType";

const Player = ({
  song,
  songList,
  playerState,
  setPlayerState,
  songListIndex,
  setSongListIndex,
  playerRef,
}: {
  playerState: PlayerState;
  setPlayerState: Dispatch<SetStateAction<PlayerState>>;
  song: string;
  songList: SongType[];
  setSongListIndex: Dispatch<SetStateAction<number>>;
  songListIndex: number;
  playerRef: RefObject<PlayerProps>;
}) => {
  const { playing, played, duration, seeking, volume, muted } = playerState;

  return (
    <>
      <ReactPlayer
        //@ts-ignore
        ref={playerRef}
        className={`hidden`}
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
            duration: secondsFormatter(ReactPlayer.getDuration()) || "00:00",
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
          setPlayerState({
            ...playerState,
            played: secondsFormatter(state.playedSeconds) || "00:00",
            playedSec: state.playedSeconds,
          });
        }}
        onEnded={() => {
          if (songListIndex + 1 < songList.length) {
            setSongListIndex(songListIndex + 1);
            setPlayerState((prev) => {
              return { ...prev, playing: true, played: "00:00", playedSec: 0 };
            });
          }
        }}
        controls={true}
      />
    </>
  );
};

export default Player;
