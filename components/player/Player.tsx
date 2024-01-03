"use client";

import React, { RefObject, useEffect, useState } from "react";
import {
  formatPlayedSeconds,
  formatSecondsToString,
} from "@/libs/utils/client/formatter";
import ReactPlayer from "react-player";
import { PlayerProps, SongType } from "@/libs/types/song&playlistType";
import { PlayerType } from "@/libs/types/playerType";
import { SetterOrUpdater } from "recoil";
import {
  formatAutoplaySonglist,
  handleSourceSet,
} from "@/components/player/utils";

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

  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const handleUnloadChange = () => {
    console.log("unload");
    playerRef.current?.seekTo(playerState?.durationSec || 0);
    setIsAutoPlay(true);
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
      {isAutoPlay && (
        <ReactPlayer
          //@ts-ignore
          ref={playerRef}
          className={`hidden`}
          autoPlay={true}
          playsinline
          url={formatAutoplaySonglist(songListIndex, songList)}
          playing={true}
          muted={true}
          stopOnUnmount={false}
        />
      )}
    </>
  );
};

export default Player;
