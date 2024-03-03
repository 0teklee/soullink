import React, { Dispatch, SetStateAction } from "react";
import { clsx } from "clsx";
import usePlayerState from "@/components/player/usePlayerState";

const VolumeDropdown = ({
  setIsVolumeDropdownOpen,
}: {
  setIsVolumeDropdownOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { playerState, setPlayerState } = usePlayerState();
  const { volume, muted } = playerState;
  return (
    <div
      onMouseEnter={() => {
        setIsVolumeDropdownOpen(true);
      }}
      onMouseLeave={() => {
        setIsVolumeDropdownOpen(false);
      }}
      className={clsx(
        `absolute -top-[120px] -left-1.5`,
        `flex items-center justify-center w-8 py-2`,
        `bg-gray-50 border border-gray-300 rounded`,
        `dark:invert`,
      )}
    >
      <input
        className={`volume_slider`}
        type={`range`}
        value={!muted ? volume * 100 : 0}
        min={0}
        max={100}
        onChange={(e) => {
          setPlayerState((prev) => ({
            ...prev,
            muted: false,
            volume: Number(e.target.value) / 100,
          }));
        }}
      />
    </div>
  );
};

export default VolumeDropdown;
