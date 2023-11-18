"use client";

import React, { useEffect, useRef, useState } from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  formatMoodFontColor,
  formatPathName,
} from "@/libs/utils/client/formatter";
import dayjs from "dayjs";
import CommonModal from "@/components/common/modal/CommonModal";
import CommonSongModal from "@/components/common/modal/CommonSongModal";
import useClickOutside from "@/libs/utils/hooks/useClickOutside";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import {
  HeartIcon as OutlineHeartIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import CategoriesList from "@/components/common/category/list/CategoriesList";
import useSelectedPlaylistPlay from "@/libs/utils/hooks/useSelectedPlaylistPlay";
import useMutatePlaylistLike from "@/libs/utils/hooks/useMutatePlaylistLike";

const PlaylistListItem = ({
  playlist,
  index,
  isLarge,
}: {
  playlist: PlaylistType;
  index?: number;
  isLarge?: boolean;
}) => {
  const { data: session } = useSession() as { data: UserSessionType };
  const userId = session?.userId;

  const router = useRouter();
  const { playing, handleChangePlaylistState } =
    useSelectedPlaylistPlay(playlist);
  const { playlistLikeMutate } = useMutatePlaylistLike();

  const {
    id: playlistId,
    title,
    author,
    songs,
    coverImage,
    likedCount,
    playedCount,
    description,
    mood,
    createdAt,
    likedBy,
  } = playlist;

  const [isLikedByDropdownOpen, setIsLikedByDropdownOpen] = useState(false);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);
  const [isUserLikedPlaylist, setIsUserLikedPlaylist] = useState(
    likedBy?.filter((user) => user.userId === userId).length > 0,
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  const cover = coverImage || `/image/common/default_cover_image.svg`;

  const handleLikePlaylist = async () => {
    playlistLikeMutate(playlistId, userId);
  };

  const handleClickOutside = () => {
    setIsLikedByDropdownOpen(false);
  };

  useClickOutside({
    ref: dropdownRef,
    handler: handleClickOutside,
  });

  useEffect(() => {
    setIsUserLikedPlaylist(
      likedBy?.filter((user) => user.userId === userId).length > 0,
    );
  }, [playlist, likedBy, userId]);

  return (
    <>
      <div
        className={` 
      grid ${
        index ? "grid-cols-4" : "grid-cols-3"
      } grid-rows-1  px-2 py-3 gap-y-0 gap-x-3 
        items-center border-b border-gray-200 hover:bg-gray-100 xs:gap-x-4 lg:gap-x-24
           lg:grid-cols-3`}
      >
        <div
          className={`relative flex items-center justify-start gap-2 ${
            index ? "col-span-2" : "w-80"
          } overflow-ellipsis lg:col-span-2`}
        >
          <div
            className={`flex items-center justify-center w-10 ${
              index ? "" : "hidden"
            }`}
          >
            <p className={`text-gray-700 xs:text-xs`}>{index}</p>
          </div>
          <div
            className={`${
              isLarge ? "w-32 h-32" : "w-10 h-10"
            } relative xs:w-10 xs:h-10 lg:w-20 lg:h-20`}
          >
            <Image
              className={`object-cover`}
              src={cover}
              alt={`playlist_cover`}
              fill={true}
            />
            <div
              onClick={() => {
                handleChangePlaylistState(playlist);
              }}
              className={`absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 z-[3] cursor-pointer opacity-0 hover:opacity-100`}
            >
              {playing ? (
                <PauseIcon className={`w-16 h-16 text-white`} />
              ) : (
                <PlayIcon className={`w-16 h-16 text-white`} />
              )}
            </div>
          </div>
          <div className={` flex flex-col items-start gap-3`}>
            <div>
              <button
                onClick={() => {
                  router.push(`/playlist/${formatPathName(title)}`);
                }}
                className={`text-lg text-gray-900 font-medium hover:text-primary xs:text-xs lg:text-start`}
              >
                {title}
              </button>
              <div
                className={`relative flex items-center gap-2 text-xs text-gray-500 font-medium`}
              >
                <div className={`flex items-center justify-start gap-2`}>
                  {isUserLikedPlaylist ? (
                    <button
                      onClick={handleLikePlaylist}
                      className={`flex items-center justify-center`}
                    >
                      <HeartIcon
                        className={`w-4 h-4 text-primary hover:text-gray-500`}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={handleLikePlaylist}
                      className={`flex items-center justify-center`}
                    >
                      <OutlineHeartIcon
                        className={`w-4 h-4 text-gray-500 hover:text-primary`}
                      />
                    </button>
                  )}
                  <button
                    className={`hover:underline hover:text-primary`}
                    onClick={() => {
                      if (likedBy.length > 0) {
                        setIsLikedByDropdownOpen((prev) => !prev);
                      }
                    }}
                  >
                    {likedCount} likes
                  </button>
                </div>
                <p>{playedCount} played</p>
                {isLikedByDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className={`absolute top-5 left-0 px-3 py-2 z-10 bg-white border border-gray-300 rounded`}
                  >
                    {likedBy?.map((user) => (
                      <div
                        key={`likedBy_${user.user?.nickname}`}
                        className={`flex items-center justify-start gap-1 w-full whitespace-nowrap px-2 py-2`}
                      >
                        <div
                          className={`flex items-center justify-start gap-2`}
                        >
                          <div className={`w-4 h-4`}>
                            <Image
                              className={`rounded-full`}
                              src={
                                user.user?.profilePic ||
                                "/image/common/default_profile.svg"
                              }
                              alt={`usr_${user.user?.nickname}`}
                              width={16}
                              height={16}
                            />
                          </div>
                          <button
                            className={`flex items-center justify-start gap-1`}
                            onClick={() => {
                              const formattedNickname = formatPathName(
                                user.user?.nickname || "",
                              );
                              router.push(`/user/${formattedNickname}`);
                            }}
                          >
                            <p
                              className={`text-xs text-gray-900 font-semibold underline`}
                            >
                              @{user.user?.nickname || ""}
                            </p>
                            <p>liked</p>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className={`text-xs text-gray-700 xs:hidden`}>
                {dayjs(createdAt).format("YYYY.MM.DD")}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${
            !isLarge ? "hidden" : ""
          } flex flex-col w-fit items-start gap-2 text-gray-700 xs:hidden`}
        >
          <button
            onClick={() => {
              router.push(`/user/${formatPathName(author.nickname)}`);
            }}
            className={`font-medium hover:text-primary`}
          >
            by {author.nickname}
          </button>
          <button
            onClick={() => {
              setIsSongModalOpen(true);
            }}
            className={`text-sm font-medium hover:text-primary`}
          >
            {songs.length} songs
          </button>
          <p className={`text-sm xs:hidden`}>{description}</p>
        </div>
        <div className={`${isLarge && "hidden"} lg:hidden`}>
          <p className={`text-xs text-gray-500`}>{songs.length} songs</p>
        </div>
        <div
          className={`${
            isLarge ? "hidden" : ""
          } flex items-center gap-2 text-sm text-gray-700 xs:block xs:w-full xs:text-end`}
        >
          <button
            onClick={() => {
              router.push(`/user/${formatPathName(author.nickname)}`);
            }}
            className={` font-medium hover:text-primary`}
          >
            by {author.nickname}
          </button>
        </div>
        <div
          className={`${
            !isLarge ? "hidden" : ""
          } flex flex-col items-center gap-2 text-sm font-medium lg:hidden xs:hidden`}
        >
          {mood && (
            <p className={`${formatMoodFontColor(mood.name)} `}>{mood.name}</p>
          )}
          <div
            className={`flex flex-wrap items-center gap-1 text-gray-500 text-xs`}
          >
            <CategoriesList categories={playlist.category} />
          </div>
        </div>
      </div>
      <CommonModal
        isModalOpen={isSongModalOpen}
        setIsModalOpen={setIsSongModalOpen}
      >
        <CommonSongModal songs={songs} setIsModalOpen={setIsSongModalOpen} />
      </CommonModal>
    </>
  );
};

export default PlaylistListItem;
