import React from "react";
import Image from "next/image";
import { PlaylistType } from "@/types/common/Song&PlaylistType";
import Title from "@/components/common/module/Title";

const PlaylistItem = ({ playlistItem }: { playlistItem: PlaylistType }) => {
  const { coverImage, songs, title, author } = playlistItem;
  return (
    <div>
      <div
        className={`flex justify-between items-center w-[400px] xs:w-[300px] desktop:w-[800px]`}
      >
        <Title text={title} size={`h4`} />
        <div className={`flex items-center gap-1 text-gray-900`}>
          <Image
            className={`cursor-pointer`}
            src={`/image/player/list_like.svg`}
            alt={`mobile_header`}
            width={24}
            height={24}
          />
        </div>
      </div>
      <div
        className={`relative xs:w-[300px] xs:h-[300px] 2xl:w-[400px] 2xl:h-[400px] 3xl:w-[500px] 3xl:h-[500px] desktop:w-[800px] desktop:h-[800px] hover:bg-black hover:bg-opacity-30 cursor-pointer`}
      >
        <Image
          className={`absolute object-cover hover:blur-md -z-10`}
          src={coverImage}
          fill={true}
          alt={`playlist`}
        />
        <div
          className={`flex flex-col h-full items-center justify-center gap-4 text-white opacity-0 hover:opacity-100 z-10`}
        >
          <div className={`flex flex-col justify-center items-center gap-0`}>
            <h2 className={`text-2xl font-bold`}>{title}</h2>
            <h2 className={`text-base font-semibold`}>by {author.nickname}</h2>
          </div>
          <ul className={`z-2 `}>
            {songs.map((song, index) => {
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
