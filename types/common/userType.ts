import { PlaylistType, SongType } from "@/types/common/Song&PlaylistType";

export interface UserType {
  id: string;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  email: string;
  password: string;
  profilePic: string;
  bio: string;
  isBlocked: boolean;
  blockReason?: string;
  followers: UserType[];
  following: UserType[];
  playlists: PlaylistType[];
  likedSongs: SongType[];
  likedPlaylists: PlaylistType[];
  myComments: CommentType[];
  profileComments: CommentType[];
  playedCount: number;
}

export interface CommentType {
  id: string;
  comment: string;
  type: "profile" | "playlist";
  isPrivate: boolean;
  author: UserType;
  authorId: string;
  profile?: UserType;
  profileId?: string;
  playlist?: PlaylistType;
  playlistId?: string;
  createdAt: string;
  updatedAt: string;
}
