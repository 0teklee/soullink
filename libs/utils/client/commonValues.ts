import {
  PlaylistMoodType,
  PlaylistType,
  SONG_URL_TYPE,
} from "@/libs/types/song&playlistType";

export const breakpoints = {
  mobile: 400,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  desktopL: 1440,
};

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

export enum DAYS_FILTER {
  TODAY = 1,
  THIS_WEEK = 7,
  THIS_MONTH = 30,
  ALL_TIME = 0,
}

export enum RECENT_FILTER {
  RECENT_DESC = "RECENTPLAYED,DESC",
  RECENT_ASC = "RECENTPLAYED,ASC",
}

export const DAYS_FILTER_ARR = [
  { label: "Today", value: DAYS_FILTER.TODAY },
  { label: "This Week", value: DAYS_FILTER.THIS_WEEK },
  { label: "This Month", value: DAYS_FILTER.THIS_MONTH },
  { label: "All Time", value: DAYS_FILTER.ALL_TIME },
];

export const RECENT_FILTER_ARR = [
  {
    label: "Frequently Played - from highest",
    value: RECENT_FILTER.RECENT_DESC,
  },
  { label: "Frequently Played - from lowest", value: RECENT_FILTER.RECENT_ASC },
];

export const MOOD_TYPE_ARR = ["energetic", "chill", "relaxed", "melancholic"];
export const SONG_DEFAULT_VALUE = {
  id: "",
  url: "",
  title: "",
  artist: "",
  thumbnail: "",
  playedCount: 0,
  likedCount: 0,
};
export const SONG_TYPE_OPTIONS: SONG_URL_TYPE[] = ["youtube", "custom"];
export const SONG_AVAIL_CUSTOM_URL = [
  "soundcloud",
  "mixcloud",
  "vimeo",
  "facebook",
  "twitch",
];

export const INTERVAL_5MINS_MS = 10 * 1000;
export const played5MinSeconds = 30;
export const interval5Seconds = 5 * 1000;

export const QUERY_CACHE_TIME = 5 * 60 * 1000;
export const QUERY_STALE_TIME = QUERY_CACHE_TIME - interval5Seconds;
