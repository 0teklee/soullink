"use client";

import React from "react";
import ListMenuItem from "@/components/player/module/ListMenuItem";
import { PlayerListItem, PlaylistType } from "@/libs/types/song&playlistType";
import { useRouter } from "next/navigation";
import { formatPathName } from "@/libs/utils/client/formatter";
import { SetterOrUpdater } from "recoil";
import { PlayerType } from "@/libs/types/playerType";

const ListMenuContainer = ({
  curIndex,
  setPlayerState,
  songList,
  playlist,
}: {
  curIndex: number;
  setPlayerState: SetterOrUpdater<PlayerType>;
  songList: PlayerListItem[];
  playlist: PlaylistType | null;
}) => {
  const router = useRouter();
  const { title, author } = playlist || { title: "", author: { nickname: "" } };
  return (
    <div
      className={`absolute bottom-12 ${
        playlist?.isSongTable ? "-left-12" : "-left-3"
      }`}
    >
      <div
        className={`flex flex-col items-start w-[200px] p-3 bg-gray-50 border border-gray-300 rounded `}
      >
        <div
          className={`flex overflow-x-hidden justify-between items-center gap-2 w-full mb-2`}
        >
          <button
            onClick={() => {
              router.push(`/playlist/${formatPathName(title)}`);
            }}
            className={`mb-1 sideways-scroll text-base text-gray-900 dark:text-warmGray-100 font-semibold  hover:underline`}
          >
            {title}
          </button>
          {author.nickname && (
            <button
              onClick={() => {
                router.push(`/user/${decodeURIComponent(author.nickname)}`);
              }}
              className={`sideways-scroll text-sm text-gray-500 dark:text-warmGray-50 font-normal whitespace-nowrap hover:text-primary hover:underline`}
            >
              by {`@${author.nickname}`}
            </button>
          )}
        </div>
        {songList.map((song, index) => (
          <ListMenuItem
            key={`${song.id}_${index}`}
            {...song}
            setPlayerState={setPlayerState}
            curIndex={curIndex}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ListMenuContainer;
