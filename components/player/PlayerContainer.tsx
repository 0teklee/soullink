"use client";

import React from "react";
import dynamic from "next/dynamic";
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
      <div
        className={`w-screen px-5 py-3 bg-white dark:bg-black border-t-[1px] border-gray-200 dark:text-gray-50  xs:py-3 xs:px-3`}
      >
        <div
          className={`flex items-center justify-between gap-6 px-5 xs:px-0 `}
        >
          <PlayerLeftControl />
          <PlayerRange />
          <PlayerRightControl />
        </div>
      </div>
    </div>
  );
};

export default PlayerContainer;
