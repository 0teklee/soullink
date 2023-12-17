import { atom } from "recoil";
import { PlayerType } from "@/libs/types/playerType";
import { PlaylistType } from "@/libs/types/song&playlistType";

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
    startedAt: null,
    songStartedAt: null,
  },
});

export const playlistState = atom<null | PlaylistType>({
  key: "playlistState",
  default: null,
});

export const darkModeState = atom<boolean>({
  key: "darkModeState",
  default: false,
});
