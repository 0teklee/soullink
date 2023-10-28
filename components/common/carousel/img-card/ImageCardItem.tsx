"use client";

import React, { Dispatch, SetStateAction } from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import Image from "next/image";

const ImageCardItem = ({
  playlist,
  index,
  handleClickCard,
}: {
  playlist: PlaylistType;
  index: number;
  handleClickCard: (index: number) => void;
}) => {
  const { title, id, author, coverImage } = playlist;
  const isDefault = !title;
  return (
    <div
      onClick={() => handleClickCard(index)}
      className={`relative w-96 h-56 rounded-lg overflow-hidden cursor-pointer`}
    >
      <p
        className={`text-2xl font-bold text-red-900 absolute top-1 left-2 z-10`}
      >
        {title}
      </p>
      {!isDefault && (
        <Image
          className={`object-cover w-full h-full`}
          alt={title}
          fill={true}
          src={coverImage || "/image/common/default_cover_image.svg"}
        />
      )}
      {isDefault && (
        <div
          className={`w-full h-full bg-gradient-to-b from-gray-400 to-white bg-opacity-20`}
        />
      )}
    </div>
  );
};

export default ImageCardItem;
