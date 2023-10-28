import { ReactPlayerProps } from "react-player";
import { CommentType, UserType } from "@/libs/types/common/userType";

export interface SongType {
  id: string;
  artist: string;
  title: string;
  url: string;
  thumbnail?: string;
  playedCount: number;
  likedCount: number;
  likedUsers?: { userId: string; songId?: string }[];
}

type SongUrlType = "youtube" | "" | "custom";

export type PlaylistMoodType =
  | "energetic"
  | "upbeat"
  | "chill"
  | "relaxed"
  | "melancholic"
  | "dark";

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
  mood: string;
  categories?: string[];
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
  isSongTable?: boolean;
  mood: { name: PlaylistMoodType };
}

export interface TrendingSongType
  extends Omit<SongType, "thumbnail" | "playedCount"> {
  thumbnail?: string | null;
}

export interface TrendingSongPlaylistType
  extends Omit<
    PlaylistType,
    | "author"
    | "createdAt"
    | "playCount"
    | "updatedAt"
    | "coverImage"
    | "songs"
    | "comments"
    | "likedBy"
  > {
  id: string;
  title: string;
  description: string;
  author: {
    id: string;
    nickname: string;
  };
  songs: TrendingSongType[];
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
