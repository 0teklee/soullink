"use client";

import React, { useEffect, useState } from "react";
import { getTimelinePlaylists } from "@/libs/utils/client/fetchers";
import Title from "@/components/common/module/Title";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import { useInfiniteQuery } from "@tanstack/react-query";
import Loading from "@/components/common/module/Loading";

const MainFeed = ({ userId }: { userId?: string }) => {
  const [isLast, setIsLast] = useState<boolean>(false);
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["timeline"],
      queryFn: async ({ pageParam }) =>
        await getTimelinePlaylists(userId, pageParam),
      initialPageParam: "",
      refetchInterval: false,
      retry: false,
      getNextPageParam: (lastPage) => {
        if (!lastPage) {
          return undefined;
        }
        return lastPage[lastPage?.length - 1]?.id;
      },
      staleTime: 0,
      gcTime: 0,
      enabled: !isLast,
    });

  useEffect(() => {
    const lastPage = data?.pages[data?.pages?.length - 1];
    if (
      data?.pages &&
      data?.pages?.length > 0 &&
      !!lastPage &&
      lastPage.length < 10
    ) {
      setIsLast(true);
    }
  }, [data]);

  return (
    <section className={`flex flex-col items-start gap-3 w-full `}>
      <Title size={`h1`} text={`Feed`} />
      {data &&
        data?.pages &&
        data?.pages.map((page, idx) => (
          <PlaylistListContainer
            key={`timeline_${idx}`}
            playlists={page}
            isLarge={true}
          />
        ))}
      {data && data?.pages && data.pages.length === 0 && (
        <Title size={`h2`} text={`No playlists yet`} />
      )}
      {(isLoading || isFetchingNextPage) && <Loading />}
      {!isLoading && !isLast && !isFetchingNextPage && (
        <div className={`flex justify-center w-full `}>
          <button
            className={`text-primary text-md hover:text-gray-500`}
            onClick={() => fetchNextPage()}
          >
            Load more
          </button>
        </div>
      )}
    </section>
  );
};

export default MainFeed;
