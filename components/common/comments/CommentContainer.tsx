"use client";
import React, { useEffect } from "react";
import { CommentType } from "@/libs/types/userType";
import CommentItem from "@/components/common/comments/CommentItem";
import CommentInput from "@/components/common/comments/CommentInput";
import { getComments } from "@/libs/utils/client/fetchers";
import { useQuery } from "@tanstack/react-query";

const CommentContainer = ({
  postId,
  userId,
  isProfile,
}: {
  postId: string;
  userId?: string;
  isProfile?: boolean;
}) => {
  const {
    data: commentsData,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["commentList", postId, userId],
    queryFn: () => getComments(postId, userId, isProfile),
    enabled: !!postId && !!userId,
  });

  useEffect(() => {
    refetch();
  }, [userId]);

  return (
    <div
      className={`flex flex-col justify-start items-start w-full gap-y-3 px-4`}
    >
      <CommentInput postId={postId} isProfile={isProfile} refetch={refetch} />
      {!isLoading &&
        commentsData &&
        commentsData.length > 0 &&
        commentsData.map((comment: CommentType, index) => (
          <CommentItem
            postId={postId}
            userId={userId}
            commentProps={comment}
            key={`comment_${comment.id}_${index}`}
            refetch={refetch}
          />
        ))}{" "}
      {!isLoading && commentsData && commentsData.length === 0 && (
        <p className={`text-gray-300 text-lg font-normal`}>No comments yet.</p>
      )}
      {isLoading && (
        <p className={`text-gray-300 text-lg font-normal`}>Loading...</p>
      )}
    </div>
  );
};

export default CommentContainer;
