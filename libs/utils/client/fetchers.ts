import {
  PlaylistCreateRequestType,
  PlaylistLikeResponseType,
  PlaylistLikeType,
  PlaylistMoodType,
  PlaylistType,
  SongLikeType,
  TrendingSongPlaylistType,
} from "@/libs/types/song&playlistType";
import {
  CommentPayloadType,
  CommentType,
  EditProfilePayload,
  PayloadCommentDeleteType,
  PayloadCommentLikeType,
  PostFollowType,
  SignupPayload,
  UserType,
} from "@/libs/types/userType";
import { DAYS_FILTER, RECENT_FILTER } from "@/libs/utils/client/commonValues";

import { formatEditUserPayload } from "@/libs/utils/client/formatter";
import { YoutubeSearchResponse } from "@/libs/types/youtubeTypes";

/* Playlist Fetchers */
/* GET */

export const getMainPageFriendsPlaylists = async (
  userId?: string | null,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/friends?userId=${
      userId ? userId : ""
    }`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data.mainData.friendsList;
};

export const getMainPageTodayPlaylists = async (): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/main/today`,
    { next: { tags: ["today_playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data.todayPlaylist;
};

export const getTimelinePlaylists = async (
  id?: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/main/timeline?userId=${
      id ? id : ""
    }`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  ).then((res) => res.json());
  return res.timelinePlaylists;
};

export const getRecentPlaylists = async (
  id?: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/user/recent?userId=${id ? id : ""}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  ).then((res) => res.json());
  return res.recentPlayed;
};

export const getLocalRecentPlaylists = async (
  id: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/recent?id=${id}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  ).then((res) => res.json());
  return res.trendingPlayLists;
};

/* Playlist Detail page */

export const getSinglePlaylist = async (id: string): Promise<PlaylistType> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/${id}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const resData: { data: PlaylistType } = await res.json();
  return resData.data;
};

export const getPlaylistsPaths = async (): Promise<string[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/paths`,
  );
  const data = await res.json();
  const paths = data.playlistsPaths;
  return paths;
};

/* Discover fetchers */

export const getDiscoverMoodPlaylists = async (
  userId?: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/mood/recommend?userId=${
      userId || ""
    }`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  ).then((res) => res.json());
  return res.moodPlayLists;
};

export const getEditorPlaylists = async (): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/editor`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data.editorPlayLists;
};

export const getRecommendedPlaylists = async (
  userId: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/recommend?userId=${userId}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  ).then((res) => res.json());
  return res.userRecommendPlaylist;
};

/* Trending Fetchers */

export const getTrendingMainPlaylists = async (
  period: DAYS_FILTER,
  recentPlayed?: RECENT_FILTER,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${
      process.env.NEXT_APP_BASE_URL
    }/api/playlist/list/recent/trending?recent=${period}&recentPlayed=${
      recentPlayed || ""
    }`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data.trendingMainPlaylist;
};

export const getCategoriesPlaylists = async (
  userId?: string,
): Promise<{ categoryPlaylists: PlaylistType[]; categories: string[] }> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/categories/new?userId=${
      userId || ""
    }`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data;
};

export const getTrendingCategoriesPlaylists = async (
  period: DAYS_FILTER,
  recentPlayed?: RECENT_FILTER,
): Promise<{
  recentMostPlayedCategoryPlaylist: PlaylistType[];
  categories: string[];
}> => {
  const res = await fetch(
    `${
      process.env.NEXT_APP_BASE_URL
    }/api/playlist/list/recent/category?recent=${period}&recentPlayed=${
      recentPlayed || ""
    }`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return {
    recentMostPlayedCategoryPlaylist: data.recentMostPlayedCategoryPlaylist,
    categories: data.categories,
  };
};

export const getFilteredCategoriesPlaylists = async (
  period: DAYS_FILTER,
  categories: string[],
): Promise<{
  filteredCategoriesList: PlaylistType[];
}> => {
  const res = await fetch(
    `${
      process.env.NEXT_APP_BASE_URL
    }/api/playlist/list/categories/filter?recent=${period}&categories=${JSON.stringify(
      categories,
    )}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return {
    filteredCategoriesList: data.filteredCategoriesList,
  };
};

export const getMoodPlaylists = async (
  param: PlaylistMoodType | null | undefined,
  period: DAYS_FILTER,
  userId?: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${
      process.env.NEXT_APP_BASE_URL
    }/api/playlist/list/mood?param=${param}&recent=${period}&userId=${
      userId || ""
    }`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  ).then((res) => res.json());
  return res.moodPlayLists;
};

export const getMoodLists = async (
  period: DAYS_FILTER,
): Promise<{ name: string; count: number }[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/mood/count?recent=${period}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data.moodCount;
};

/* POST */

export const postCreatePlaylist = async (
  payload: PlaylistCreateRequestType,
  userId: string,
) => {
  try {
    if (!userId) {
      throw new Error("no userId or playlistId");
    }

    const res = await fetch(`/api/playlist/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        userId: userId || "",
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postEditPlaylist = async (
  payload: PlaylistCreateRequestType,
  userId: string,
  playlistId: string,
) => {
  try {
    if (!userId || !playlistId) {
      throw new Error("no userId or playlistId");
    }

    const res = await fetch(`/api/playlist/${playlistId}/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        userId,
        playlistId,
      }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const postPlaylistCount = async (
  playlistId: string,
  playedTime: number,
) => {
  const res = await fetch(`/api/playlist/count`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      playlistId,
      playedTime,
    }),
  });
  const data = await res.json();
  return data;
};

export const postPlaylistLike = async (
  request: PlaylistLikeType,
): Promise<PlaylistLikeResponseType> => {
  if (!request.playlistId || !request.userId) {
    return {
      message: "fail - no playlistId or userId",
      userId: "",
      playlistId: "",
      likedBy: [],
    };
  }

  const { playlistId } = request;
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/${playlistId}/like`,
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = (await res.json()) as PlaylistLikeResponseType;
  return data;
};

/* Song Fetchers */
/* GET */

export const getTrendingSongs = async (
  period?: DAYS_FILTER,
): Promise<TrendingSongPlaylistType> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/trending-songs?recent=${period}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data.trendingData;
};

/* POST */

export const postSongLike = async (request: SongLikeType) => {
  const { songId } = request;
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/song/${songId}/like`,
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  return data;
};

export const postSongCount = async (songId: string) => {
  const res = await fetch(`/api/song/count`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      songId,
    }),
  });
  const data = await res.json();
  return data;
};

/* User Fetchers */
/* GET */

export const getUsersPaths = async (): Promise<string[]> => {
  const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/user/paths`);
  const data = await res.json();
  const paths = data.userNicknamePaths;
  return paths;
};

export const getSingleUserProfile = async (id: string): Promise<UserType> => {
  const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/user/${id}`, {
    next: { tags: ["playlist"], revalidate: 0 },
  });
  const resData = await res.json();
  return resData.user;
};

export const getComments = async (
  postId: string,
  visitorId?: string,
  isProfile?: boolean,
  lastId?: string,
): Promise<CommentType[]> => {
  const res = await fetch(
    `${
      process.env.NEXT_APP_BASE_URL
    }/api/comment/${postId}?userId=${visitorId}&isProfile=${isProfile}&lastId=${
      lastId || ""
    }`,
  );

  const resData: Promise<CommentType[]> = await res
    .json()
    .then((data) => data.comments);
  return resData;
};

/* POST */

export const fetcherSignup = async (reqPayload: SignupPayload) => {
  const data = await fetch(`/api/user/signup`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqPayload),
  }).then((res) => res.json());
  return data;
};

export const postComment = async (request: CommentPayloadType) => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/comment/create`,
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  return data;
};

export const postLikeComment = async (request: PayloadCommentLikeType) => {
  const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/comment/like`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const postDeleteComment = async (request: PayloadCommentDeleteType) => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/comment/delete`,
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  return data;
};

export const postUserFollow = async (request: PostFollowType) => {
  const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/user/follow`, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const postNicknameDuplicate = async (request: { nickname: string }) => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/user/duplicate`,
    {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();
  return data.isDuplicate;
};

export const postUserEdit = async (request: EditProfilePayload) => {
  const formattedData = formatEditUserPayload(request);
  const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/user/edit`, {
    method: "PATCH",
    body: JSON.stringify(formattedData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

/* Search Fetcher */

export const getSearchAll = async (
  keyword: string,
  recent: number,
  orderBy?: string,
): Promise<{
  result: {
    playlists: PlaylistType[];
    users: UserType[];
    categories: { name: string }[];
  };
}> => {
  const res = await fetch(
    `${
      process.env.NEXT_APP_BASE_URL
    }/api/search/all?keyword=${keyword}&recent=${recent}&orderBy=${
      orderBy ? orderBy : ""
    }`,
  );

  const resData: Promise<{
    result: {
      playlists: PlaylistType[];
      users: UserType[];
      categories: { name: string }[];
    };
  }> = await res.json();
  return resData;
};

export const getSearchPlaylists = async (
  keyword: string,
  recent: number,
  orderBy?: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${
      process.env.NEXT_APP_BASE_URL
    }/api/search/playlist?keyword=${keyword}&recent=${recent}&orderBy=${
      orderBy ? orderBy : ""
    }`,
  );

  const resData: Promise<PlaylistType[]> = await res
    .json()
    .then((data) => data.result);
  return resData;
};

export const getSearchCategories = async (
  keyword: string,
): Promise<string[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/search/category?keyword=${keyword}`,
  );

  const resData: Promise<string[]> = await res
    .json()
    .then((data) => data.result);
  return resData;
};

export const getSearchUsers = async (
  keyword: string,
): Promise<{ id: string; nickname: string; profilePic?: string }[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/search/user?keyword=${keyword}`,
  );

  const resData: Promise<
    { id: string; nickname: string; profilePic?: string }[]
  > = await res.json().then((data) => data.result);
  return resData;
};

export const getSearchMoodPlaylists = async (
  keyword: string,
  mood: string,
  recent: number,
  orderBy?: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${
      process.env.NEXT_APP_BASE_URL
    }/api/search/mood-playlist?keyword=${keyword}&mood=${mood}&recent=${recent}&orderBy=${
      orderBy ? orderBy : ""
    }`,
  );

  const resData: Promise<PlaylistType[]> = await res
    .json()
    .then((data) => data.result);
  return resData;
};

export const getSearchCategoryPlaylists = async (
  keyword: string,
  recent: number,
  orderBy?: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${
      process.env.NEXT_APP_BASE_URL
    }/api/search/category-playlist?keyword=${keyword}&recent=${recent}&orderBy=${
      orderBy ? orderBy : ""
    }`,
  );

  const resData: Promise<PlaylistType[]> = await res
    .json()
    .then((data) => data.result);
  return resData;
};

/* ETC Common Fetchers */

export const getYoutubeSearchResult = async (
  search: string,
  pageToken?: string,
) => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_APP_BASE_URL
      }/api/search/youtube?search=${search}&pageToken=${
        pageToken ? pageToken : ""
      }`,
    );
    const data: { message: string; result: YoutubeSearchResponse } =
      await res.json();

    return data.result;
  } catch (err) {
    console.error("youtube error", err);
    throw new Error(`youtube error ${err}`, { cause: "youtube" });
  }
};

export const getRecentPlayedPlaylists = async (
  userId?: string,
): Promise<{
  message: string;
  recentPlayed: PlaylistType[];
  userId?: string;
}> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/user/recent?userId=${
      userId ? userId : ""
    }`,
  );
  const data = await res.json();
  return data;
};

export const postRecentPlayed = async (
  userId: string,
  playlistId: string,
): Promise<{
  message: string;
  userId?: string;
  playlistId?: string;
}> => {
  const res = await fetch(`${process.env.NEXT_APP_BASE_URL}/api/user/recent`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      playlistId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
};

export const fetcherImagePost = async <T extends object>(
  url: string,
  data: FormData,
): Promise<Response> => {
  return await fetch(url, {
    method: "POST",
    body: data,
  }).then((res) => res.json());
};
