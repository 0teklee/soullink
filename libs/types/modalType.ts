import { PlaylistType, SongType } from "@/libs/types/song&playlistType";
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

export type CommonModalProps =
  | PlaylistEditPropsType
  | ShareDownloadModalPropsType
  | FollowModalPropsType
  | SongTableModalPropsType
  | SongModalPropsType
  | DeleteModalPropsType
  | ErrorModalPropsType
  | null;

export interface CommonModalState {
  isModalOpen: boolean;
  modalType: MODAL_TYPE | null;
  followModalProps: FollowModalPropsType | null;
  playlistEditModalProps: PlaylistEditPropsType | null;
  playlistDownloadModalProps: ShareDownloadModalPropsType | null;
  songTableModalProps: SongTableModalPropsType | null;
  songModalProps: SongModalPropsType | null;
  deleteModalProps: DeleteModalPropsType | null;
  errorModalProps: ErrorModalPropsType | null;
  setModal: (
    type: MODAL_TYPE,
    props?:
      | PlaylistEditPropsType
      | ShareDownloadModalPropsType
      | FollowModalPropsType
      | SongTableModalPropsType
      | SongModalPropsType
      | DeleteModalPropsType
      | ErrorModalPropsType
      | null,
  ) => void;
  setModalOpen: (isOpen: boolean) => void;
}
