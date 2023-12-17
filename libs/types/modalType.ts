import { PlaylistType, SongType } from "@/libs/types/song&playlistType";
import { SetterOrUpdater } from "recoil";
import {
  FollowerOptionNullable,
  FollowingOptionNullable,
} from "@/libs/types/userType";

export enum MODAL_TYPE {
  "LOGIN" = "LOGIN",
  "SONG" = "SONG",
  "SONG_TABLE" = "SONG_TABLE",
  "PLAYLIST_EDIT" = "PLAYLIST",
  "PLAYLIST_DOWNLOAD" = "PLAYLIST_DOWNLOAD",
  "FOLLOW" = "FOLLOW",
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

export interface SongTableModalPropsType {
  userId?: string;
  songs?: SongType[];
}

export interface SongModalPropsType {
  modalSong?: SongType;
  isEdit?: boolean;
}

export interface DeleteModalPropsType {
  mutate: () => void;
}

export interface FollowModalPropsType {
  follows: FollowerOptionNullable | FollowingOptionNullable;
  isFollower: boolean;
  profileNickname: string;
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
  [MODAL_TYPE.FOLLOW]: [
    FollowModalPropsType,
    SetterOrUpdater<FollowModalPropsType | null>,
  ];
  [MODAL_TYPE.PLAYLIST_EDIT]: [
    PlaylistEditPropsType | null,
    SetterOrUpdater<PlaylistEditPropsType | null>,
  ];
  [MODAL_TYPE.PLAYLIST_DOWNLOAD]: [
    ShareDownloadModalPropsType | null,
    SetterOrUpdater<ShareDownloadModalPropsType | null>,
  ];
  [MODAL_TYPE.SONG_TABLE]: [
    SongTableModalPropsType | null,
    SetterOrUpdater<SongTableModalPropsType | null>,
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
