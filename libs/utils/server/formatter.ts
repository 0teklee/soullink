import { CommentAuthorInterface, CommentType } from "@/libs/types/userType";

interface CommentDBinterface
  extends Omit<
    CommentType,
    "profile" | "playlist" | "authorId" | "type" | "profileId" | "author"
  > {
  author: CommentAuthorInterface;
  authorId: string;
  profile?: CommentAuthorInterface | null;
  playlist?: {
    author: CommentAuthorInterface | null;
  } | null;
  profileId?: string | null;
}

export const formatIsMutual = (
  followRelations: CommentAuthorInterface,
  postId?: string | null,
) => {
  const { followers, following } = followRelations || {};
  if (!postId || !followers || !following) {
    return false;
  }

  const isMutual =
    followers.some((follower) => follower.follower.id === postId) &&
    following.some((follow) => follow.following.id === postId);

  return isMutual;
};

export const formatPrivate = (
  comment: CommentDBinterface,
  postId?: string | null,
  userId?: string | null,
) => {
  const { isPrivate, author, authorId } = comment;

  if (!isPrivate || author?.id === userId || authorId === userId) {
    return comment;
  }

  const isMutualFollow = formatIsMutual(author, postId);

  if (!userId || !isMutualFollow) {
    return {
      ...comment,
      author: { nickname: "anonymous", profilePic: "" },
      comment: "this is private comment",
    };
  }
  return comment;
};

export const formatDateFilter = (param: string) => {
  const paramNumber = Number(param) || 0;

  if (paramNumber === 0) {
    return new Date(0);
  }

  const date = new Date(Date.now() - paramNumber * 24 * 60 * 60 * 1000);
  return date;
};

export const formatSearchOrderBy = (
  param: string,
): {} | { [key: string]: string } => {
  if (!param)
    return [
      {
        createdAt: "desc",
      },
      {
        playedTime: "desc",
      },
      {
        likedCount: "desc",
      },
    ];

  if (param === "RECENT,DESC") {
    return {
      createdAt: "desc",
    };
  }

  if (param === "RECENT,ASC") {
    return {
      createdAt: "asc",
    };
  }

  if (param === "LIKE,DESC") {
    return {
      likedCount: "desc",
    };
  }

  if (param === "LIKE,ASC") {
    return {
      likedCount: "asc",
    };
  }

  if (param === "PLAY,DESC") {
    return {
      playedCount: "desc",
    };
  }

  if (param === "PLAY,ASC") {
    return {
      playedCount: "asc",
    };
  }

  if (param === "USER,DESC") {
    return {
      followers: {
        _count: "desc",
      },
    };
  }

  if (param === "USER,ASC") {
    return {
      followers: {
        _count: "asc",
      },
    };
  }

  if (param === "PLAYLIST,DESC") {
    return {
      playlists: {
        _count: "desc",
      },
    };
  }

  if (param === "PLAYLIST,ASC") {
    return {
      playlists: {
        _count: "asc",
      },
    };
  }

  if (param === "RECENTPLAYED,DESC") {
    return {
      recentPlay: {
        _count: "desc",
      },
    };
  }

  if (param === "RECENTPLAYED,ASC") {
    return {
      recentPlay: {
        _count: "asc",
      },
    };
  }

  return {};
};

export const formatSongResponse = (
  songs?: {
    songIndex: number;
    song: {
      id: string;
      likedCount?: number;
      playedCount?: number | null;
      title: string;
      artist: string;
      url: string;
      likedUsers: { userId: string }[];
    };
  }[],
) => {
  if (!songs) return [];
  return songs.map((song) => ({
    ...song.song,
    songIndex: song.songIndex || 0,
  }));
};
