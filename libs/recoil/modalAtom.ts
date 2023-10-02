import { atom } from "recoil";

export const CommonLoginModalState = atom<boolean>({
  key: "commonLoginModalState",
  default: false,
});
