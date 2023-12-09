"use client";

import React, { useEffect, useRef, useState } from "react";
import { getComments } from "@/libs/utils/client/fetchers";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import CommentItem from "@/components/common/comments/CommentItem";

const CommentContainer = ({
  postId,
  userId,
  isProfile,
}: {
  postId: string;
  userId?: string;
  isProfile?: boolean;
}) => {
  const lastCursor = useRef<string | undefined>();
  const [isLast, setIsLast] = useState<boolean>(false);

  const { ref: lastPageRef, inView } = useInView();

  const {
    data: commentsData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ["commentList", postId, userId],
    queryFn: async () => {
      if (!postId) {
        return;
      }

      const res = await getComments(
        postId,
        userId,
        isProfile,
        lastCursor.current,
      );

      return res;
    },
    initialPageParam: undefined,
    refetchInterval: false,
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage?.length < 10) {
        return undefined;
      }
      lastCursor.current = lastPage[lastPage?.length - 1].id;
      return lastPage[lastPage?.length - 1].id as string;
    },
  });

  useEffect(() => {
    const lastPage = commentsData?.pages[commentsData?.pages?.length - 1];
    if (
      commentsData?.pages &&
      commentsData?.pages?.length > 0 &&
      !!lastPage &&
      lastPage.length < 10
    ) {
      setIsLast(true);
    }
  }, [commentsData]);

  useEffect(() => {
    if (inView && !isLoading && !isFetchingNextPage && !isLast) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {commentsData?.pages?.length > 0 &&
        commentsData.pages.map((page, index) => {
          return page?.map((comment) => (
            <CommentItem
              postId={postId}
              userId={userId}
              commentProps={comment}
              key={`comment_${comment.id}_${index}`}
            />
          ));
        })}
      {!!commentsData?.pages?.length && commentsData?.pages?.length === 0 && (
        <p className={`text-gray-300 text-lg font-normal`}>No comments yet.</p>
      )}
      {!isLast && <div className={`w-full py-2 opacity-0`} ref={lastPageRef} />}
    </>
  );
};

export default CommentContainer;
