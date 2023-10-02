"use client";

import React, { Dispatch } from "react";
import ListMenuItem from "@/components/player/module/ListMenuItem";
import {
  PlayerListItem,
  PlaylistType,
} from "@/libs/types/common/Song&PlaylistType";
import { useRouter } from "next/navigation";
import { formatPathName } from "@/libs/utils/client/formatter";

const ListMenuContainer = ({
  curIndex,
  setCurIndex,
  songList,
  playlist,
}: {
  curIndex: number;
  setCurIndex: Dispatch<React.SetStateAction<number>>;
  songList: PlayerListItem[];
  playlist: PlaylistType | null;
}) => {
  const router = useRouter();
  const { title, author } = playlist || { title: "", author: { nickname: "" } };
  return (
    <div className={`absolute bottom-12 -left-3`}>
      <div
        className={`flex flex-col items-start w-[200px] p-3 bg-gray-50 border border-gray-300 rounded `}
      >
        <div className={`flex justify-between items-center gap-2 w-full mb-2`}>
          <button
            onClick={() => {
              router.push(`/playlist/${formatPathName(title)}`);
            }}
            className={`mb-1 text-lg text-gray-900 font-semibold  hover:underline`}
          >
            {title}
          </button>
          <button
            onClick={() => {
              router.push(`/user/${author.nickname}`);
            }}
            className={`text-sm text-gray-500 font-normal whitespace-nowrap hover:text-primary hover:underline`}
          >
            by {`@${author.nickname}`}
          </button>
        </div>
        {songList.map((song, index) => (
          <ListMenuItem
            key={`${song.id}_${index}`}
            {...song}
            setCurIndex={setCurIndex}
            curIndex={curIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ListMenuContainer;
