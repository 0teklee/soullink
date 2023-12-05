"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { getComments } from "@/libs/utils/client/fetchers";
import CommentItem from "@/components/common/comments/CommentItem";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import Loading from "@/components/common/module/Loading";

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
    refetch,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ["commentList", postId, userId],
    queryFn: async () => {
      const res = await getComments(
        postId,
        userId,
        isProfile,
        lastCursor.current,
      );
      if (res?.length < 10) {
        setIsLast(true);
      }
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
    if (inView && !isLoading && !isFetchingNextPage && !isLast) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {commentsData?.pages?.length > 0 &&
          commentsData.pages.map((page, index) => {
            return page?.map((comment) => (
              <CommentItem
                postId={postId}
                userId={userId}
                commentProps={comment}
                key={`comment_${comment.id}_${index}`}
                refetch={refetch}
              />
            ));
          })}
        {!!commentsData?.pages?.length && commentsData?.pages?.length === 0 && (
          <p className={`text-gray-300 text-lg font-normal`}>
            No comments yet.
          </p>
        )}
      </Suspense>
      {!isLast && <div className={`w-full py-2 opacity-0`} ref={lastPageRef} />}
    </>
  );
};

export default CommentContainer;
