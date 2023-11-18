"use client";

import React, { Dispatch, SetStateAction } from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPathName } from "@/libs/utils/client/formatter";

const ImageCardItem = ({
  playlist,
  index,
  activeIndex,
  setActiveIndex,
}: {
  playlist: PlaylistType;
  index: number;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}) => {
  const { title, id, author, coverImage } = playlist;
  const isDefault = !title;
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => {
          if (isDefault) {
            return;
          }
          setActiveIndex(index);
        }}
        className={`relative w-[420px] h-56 rounded-lg overflow-hidden cursor-pointer`}
      >
        {!isDefault && (
          <div
            onClick={() => {
              if (index !== activeIndex) {
                return;
              }
              router.push(`/playlist/${formatPathName(title)}`);
            }}
          >
            <Image
              className={`object-cover w-full h-full`}
              alt={title}
              fill={true}
              src={coverImage || "/image/common/default_cover_image.svg"}
            />
          </div>
        )}
        {isDefault && (
          <div
            className={`w-full h-full bg-gradient-to-b from-gray-400 to-white bg-opacity-20`}
          />
        )}
      </div>
      {!isDefault && index === activeIndex && (
        <div className={`flex flex-col items-center gap-1 my-2 text-gray-700 `}>
          <button
            onClick={() => {
              router.push(`/playlist/${formatPathName(title)}`);
            }}
            className={`font-bold z-20 hover:underline`}
          >
            {title}
          </button>
          <button
            onClick={() => {
              router.push(`/user/${formatPathName(author.nickname)}`);
            }}
            className={`text-sm font-medium hover:underline`}
          >
            by {author.nickname}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCardItem;
