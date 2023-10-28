import {
  CreatePlaylistType,
  PlaylistLikeType,
  PlaylistMoodType,
  PlaylistType,
  SongLikeType,
  TrendingSongPlaylistType,
} from "@/libs/types/common/Song&PlaylistType";
import {
  CommentPayloadType,
  CommentType,
  PayloadCommentDeleteType,
  PayloadCommentLikeType,
  PostFollowType,
  UserType,
} from "@/libs/types/common/userType";

/* Playlist Fetchers */
/* GET */

export const getSinglePlaylist = async (id: string): Promise<PlaylistType> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/${id}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const resData: Promise<PlaylistType> = await res
    .json()
    .then((data) => data.data);
  return resData;
};

export const getPlaylistsPaths = async (): Promise<string[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/paths`,
  );
  const data = await res.json();
  const paths = data.playlistsPaths;
  return paths;
};

export const getTrendingPlaylists = async (): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/trending`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data.trendingPlayLists;
};

export const getRecentPlaylists = async (
  id: string,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/recent?id=${id}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data.trendingPlayLists;
};

export const getMoodPlaylists = async (
  param: PlaylistMoodType,
): Promise<PlaylistType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/mood?param=${param}`,
    { next: { tags: ["playlist"], revalidate: 0 } },
  );
  const data = await res.json();
  return data.moodPlayLists;
};

/* POST */

export const postCreatePlaylist = async (
  payload: CreatePlaylistType,
  userId: string,
) => {
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

export const postPlaylistLike = async (request: PlaylistLikeType) => {
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
  const data = await res.json();
  return data;
};

/* Song Fetchers */
/* GET */

export const getTrendingSongs = async (): Promise<TrendingSongPlaylistType> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/playlist/list/trending-songs`,
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
  id: string,
  visitorId?: string,
  isProfile?: boolean,
): Promise<CommentType[]> => {
  const res = await fetch(
    `${process.env.NEXT_APP_BASE_URL}/api/comment/${id}?userId=${visitorId}&isProfile=${isProfile}`,
  );

  const resData: Promise<CommentType[]> = await res
    .json()
    .then((data) => data.comments);
  return resData;
};

/* POST */

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
