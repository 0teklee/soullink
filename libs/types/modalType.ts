import { PlaylistType, SongType } from "@/libs/types/song&playlistType";
import { SetterOrUpdater } from "recoil";

export enum MODAL_TYPE {
  "LOGIN" = "LOGIN",
  "SONG" = "SONG",
  "PLAYLIST_EDIT" = "PLAYLIST",
  "PLAYLIST_DOWNLOAD" = "PLAYLIST_DOWNLOAD",
  "SEARCH" = "SEARCH",
  "DELETE" = "DELETE",
  "ERROR" = "ERROR",
}

export interface ErrorModalPropsType {
  error: Error;
  resetErrorBoundary: () => void;
}

export interface PlaylistEditPropsType {
  userId: string;
  playlistData: PlaylistType;
  addedSongList?: SongType[];
}

export interface SongModalPropsType {
  modalSong?: SongType;
  isEdit?: boolean;
}

export interface DeleteModalPropsType {
  mutate: () => void;
}

export interface ShareDownloadModalPropsType {
  title?: string;
  author?: {
    nickname: string;
    profilePic?: string;
  };
  coverImage?: string;
  songs?: SongType[];
  fontColor?: string;
  bgColor?: string;
}

export interface UseModalStateMap {
  [MODAL_TYPE.PLAYLIST_EDIT]: [
    PlaylistEditPropsType | null,
    SetterOrUpdater<PlaylistEditPropsType | null>,
  ];
  [MODAL_TYPE.PLAYLIST_DOWNLOAD]: [
    ShareDownloadModalPropsType | null,
    SetterOrUpdater<ShareDownloadModalPropsType | null>,
  ];
  [MODAL_TYPE.SONG]: [
    SongModalPropsType | null,
    SetterOrUpdater<SongModalPropsType | null>,
  ];
  [MODAL_TYPE.ERROR]: [
    ErrorModalPropsType | null,
    SetterOrUpdater<ErrorModalPropsType | null>,
  ];
  [MODAL_TYPE.DELETE]: [
    DeleteModalPropsType | null,
    SetterOrUpdater<DeleteModalPropsType | null>,
  ];
}
