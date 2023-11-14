export enum SEARCH_ORDER_BY {
  RECENT_DESC = "RECENT,DESC",
  RECENT_ASC = "RECENT,ASC",
  LIKE_DESC = "LIKE,DESC",
  LIKE_ASC = "LIKE,ASC",
  PLAY_DESC = "PLAY,DESC",
  PLAY_ASC = "PLAY,ASC",
  USER_DESC = "USER,DESC",
  USER_ASC = "USER,ASC",
  PLAYLIST_COUNT_DESC = "PLAYLIST,DESC",
  PLAYLIST_COUNT_ASC = "PLAYLIST,ASC",
}

export enum SEARCH_TYPE {
  ALL = "ALL",
  PLAYLIST = "PLAYLIST",
  CATEGORIES = "CATEGORIES",
  USER = "USER",
  CATEGORY_PLAYLIST = "CATEGORY_PLAYLIST",
  MOOD_PLAYLIST = "MOOD_PLAYLIST",
}

export const SEARCH_TYPE_ARRAY = [
  { label: "All", value: SEARCH_TYPE.ALL },
  { label: "Playlists", value: SEARCH_TYPE.PLAYLIST },
  { label: "Categories", value: SEARCH_TYPE.CATEGORIES },
  { label: "Category Playlists", value: SEARCH_TYPE.CATEGORY_PLAYLIST },
  { label: "User", value: SEARCH_TYPE.USER },
  { label: "Mood", value: SEARCH_TYPE.MOOD_PLAYLIST },
];

export const SEARCH_ORDER_BY_ARRAY = [
  { label: "From Newest", value: SEARCH_ORDER_BY.RECENT_DESC },
  { label: "From Oldest", value: SEARCH_ORDER_BY.RECENT_ASC },
  { label: "Likes - from highest", value: SEARCH_ORDER_BY.LIKE_DESC },
  { label: "Likes - from lowest", value: SEARCH_ORDER_BY.LIKE_ASC },
  { label: "Play - from highest", value: SEARCH_ORDER_BY.PLAY_DESC },
  { label: "Play - from lowest", value: SEARCH_ORDER_BY.PLAY_ASC },
  { label: "User - from highest", value: SEARCH_ORDER_BY.USER_DESC },
  { label: "User - from lowest", value: SEARCH_ORDER_BY.USER_ASC },
  {
    label: "Playlist Count - from highest",
    value: SEARCH_ORDER_BY.PLAYLIST_COUNT_DESC,
  },
  {
    label: "Playlist Count - from lowest",
    value: SEARCH_ORDER_BY.PLAYLIST_COUNT_ASC,
  },
];
