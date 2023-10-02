import { atom } from "recoil";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";

export const CommonLoginModalState = atom<boolean>({
  key: "commonLoginModalState",
  default: false,
});
