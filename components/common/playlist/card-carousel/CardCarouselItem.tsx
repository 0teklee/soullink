"use client";

import React from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSelectedPlaylistPlay from "@/libs/utils/hooks/useSelectedPlaylistPlay";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { formatPathName } from "@/libs/utils/client/formatter";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import { clsx } from "clsx";
import { Card, CardContent, CardFooter } from "@/components/common/atom/card";
import { cn } from "@/libs/utils/client/ui";

const CardCarouselItem = ({ playlist }: { playlist: PlaylistType }) => {
  const { data: session } = useSession() as { data: UserSessionType };
  const userId = session?.userId;

  const {
    title,
    author,
    description,
    coverImage,
    songs,
    likedBy,
    fontColor,
    bgColor,
  } = playlist;

  const { nickname } = author;
  const cover = coverImage || `/image/common/default_cover_image.svg`;
  const { playing, handleChangePlaylistState } = useSelectedPlaylistPlay(
    playlist,
    userId,
  );
  const router = useRouter();

  return (
    <Card
      className={cn(`w-[150px] lg:w-[200px] `, `overflow-hidden`)}
      style={{
        backgroundColor: bgColor,
        color: fontColor,
      }}
    >
      <CardContent
        className={`flex flex-col justify-start items-center gap-3 xs:flex-col xs:gap-3 p-0`}
      >
        <div className={`flex flex-col justify-center items-start gap-3 `}>
          <div
            className={`relative w-[150px] h-[150px] overflow-hidden lg:w-[200px] lg:h-[200px]`}
          >
            <Image
              className={`object-cover overflow-hidden`}
              src={cover}
              alt={`cover`}
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
        </div>
        <CardFooter
          className={`flex flex-col items-start gap-1 w-full px-4 pb-2`}
        >
          <div className={`max-w-full sideways-scroll`}>
            <p
              className={`text-xs font-semibold cursor-pointer `}
              onClick={() => {
                router.push(`/playlist/${formatPathName(title)}`);
              }}
            >
              {title}
            </p>
          </div>
          <div
            onClick={() => {
              router.push(`/user/${formatPathName(nickname)}`);
            }}
            className={clsx(
              `flex justify-center items-center gap-2`,
              `text-xs font-normal`,
              `cursor-pointer`,
            )}
          >
            <p>by</p>
            <div className={`flex justify-center items-center gap-1`}>
              <p className={`hover:underline`}>@{nickname}</p>
              <div
                className={`relative w-5 h-5 bg-white rounded-full overflow-hidden`}
              >
                <Image
                  src={
                    author?.profilePic || `/image/common/default_profile.svg`
                  }
                  alt={`author`}
                  className={`bg-white`}
                  fill={true}
                />
              </div>
            </div>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default CardCarouselItem;
