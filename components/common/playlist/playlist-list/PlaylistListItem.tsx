"use client";

import React from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPathName } from "@/libs/utils/client/formatter";

const PlaylistListItem = ({ playlist }: { playlist: PlaylistType }) => {
  const router = useRouter();
  const { title, id, author, songs, coverImage, likedCount } = playlist;
  const cover = coverImage || `/image/common/default_cover_image.svg`;

  return (
    <div
      className={`grid grid-cols-3 grid-rows-1 max-h-fit items-center px-2 py-3 gap-y-0 gap-x-3 border-b border-gray-200 hover:bg-gray-100`}
    >
      <div className={`row-start-auto flex items-center justify-start gap-2`}>
        <div className={`w-10 h-10 relative`}>
          <Image
            className={`object-cover`}
            src={cover}
            alt={`playlist_cover`}
            fill={true}
          />
        </div>
        <div>
          <button
            onClick={() => {
              router.push(`/playlist/${formatPathName(title)}`);
            }}
            className={`text-lg text-gray-900 font-medium hover:text-primary`}
          >
            {title}
          </button>
          <p className={`text-xs text-gray-500 font-medium`}>
            {likedCount} likes
          </p>
        </div>
      </div>
      <div className={`row-start-auto`}>
        <p className={`text-xs text-gray-500`}>{songs.length} songs</p>
      </div>
      <div className={`row-start-auto`}>
        <button
          onClick={() => {
            router.push(`/user/${formatPathName(author.nickname)}`);
          }}
          className={`text-sm text-gray-700 font-medium hover:text-primary`}
        >
          {author.nickname}
        </button>
      </div>
    </div>
  );
};

export default PlaylistListItem;
