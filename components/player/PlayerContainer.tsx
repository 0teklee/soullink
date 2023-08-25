"use client";

import React, { useEffect, useRef, useState } from "react";
import { PlayerProps } from "@/types/common/playerTypes";
import dynamic from "next/dynamic";
import PlayerController from "@/components/player/PlayerController";
import { handleKeyPress } from "@/utils/client/eventHandler";
import { fakePlaylistSongsData } from "@/utils/client/commonValues";

const Player = dynamic(() => import("@/components/player/Player"), {
  ssr: false,
});

const PlayerContainer = () => {
  const [playerState, setPlayerState] = useState({
    playing: false,
    played: "00:00",
    duration: "00:00",
    playedSec: 0,
    durationSec: 0,
    volume: 0.8,
    muted: false,
    seeking: false,
    isLoading: true,
  });

  const [songListIndex, setSongListIndex] = useState(0);

  const playerRef = useRef<PlayerProps>(null);

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      handleKeyPress(e, playerRef, setPlayerState);
    });
    return () => {
      document.removeEventListener("keydown", (e: KeyboardEvent) => {
        handleKeyPress(e, playerRef, setPlayerState);
      });
    };
  }, []);

  return (
    <div className={`fixed bottom-0 z-50`}>
      <Player
        playerState={playerState}
        setPlayerState={setPlayerState}
        playerRef={playerRef}
        song={fakePlaylistSongsData[songListIndex].url}
      />
      <PlayerController
        playerState={playerState}
        setPlayerState={setPlayerState}
        playerRef={playerRef}
        songList={fakePlaylistSongsData}
        setSongListIndex={setSongListIndex}
        songListIndex={songListIndex}
      />
    </div>
  );
};

export default PlayerContainer;
