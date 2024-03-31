import React from "react";
import usePlayerState from "@/components/player/usePlayerState";

const PlayerRange = () => {
  const { playerState, playerRef } = usePlayerState();
  const { isLoading, played, duration, playedSec, durationSec } = playerState;
  return (
    <div
      className={`flex-1 flex items-center justify-evenly gap-4 xs:flex-0 xs:order-3 xs:gap-0 xs:max-w-fit xs:pr-3`}
    >
      <p
        className={`text-xs text-gray-900 dark:text-gray-50 whitespace-nowrap`}
      >
        {isLoading ? `loading..` : `${played} / ${duration}`}
      </p>
      <input
        className={`relative w-full h-2 mx-10 rounded-lg xs:hidden focus:appearance-none range dark:`}
        type={`range`}
        value={playedSec}
        max={durationSec}
        onChange={(e) => {
          playerRef?.current?.seekTo(Number(e.target.value));
        }}
        aria-label={`song progress`}
      />
    </div>
  );
};

export default PlayerRange;
