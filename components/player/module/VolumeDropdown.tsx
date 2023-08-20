import React, {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
} from "react";
import { PlayerState } from "@/types/common/playerTypes";

const VolumeDropdown = ({
  playerState,
  setPlayerState,
  setIsVolumeDropdownOpen,
}: {
  playerState: PlayerState;
  setPlayerState: Dispatch<React.SetStateAction<PlayerState>>;
  setIsVolumeDropdownOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { volume, muted } = playerState;
  return (
    <div
      onMouseEnter={() => {
        setIsVolumeDropdownOpen(true);
      }}
      onMouseLeave={() => {
        setIsVolumeDropdownOpen(false);
      }}
      className={`absolute -top-[120px] -left-1.5 flex items-center justify-center w-8 py-2 bg-gray-50 border border-gray-300 rounded`}
    >
      <input
        className={`volume_slider`}
        type={`range`}
        value={!muted ? volume * 100 : 0}
        min={0}
        max={100}
        onChange={(e) => {
          setPlayerState({
            ...playerState,
            muted: false,
            volume: Number(e.target.value) / 100,
          });
        }}
      />
    </div>
  );
};

export default VolumeDropdown;
