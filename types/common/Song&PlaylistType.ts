import { ReactPlayerProps } from "react-player";
import { CommentType, UserType } from "@/types/common/userType";

export interface SongType {
  id: string;
  artist: string;
  title: string;
  url: string;
  thumbnail?: string;
  playedCount: number;
  likedCount: number;
  likedUsers?: { userId: string; songId: string }[];
}

type SongUrlType = "youtube" | "" | "custom";

export interface CreateSongType
  extends Omit<SongType, "playedCount" | "likedCount" | "id"> {
  type: SongUrlType;
}

export interface SongLikeType {
  songId: string;
  userId: string;
}

export interface CreatePlaylistType {
  title: string;
  description: string;
  coverImage?: string;
  songs: CreateSongType[];
}

export interface PlaylistLikeType {
  playlistId: string;
  userId: string;
}

export interface PlaylistCreateRequestType
  extends Omit<CreatePlaylistType, "songs"> {
  songs: SongType[];
  userId: string;
}

export interface PlaylistType {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  contentLink?: string;
  author: UserType;
  authorId: string;
  songs: SongType[];
  comments: CommentType[];
  likedBy: { userId: string; playlistId: string }[];
  playCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PlayerState {
  playing: boolean;
  played: string;
  duration: string;
  playedSec: number;
  durationSec: number;
  volume: number;
  muted: boolean;
  seeking: boolean;
  isLoading: boolean;
}

export interface PlayerListItem extends SongType {}

export interface PlayerProps extends ReactPlayerProps {
  seekTo(amount: number, type?: "seconds" | "fraction"): void;

  getCurrentTime(): number;

  getSecondsLoaded(): number;

  getDuration(): number;

  getInternalPlayer(key?: string): Record<string, any>;

  showPreview(): void;
}
