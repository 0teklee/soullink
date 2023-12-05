import { atom } from "recoil";
import {
  DeleteModalPropsType,
  ErrorModalPropsType,
  MODAL_TYPE,
  PlaylistEditPropsType,
  SongModalPropsType,
} from "@/libs/types/modalType";

export const CommonModalState = atom<boolean>({
  key: "commonModalState",
  default: false,
});
export const CommonModalTypeState = atom<MODAL_TYPE | null>({
  key: "modalTypeState",
  default: null,
});
export const PlaylistEditPropsState = atom<PlaylistEditPropsType | null>({
  key: "playlistEditPropsState",
  default: null,
});
export const DeleteModalPropsState = atom<DeleteModalPropsType | null>({
  key: "deleteModalPropsState",
  default: null,
});
export const SongModalPropsState = atom<SongModalPropsType | null>({
  key: "songModalPropsState",
  default: null,
});
export const ErrorModalPropsState = atom<ErrorModalPropsType | null>({
  key: "errorModalPropsState",
  default: null,
});
