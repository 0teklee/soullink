"use client";

import React, { useRef, useState } from "react";
import PlayerController from "@/components/player/PlayerController";
import { PlayerProps } from "@/types/common/playerTypes";
import dynamic from "next/dynamic";

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
  });

  const playerRef = useRef<PlayerProps>(null);

  return (
    <div>
      <Player
        playerState={playerState}
        setPlayerState={setPlayerState}
        playerRef={playerRef}
      />
      <PlayerController
        playerState={playerState}
        setPlayerState={setPlayerState}
        playerRef={playerRef}
      />
    </div>
  );
};

export default PlayerContainer;
