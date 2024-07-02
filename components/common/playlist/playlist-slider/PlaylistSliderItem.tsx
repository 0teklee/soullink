"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PlaylistType } from "@/libs/types/song&playlistType";
import Title from "@/components/common/module/Title";
import { useRouter } from "next/navigation";
import { formatPathName } from "@/libs/utils/client/formatter";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import useMutatePlaylistLike from "@/libs/utils/hooks/useMutatePlaylistLike";
import useSelectedPlaylistPlay from "@/libs/utils/hooks/useSelectedPlaylistPlay";

const PlaylistSliderItem = ({
  playlistItem,
}: {
  playlistItem: PlaylistType;
}) => {
  const { data: userSession } = useSession() as { data: UserSessionType };
  const userId = userSession?.userId;
  const router = useRouter();

  const { handleChangePlaylistState } = useSelectedPlaylistPlay(
    playlistItem,
    userId,
  );

  const [isOnHover, setIsOnHover] = useState(false);

  const {
    coverImage,
    songs,
    title,
    author,
    id: playlistId,
    likedBy,
  } = playlistItem;

  const [isUserLikedPlaylist, setIsUserLikedPlaylist] = useState(
    !!userId &&
      !!likedBy &&
      likedBy.length > 0 &&
      likedBy.filter((likeItem) => likeItem.userId === userId).length > 0,
  );
  const { playlistLikeMutate } = useMutatePlaylistLike(
    playlistId,
    userId,
    setIsUserLikedPlaylist,
  );

  const handleLikePlaylist = () => {
    playlistLikeMutate();
  };

  return (
    <div className={`overflow-y-visible`}>
      <div
        className={`flex justify-between items-center w-[300px] mb-2 cursor-pointer`}
      >
        <div
          onClick={() => {
            router.push(`/playlist/${formatPathName(playlistItem.title)}`);
          }}
          className={`overflow-ellipsis line-clamp-1`}
        >
          <Title text={title} size={`h4`} />
        </div>
        <div
          onMouseEnter={() => {
            setIsOnHover(true);
          }}
          onMouseLeave={() => {
            setIsOnHover(false);
          }}
          className={`relative flex items-center gap-1 text-gray-900 dark:text-warmGray-100`}
        >
          {isOnHover && (
            <div
              className={`bg-white text-xs text-gray-700 dark:bg-black dark:text-gray-50 whitespace-nowrap`}
            >
              {isUserLikedPlaylist
                ? `unlike this playlist`
                : `like this playlist`}
            </div>
          )}
          <button onClick={handleLikePlaylist}>
            <Image
              className={`cursor-pointer`}
              src={
                isUserLikedPlaylist
                  ? `/image/common/playlist_liked.svg`
                  : `/image/common/playlist_like.svg`
              }
              alt={`like this playlist`}
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <div
        onClick={() => {
          handleChangePlaylistState(playlistItem);
        }}
        className={`relative w-[300px] h-[300px] hover:bg-black hover:bg-opacity-30 cursor-pointer`}
      >
        <Image
          className={`absolute object-cover hover:blur-md -z-10`}
          src={coverImage || `/image/common/default_cover_image.svg`}
          fill={true}
          alt={`playlist`}
        />
        <div
          className={`flex flex-col h-full items-center justify-center gap-4 text-white opacity-0 hover:opacity-100 z-10`}
        >
          <div className={`flex flex-col justify-center items-center gap-0`}>
            <h2 className={`text-2xl font-bold`}>{title}</h2>
            <h2 className={`text-base font-semibold`}>by {author?.nickname}</h2>
          </div>
          <ul className={`z-2 overflow-hidden`}>
            {songs?.map((song, index) => {
              return (
                <li
                  className={`grid grid-cols-8 gap-3 w-full px-2 font-semibold md:text-xs xs:justify-between xs:gap-2 xs:overflow-x-hidden`}
                  key={index}
                >
                  <span className={`col-span-1 w-sm`}>{index + 1}</span>
                  <div
                    className={`col-span-5 text-start max-w-[160px] desktop:max-w-[140px] overflow-x-hidden`}
                  >
                    <div className={`sideways-scroll`}>
                      <span>{song.title}</span>
                    </div>
                  </div>
                  <div
                    className={`col-span-2 max-w-[80px] xs:max-w-[60px] overflow-x-hidden`}
                  >
                    <div className={`sideways-scroll `}>
                      <span>{song.artist}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaylistSliderItem;
