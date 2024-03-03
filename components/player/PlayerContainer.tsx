"use client";

import React from "react";
import dynamic from "next/dynamic";
import PlayerController from "@/components/player/PlayerController";
import PlayerLeftControl from "@/components/player/module/PlayerLeftControl";
import PlayerRange from "@/components/player/module/PlayerRange";
import PlayerRightControl from "@/components/player/module/PlayerRightControl";

const Player = dynamic(() => import("@/components/player/Player"), {
  ssr: false,
});

const PlayerContainer = () => {
  return (
    <div className={`fixed bottom-0 z-50`}>
      <Player />
      <PlayerController>
        <PlayerLeftControl />
        <PlayerRange />
        <PlayerRightControl />
      </PlayerController>
    </div>
  );
};

export default PlayerContainer;
