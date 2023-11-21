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

const PlaylistItem = ({ playlistItem }: { playlistItem: PlaylistType }) => {
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

  const isUserLikedPlaylist =
    likedBy &&
    likedBy.filter((likeItem) => likeItem.userId === userId).length > 0;

  const { playlistLikeMutate } = useMutatePlaylistLike();

  const handleLikePlaylist = async () => {
    playlistLikeMutate(playlistId, userId);
  };

  return (
    <div className={`overflow-y-visible`}>
      <div
        className={`flex justify-between items-center w-[400px] mb-2 lg:w-[300px] cursor-pointer`}
      >
        <div
          onClick={() => {
            router.push(`/playlist/${formatPathName(playlistItem.title)}`);
          }}
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
          className={`relative flex items-center gap-1 text-gray-900`}
        >
          {isOnHover && (
            <div className={`bg-white text-xs text-gray-700 whitespace-nowrap`}>
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
        className={`relative xs:w-[300px]  xs:h-[300px] lg:w-[300px] lg:h-[300px] 2xl:w-[400px] 2xl:h-[400px] 3xl:w-[500px] 3xl:h-[500px] desktop:w-[800px] desktop:h-[800px] hover:bg-black hover:bg-opacity-30 cursor-pointer`}
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
          <ul className={`z-2 `}>
            {songs?.map((song, index) => {
              return (
                <li
                  className={`flex items-center justify-center gap-3 font-bold`}
                  key={index}
                >
                  <span>{index + 1}</span>
                  <span>{song.title}</span>
                  <span>-</span>
                  <span>{song.artist}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
