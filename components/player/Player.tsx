"use client";

import React, { RefObject } from "react";
import { secondsFormatter } from "@/libs/utils/client/formatter";
import ReactPlayer from "react-player";
import { PlayerProps, SongType } from "@/libs/types/common/Song&PlaylistType";
import { PlayerType } from "@/libs/types/common/playerType";
import { SetterOrUpdater } from "recoil";

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
    </>
  );
};

export default Player;
