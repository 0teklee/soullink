import { atom } from "recoil";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";

export const playlistState = atom<null | PlaylistType>({
  key: "playlistState",
  default: null,
});
