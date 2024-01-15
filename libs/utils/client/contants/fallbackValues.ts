import { PlaylistType } from "@/libs/types/song&playlistType";

interface IDefaultPlaylist extends Omit<PlaylistType, "author" | "updatedAt"> {
  author: {
    id: string;
    profilePic: string;
    nickname: string;
  };
}

export const playlistDefault: IDefaultPlaylist = {
  title: "",
  description: "",
  coverImage: "",
  createdAt: "",
  author: {
    id: "",
    profilePic: "",
    nickname: "",
  },
  authorId: "",
  songs: [],
  id: "",
  comments: [],
  likedBy: [],
  playedCount: 0,
  mood: {
    name: "relaxed",
  },
  category: [],
};

export const playlistListDefault: PlaylistType[] =
  Array(5).fill(playlistDefault);

export const songDefault = {
  id: "",
  url: "",
  title: "",
  artist: "",
  thumbnail: "",
  playedCount: 0,
  mood: {
    name: "relaxed",
  },
  category: [],
};
