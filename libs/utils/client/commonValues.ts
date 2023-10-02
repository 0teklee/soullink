import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";

export const breakpoints = {
  mobile: 400,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  desktopL: 1440,
};

interface IDefaultPlaylist extends Omit<PlaylistType, "author" | "updatedAt"> {
  author: {
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
    profilePic: "",
    nickname: "",
  },
  authorId: "",
  songs: [],
  id: "",
  comments: [],
  likedBy: [],
  playCount: 0,
};
