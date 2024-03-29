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

const TopListItem = ({ playlist }: { playlist: PlaylistType }) => {
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
    <div
      className={clsx(
        `w-full h-full`,
        `xs:my-2 py-4 xs:py-2 xs:px-4`,
        `lg:px-2 xl:px-24 3xl:px-48 desktop:px-[400px]`,
      )}
      style={{
        backgroundColor: bgColor,
        color: fontColor,
      }}
    >
      <div
        className={`flex justify-start items-center gap-10 w-full h-top-list-item xs:flex-col xs:gap-3 xs:h-full`}
      >
        <div className={`flex flex-col justify-center items-start gap-3 `}>
          <div
            className={`relative w-[300px] h-[300px] overflow-hidden lg:w-[200px] lg:h-[200px]`}
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
        <div className={`flex flex-col items-start gap-3 w-full`}>
          <div
            className={clsx(
              `flex flex-col items-start gap-1 w-full xs:items-center `,
              `whitespace-nowrap`,
            )}
          >
            <p
              className={`text-2xl font-semibold cursor-pointer hover:underline hover:after:content-['⇢'] hover:after:ml-1`}
              onClick={() => {
                router.push(`/playlist/${formatPathName(title)}`);
              }}
            >
              {title}
            </p>
            <div
              className={`flex justify-center items-center gap-2 text-sm font-medium`}
            >
              <p>
                {songs?.length} {songs?.length <= 1 ? "song" : "songs"}
              </p>
              <p>{likedBy?.length} likes</p>
            </div>
            <div
              onClick={() => {
                router.push(`/user/${formatPathName(nickname)}`);
              }}
              className={clsx(
                `flex justify-center items-center gap-2`,
                `text-base font-normal`,
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
          </div>
          <p className={clsx(`w-full`, `line-clamp-2`)}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TopListItem;
