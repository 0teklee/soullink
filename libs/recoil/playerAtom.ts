import { atom } from "recoil";
import { PlayerType } from "@/libs/types/common/playerType";

export const playerGlobalState = atom<PlayerType>({
  key: "playerState",
  default: {
    playing: false,
    played: "00:00",
    duration: "00:00",
    playedSec: 0,
    durationSec: 0,
    volume: 0.8,
    muted: false,
    seeking: false,
    isLoading: false,
    currentSongListIndex: 0,
  },
});
