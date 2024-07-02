import React from "react";

import { PlayerListItem } from "@/libs/types/song&playlistType";
import { playerGlobalStore } from "@/libs/store";

interface IListMenuItem extends PlayerListItem {
  curIndex: number;
  index: number;
}

const ListMenuItem = ({ title, artist, index, curIndex }: IListMenuItem) => {
  const isSelected = curIndex === index;
  return (
    <div
      className={`flex flex-col w-full p-2 hover:bg-gray-300 cursor-pointer`}
      onClick={() => {
        playerGlobalStore.setState((prev) => ({
          ...prev,
          currentSongListIndex: index,
        }));
      }}
    >
      <div className={`flex items-center gap-4 `}>
        <p className={`text-xs text-gray-700 dark:text-gray-50`}>{index + 1}</p>
        <div className={`overflow-x-hidden`}>
          <p
            className={`text-sm ${
              isSelected ? "text-primary" : "text-gray-700 dark:text-gray-50"
            } font-medium sideways-scroll`}
          >
            {title}
          </p>
          <p
            className={`text-xs text-gray-500 dark:text-gray-50 font-normal line-clamp-1 overflow-ellipsis`}
          >
            {artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListMenuItem;
