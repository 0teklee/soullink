"use client";

import React, { Dispatch, RefObject, SetStateAction } from "react";
import { PlayerProps, PlayerState } from "@/types/common/playerTypes";
import { secondsFormatter } from "@/utils/client/formatter";
import ReactPlayer from "react-player";

const Player = ({
  playerState,
  setPlayerState,
  playerRef,
  song,
}: {
  playerState: PlayerState;
  setPlayerState: Dispatch<SetStateAction<PlayerState>>;
  playerRef: RefObject<PlayerProps>;
  song: string;
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
        pip={true}
        onReady={(ReactPlayer) => {
          setPlayerState({
            ...playerState,
            duration: secondsFormatter(ReactPlayer.getDuration()) || "00:00",
            durationSec: ReactPlayer.getDuration(),
            playing: true,
          });
        }}
        onProgress={(state) => {
          setPlayerState({
            ...playerState,
            played: secondsFormatter(state.playedSeconds) || "00:00",
            playedSec: state.playedSeconds,
          });
        }}
        controls={true}
      />
    </>
  );
};

export default Player;
