"use client";

import React, { Dispatch, RefObject, SetStateAction } from "react";
import ReactPlayer from "react-player";
import { PlayerProps, PlayerState } from "@/types/common/playerTypes";
import { secondsFormatter } from "@/utils/client/formatter";

const Player = (props: {
  playerState: PlayerState;
  setPlayerState: Dispatch<SetStateAction<PlayerState>>;
  playerRef: RefObject<PlayerProps>;
}) => {
  const { playerState, setPlayerState, playerRef } = props;

  const { playing, played, duration, seeking, volume, muted } = playerState;

  const playerCur = playerRef?.current;

  return (
    <>
      <ReactPlayer
        //@ts-ignore
        ref={playerRef}
        className={``}
        url={`https://soundcloud.com/gum_mp3/in-my-room-utada-hikaru-db-garage-mix?si=7329048ff1f8437cb3f775d34b745e38&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing`}
        playing={playing}
        volume={volume}
        muted={muted}
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
