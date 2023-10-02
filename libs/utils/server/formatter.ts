import {
  CommentAuthorInterface,
  CommentType,
} from "@/libs/types/common/userType";

interface CommentDBinterface
  extends Omit<
    CommentType,
    "profile" | "playlist" | "authorId" | "type" | "profileId" | "author"
  > {
  author: CommentAuthorInterface;
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
  const { isPrivate, author } = comment;

  if (!isPrivate || author?.id === userId) {
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
