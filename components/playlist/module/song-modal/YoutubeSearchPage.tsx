"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getYoutubeSearchResult } from "@/libs/utils/client/fetchers";
import { useInView } from "react-intersection-observer";
import Title from "@/components/common/module/Title";
import useTimer from "@/libs/utils/hooks/useTimer";
import { formatSongNames } from "@/libs/utils/client/formatter";
import { YoutubeItem } from "@/libs/types/youtubeTypes";
import { SongType } from "@/libs/types/song&playlistType";
import { SetterOrUpdater } from "recoil";
import Loading from "@/components/common/module/Loading";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";

interface SearchPageProps {
  songValue: SongType;
  setSongValue: React.Dispatch<React.SetStateAction<SongType>>;
  urlType: string;
  setModalOpenState: SetterOrUpdater<boolean>;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const YoutubeSearchPage = ({
  songValue,
  setSongValue,
  urlType,
  setModalOpenState,
  setPage,
}: SearchPageProps) => {
  const queryClient = useQueryClient();
  const { ref: infiniteQueryRef, inView } = useInView();
  const pageToken = useRef<string>("");

  const [isTypingDone, setIsTypingDone] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");

  const [isLast, setIsLast] = useState<boolean>(false);
  const [isYoutubeError, setIsYoutubeError] = useState<boolean>(false);

  const { timer, resetTimer } = useTimer(() => {
    setIsTypingDone(true);
  }, 1200);

  const {
    data: youtubeData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["youtube", searchWord],
    queryFn: async () => {
      const res = await getYoutubeSearchResult(searchWord, pageToken.current);

      if (!res) {
        setIsYoutubeError(true);
        throw new Error("Youtube Api Error");
      }
      return res;
    },
    getNextPageParam: (lastPage) => {
      pageToken.current = lastPage.nextPageToken;
      return lastPage.nextPageToken;
    },
    initialPageParam: "",
    throwOnError: false,
    enabled: !!searchWord && isTypingDone,
  });

  const isDataLoaded =
    youtubeData && youtubeData?.pages?.length && youtubeData?.pages?.length > 0;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchWord(e.target.value);
    resetTimer(timer);
  };

  useEffect(() => {
    if (!searchWord) {
      queryClient.invalidateQueries({ queryKey: ["youtube"] });
      return;
    }
  }, [searchWord]);

  useEffect(() => {
    if (inView && !isLoading && !isFetchingNextPage && !isLast) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <Title size={`h2`} text={`Search song`} />
      <div className={`relative w-full`}>
        <input
          className={`w-full p-2 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          placeholder={`search on ${urlType}`}
          type={`text`}
          value={searchWord}
          onChange={handleSearch}
        />
        {isLoading && isTypingDone && (
          <div className={`absolute top-1/2 right-1 -translate-y-1/2`}>
            <Loading size={40} />
          </div>
        )}
      </div>
      <ReactQueryErrorBoundary>
        <div
          className={`flex flex-col items-start gap-2 max-h-[300px] overflow-y-scroll`}
        >
          {urlType === "youtube" &&
            isDataLoaded &&
            youtubeData.pages.map((pageResponse, index) => {
              if (!pageResponse) {
                return;
              }

              if (!pageResponse.items || pageResponse.items.length < 10) {
                setIsLast(true);
                return;
              }

              return pageResponse.items.map((item: YoutubeItem) => {
                if (
                  item.id.kind === "youtube#channel" ||
                  item.id.kind === "youtube#playlist"
                ) {
                  return;
                }
                return (
                  <button
                    key={`yt_result_${index}_${item.id.videoId}`}
                    className={`flex items-center justify-start gap-2 w-full p-2 bg-white hover:bg-primary hover:text-white rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    onClick={() => {
                      setSongValue({
                        ...songValue,
                        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                        title: formatSongNames(item.snippet.title),
                        artist: formatSongNames(item.snippet.channelTitle),
                        thumbnail: item.snippet.thumbnails.default.url,
                      });
                      setPage("submit");
                    }}
                  >
                    <div className={`relative w-16 h-16 rounded`}>
                      <Image
                        className={`object-cover`}
                        fill={true}
                        src={item.snippet.thumbnails.default.url}
                        alt={item.snippet.title}
                        unoptimized={true}
                      />
                    </div>
                    <div
                      className={`flex flex-col items-start justify-start gap-1 max-w-sm overflow-ellipsis line-clamp-2`}
                    >
                      <p
                        className={`text-start text-sm font-bold sideways-scroll`}
                      >
                        {formatSongNames(item.snippet.title)}
                      </p>
                      <p className={`text-xs`}>
                        {formatSongNames(item.snippet.channelTitle)}
                      </p>
                    </div>
                  </button>
                );
              });
            })}
          {isDataLoaded &&
            !isFetchingNextPage &&
            !isYoutubeError &&
            !isLast &&
            !isLoading && (
              <div
                className={`py-5 bg-transparent opacity-0`}
                ref={infiniteQueryRef}
              />
            )}
          {isFetchingNextPage && <Loading size={40} />}
        </div>
      </ReactQueryErrorBoundary>
      {isYoutubeError && (
        <div
          className={`flex flex-col items-center justify-center w-full p-2 text-sm gap-2 text-gray-500`}
        >
          <p className={`text-sm text-pink-600`}>
            YouTube API error occurred. Please manually type the URL and song
            information, or try again later.
          </p>
          <button
            onClick={() => {
              queryClient.invalidateQueries({ queryKey: ["youtube"] });
              setModalOpenState(false);
            }}
            className={`px-3 py-2 bg-red-500 text-sm text-white font-semibold rounded`}
          >
            Go back
          </button>
        </div>
      )}
    </>
  );
};

export default YoutubeSearchPage;
