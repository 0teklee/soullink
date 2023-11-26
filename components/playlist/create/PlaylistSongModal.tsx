import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

import Title from "@/components/common/module/Title";
import {
  PlaylistCreateRequestType,
  SONG_URL_TYPE,
  SongType,
} from "@/libs/types/song&playlistType";
import {
  formatIsSongCustomUrlValid,
  formatSongNames,
} from "@/libs/utils/client/formatter";
import useTimer from "@/libs/utils/hooks/useTimer";
import { getYoutubeSearchResult } from "@/libs/utils/client/fetchers";
import { YoutubeItem } from "@/libs/types/youtubeTypes";
import { useInView } from "react-intersection-observer";
import {
  SONG_AVAIL_CUSTOM_URL,
  SONG_DEFAULT_VALUE,
  SONG_TYPE_OPTIONS,
} from "@/libs/utils/client/commonValues";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const PlaylistSongModal = ({
  setModalOpen,
  setSongList,
  setPayload,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setSongList: Dispatch<SetStateAction<SongType[]>>;
  setPayload: Dispatch<SetStateAction<PlaylistCreateRequestType>>;
}) => {
  const queryClient = useQueryClient();
  const { ref: infiniteQueryRef, inView } = useInView();

  const [page, setPage] = useState("submit");
  const [songValue, setSongValue] = useState<SongType>(SONG_DEFAULT_VALUE);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isTypingDone, setIsTypingDone] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const [urlType, setUrlType] = useState<SONG_URL_TYPE>("");
  const [isAvailableCustomUrl, setIsAvailableCustomUrl] =
    useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isYoutubeError, setIsYoutubeError] = useState<boolean>(false);

  const {
    data: youtubeData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["youtube", searchWord],
    queryFn: async () => {
      const res = await getYoutubeSearchResult(searchWord, "");

      if (!res) {
        setIsYoutubeError(true);
        throw new Error("Youtube Api Error");
      }
      return res;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageToken;
    },
    initialPageParam: "",
    throwOnError: false,
    enabled: !!searchWord && isTypingDone,
  });

  const { timer, resetTimer } = useTimer(() => {
    setIsTypingDone(true);
  }, 1200);

  const isUrlValid = formatIsSongCustomUrlValid(
    songValue.url,
    SONG_AVAIL_CUSTOM_URL,
  );

  const isDataLoaded =
    youtubeData && youtubeData?.pages?.length && youtubeData?.pages?.length > 0;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchWord(e.target.value);
    resetTimer(timer);
  };

  const handleAddSong = () => {
    if (urlType === "custom" && isUrlValid) {
      setIsAvailableCustomUrl(false);
      return;
    }

    if (songValue.title === "" || songValue.artist === "") {
      alert("Please fill the title and artist");
      return;
    }

    setSongList((prev) => [...prev, songValue]);
    setPayload((prev) => ({
      ...prev,
      songs: [...prev.songs, songValue],
    }));

    setSongValue(SONG_DEFAULT_VALUE);
    setModalOpen(false);
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
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`relative flex flex-col items-center justify-center gap-4 max-w-md p-5 xs:p-2 bg-white`}
    >
      <button
        onClick={() => {
          setModalOpen(false);
        }}
        className={`absolute top-2 right-3 text-gray-400 text-base`}
      >
        <XMarkIcon className={`w-5 h-5`} />
      </button>
      {page === "submit" && (
        <>
          <Title size={`h2`} text={`Add Song`} />
          <div
            className={`relative flex items-center justify-between gap-0 ${
              urlType === "custom" && "mb-5"
            } `}
          >
            <div
              className={`flex items-center gap-3 p-3 border-y border-l border-gray-200 rounded-y rounded-l`}
            >
              <button
                className={`text-gray-500`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className={`relative top-0.5  mr-2`}>⛛</span>
                <span>{urlType ? urlType : "from"}</span>
              </button>
            </div>
            {isDropdownOpen && (
              <div
                className={`absolute top-12 p-3 bg-white rounded border border-gray-300 z-10`}
              >
                {SONG_TYPE_OPTIONS.map((type, index) => (
                  <button
                    key={`${type}_${index}`}
                    className={`w-full p-2 text-left hover:bg-gray-100`}
                    onClick={() => {
                      setSongValue({
                        ...songValue,
                        url: "",
                        title: "",
                        artist: "",
                        thumbnail: "",
                      });
                      setUrlType(type);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
            <div
              className={`p-3 bg-white border-y border-r border-gray-200 rounded-y rounded-r focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            >
              {!songValue.url && urlType !== "custom" && (
                <button
                  onClick={() => {
                    if (!urlType) {
                      setIsDropdownOpen(true);
                      return;
                    }
                    setPage("search");
                  }}
                  className={`text-gray-500 underline`}
                >
                  {urlType
                    ? `click to search from ${urlType}`
                    : "click to select search type"}
                </button>
              )}
              {((songValue.url && urlType) || urlType === "custom") && (
                <input
                  className={`bg-white`}
                  type={`text`}
                  placeholder={`url`}
                  value={songValue.url}
                  onChange={(e) => {
                    setSongValue({ ...songValue, url: e.target.value });
                  }}
                />
              )}
            </div>
            {urlType === "custom" && (
              <p
                className={`absolute top-12 pt-1 text-xs ${
                  isAvailableCustomUrl ? `text-gray-400` : `text-pink-600`
                }`}
              >
                {isAvailableCustomUrl
                  ? "Available URL : soundcloud, mixcloud, vimeo, facebook, twitch"
                  : "Only available URL : soundcloud, mixcloud, vimeo, facebook, twitch"}
              </p>
            )}
          </div>
          <div className={`flex items-center justify-start gap-0 w-full`}>
            <div
              className={`flex justify-center w-16 p-3 border-y border-x border-gray-200 rounded-y rounded-l`}
            >
              Title
            </div>
            <div
              className={`p-3 bg-white border-y border-r border-gray-200 rounded-y rounded-r focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            >
              <input
                className={`bg-white`}
                type={`text`}
                placeholder={`title`}
                value={songValue.title}
                onChange={(e) => {
                  setSongValue({ ...songValue, title: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={`flex items-center justify-start gap-0 w-full`}>
            <div
              className={`flex items-center w-16 p-3 border-y border-x border-gray-200 rounded-y rounded-l`}
            >
              Artist
            </div>
            <div
              className={`p-3 bg-white border-y border-r border-gray-200 rounded-y rounded-r focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            >
              <input
                className={`bg-white`}
                type={`text`}
                placeholder={`artist`}
                value={songValue.artist}
                onChange={(e) => {
                  setSongValue({ ...songValue, artist: e.target.value });
                }}
              />
            </div>
          </div>
          <button
            onClick={handleAddSong}
            className={`mt-4 px-3 py-2 text-primary border-2 border-primary rounded`}
          >
            Add to playlist
          </button>
        </>
      )}
      {page === "search" && (
        <>
          <Title size={`h2`} text={`Search song`} />
          <input
            className={`w-full p-2 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            placeholder={`search on ${urlType}`}
            type={`text`}
            value={searchWord}
            onChange={handleSearch}
          />
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
                          className={`object-cover w-16 h-16`}
                          fill={true}
                          src={item.snippet.thumbnails.default.url}
                          alt={item.snippet.title}
                          unoptimized={true}
                        />
                      </div>
                      <div
                        className={`flex flex-col items-start justify-start gap-1 max-w-sm overflow-ellipsis line-clamp-2`}
                      >
                        <p className={`text-start text-sm font-bold`}>
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
          </div>
          {isYoutubeError && (
            <div
              className={`flex flex-col items-center justify-center w-full p-2 text-sm gap-2 text-gray-500`}
            >
              <p className={`text-sm text-pink-600`}>
                YouTube API error occurred. Please manually type the URL and
                song information, or try again later.
              </p>
              <button
                onClick={() => {
                  queryClient.invalidateQueries({ queryKey: ["youtube"] });
                  setModalOpen(false);
                }}
                className={`px-3 py-2 bg-pink-600 text-sm text-white font-semibold rounded`}
              >
                Go back
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlaylistSongModal;
