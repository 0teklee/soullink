import { atom } from "recoil";
import {
  DeleteModalPropsType,
  ErrorModalPropsType,
  FollowModalPropsType,
  MODAL_TYPE,
  PlaylistEditPropsType,
  ShareDownloadModalPropsType,
  SongModalPropsType,
  SongTableModalPropsType,
} from "@/libs/types/modalType";

export const CommonModalState = atom<boolean>({
  key: "commonModalState",
  default: false,
});

export const CommonModalTypeState = atom<MODAL_TYPE | null>({
  key: "modalTypeState",
  default: null,
});

export const FollowPropsState = atom<FollowModalPropsType | null>({
  key: "FollowPropsState",
  default: null,
});

export const PlaylistEditPropsState = atom<PlaylistEditPropsType | null>({
  key: "playlistEditPropsState",
  default: null,
});

export const PlaylistShareDownloadPropsState =
  atom<ShareDownloadModalPropsType | null>({
    key: "ShareDownloadModalPropsState",
    default: null,
  });

export const DeleteModalPropsState = atom<DeleteModalPropsType | null>({
  key: "deleteModalPropsState",
  default: null,
});

export const SongTableModalPropsState = atom<SongTableModalPropsType | null>({
  key: "songTableModalPropsState",
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
