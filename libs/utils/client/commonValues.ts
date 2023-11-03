import {
  PlaylistMoodType,
  PlaylistType,
} from "@/libs/types/common/Song&PlaylistType";

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
  mood: {
    name: "relaxed",
  },
  category: [],
};

export const commonMoods: PlaylistMoodType[] = [
  "upbeat",
  "chill",
  "relaxed",
  "melancholic",
];

export const titleRegex = new RegExp(
  /(VEVO|Official|Official Video|Official Audio|Video|video| -|- )|(\(\s*Official Video\s*\))|(\(\s*Official Audio\s*\))|(\(\s*Official\s*\))|(\(\s*Video\s*\))|(\(\s*Audio\s*\))|(\(\s*Lyric\s*\))|(\(\s*Lyrics\s*\))|(\(\s*Live\s*\))|(\(\s*Music\s*\))|(\(\s*Music Video\s*\))|(\(\s*Official Music Video\s*\))|(\(\s*Official Music\s*\))|(\(\s*Official Video\s*\))|(\(\s*Official Audio\s*\))|(\(\s*Official\s*\))|(\(\s*Video\s*\))|(\(\s*Audio\s*\))|(\(\s*Lyric\s*\))|(\(\s*Lyrics\s*\))|(\(\s*Live\s*\))|(\(\s*Music\s*\))|(\(\s*Music Video\s*\))|(\(\s*Official Music Video\s*\))|(\(\s*Official Music\s*\))|(\(\s*Official Video\s*\))|(\(\s*Official Audio\s*\))|(\(\s*Official\s*\))|(\(\s*Video\s*\))|(\(\s*Audio\s*\))|(\(\s*Lyric\s*\))|(\(\s*Lyrics\s*\))|(\(\s*Live\s*\))|(\(\s*Music\s*\))|(\(\s*Music Video\s*\))|(\(\s*Official Music Video\s*\))|(\(\s*Official Music\s*\))|(\(\s*Official Video\s*\))|(\(\s*Official Audio\s*\))|(\(\s*Official\s*\))|(\(\s*Video\s*\))|(\(\s*Audio\s*\))|(\(\s*Lyric\s*\))|(\(\s*Lyrics\s*\))|(\(\s*Live\s*\))|(\(\s*Music\s*\))|(\(\s*Music Video\s*\))|(\(\s*Official Music Video\s*\))|(\(\s*Official Music\s*\))|(\(\s*Official Video\s*\))|(\(\s*Official Audio\s*\))|(\(\s*Official\s*\))|(\(\s*Video\s*\))|(\(\s*Audio\s*\))|(\(\s*Lyric\s*\))|(\(\s*Lyrics\s*\))|(\(\s*Live\s*\))|(\(\s*Music\s*\))|(\(\s*Music Video\s*\))|(\(\s*Official Music Video\s*\))|(\(\s*Official Music\s*\))|(\(\s*Official Video\s*\))|(\(\s*Official Audio\s*\))|(\(\s*Official\s*\))|(\(\s*Video\s*\))|(\(\s*Audio\s*\))|(\(\s*Lyric\s*\))|(\(\s*Lyrics\s*\))|(\(\s*Live\s*\))|(\(\s*Music\s*\))|(\(\s*Music Video\s*\))|(\(\s*Official Music Video\s*\))|(\(\s*Official Music\s*\))|(\(\s*Official Video\s*\))|(\(\s*Official Audio\s*\))|(\(\s*Official\s*\))|(\(\s*Video\s*\))|(\(\s*Audio\s*\))|(\(\s*Lyric\s*\))|(\(\s*Lyrics\s*\))|(\(\s*Live\s*\))|(\(\s*Music\s*\))|(\(\s*Music Video\s*\))|(\(\s*Official Music Video\s*\))|(\(\s*Official Music\s*\))|(\(\s*Official Video\s*\))|(\(\s*Official Audio\s*\))|(\(\s*Official\s*\))|(\(\s*Video\s*\))|(\(\s*Audio\s*\))|(\(\s*Lyric\s*\))|(\(\s*Lyrics\s*\))|(\(\s*Live\s*\))|(\(\s*Music\s*\))|(\(\s*Music Video\s*\))|(\(\s*Official Music Video\s*\))|(\(\s*Official Music\s*\))|(\(\s*Official Video\s*\))|(\(\s*Official Audio\s*\))|(\(\s*Official\s*\))|(\(\s*Video\s*\))|(\(\s*Audio\s*\))|(\(\s*\))|(\(\s*19\d{2}\s*\))|(\(\s*20\d{2}\s*\))/gi,
);
export const emptyRegex = new RegExp(/\(\s*\)/g);

export const played5MinsMs = 5 * 60 * 1000;
export const played5MinSeconds = 30;
export const interval5Seconds = 5 * 1000;
