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

const TopListItem = ({ playlist }: { playlist: PlaylistType }) => {
  const { data: session } = useSession() as { data: UserSessionType };
  const userId = session?.userId;

  const { title, author, description, coverImage, songs, likedBy } = playlist;
  const { nickname } = author;
  const cover = coverImage || `/image/common/default_cover_image.svg`;
  const { playing, handleChangePlaylistState } = useSelectedPlaylistPlay(
    playlist,
    userId,
  );
  const router = useRouter();

  return (
    <div className={`relative w-full h-full`}>
      <div
        className={`flex justify-start items-center gap-10 w-full h-[340px] px-5 xs:flex-col xs:gap-3 xs:h-full xs:py-4`}
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
        <div
          className={`flex flex-col items-start gap-3  [&_p]:mix-blend-difference`}
        >
          <div
            className={`flex flex-col items-start gap-1 w-full xs:items-center `}
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
              className={`flex justify-center items-center text-base font-normal gap-2 cursor-pointer`}
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
          <div className={`flex flex-col justify-start items-start gap-0.5`}>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopListItem;
