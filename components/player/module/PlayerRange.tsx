import React from "react";
import usePlayerState from "@/components/player/usePlayerState";
import { playerGlobalStore } from "@/libs/store";
import { cn } from "@/libs/utils/client/ui";

const PlayerRange = () => {
  const { playerRef } = usePlayerState();
  const { isLoading, played, duration, playedSec, durationSec } =
    playerGlobalStore((state) => ({
      isLoading: state.isLoading,
      played: state.played,
      duration: state.duration,
      playedSec: state.playedSec,
      durationSec: state.durationSec,
    }));
  return (
    <div
      className={cn(
        `flex-1 flex items-center gap-4`,
        `flex-0 order-3 gap-0 max-w-fit pr-3`,
        `lg:flex-1 lg:order-[unset] lg:max-w-full lg:px-0`,
      )}
    >
      <p
        className={`mr-2 text-xs text-gray-900 dark:text-gray-50 whitespace-nowrap`}
      >
        {isLoading ? `loading..` : `${played} / ${duration}`}
      </p>
      <input
        className={`relative w-full h-2 mx-10 rounded-lg hidden lg:block focus:appearance-none range dark:invert`}
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
