import { PlaylistType, SongType } from "@/libs/types/song&playlistType";

export enum MODAL_TYPE {
  "LOGIN" = "LOGIN",
  "SONG" = "SONG",
  "PLAYLIST_EDIT" = "PLAYLIST",
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
}

export interface SongModalPropsType {
  modalSong?: SongType;
  isEdit?: boolean;
}

export interface DeleteModalPropsType {
  mutate: () => void;
}
