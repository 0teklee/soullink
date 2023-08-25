import React, { Dispatch } from "react";
import { PlayerListItem } from "@/types/common/playerTypes";

interface IListMenuItem extends PlayerListItem {
  curIndex: number;
  setCurIndex: Dispatch<React.SetStateAction<number>>;
  index: number;
}

const ListMenuItem = ({
  title,
  artist,
  index,
  curIndex,
  setCurIndex,
}: IListMenuItem) => {
  const isSelected = curIndex === index;
  return (
    <div
      className={`flex flex-col w-full p-2 hover:bg-gray-300 cursor-pointer`}
      onClick={() => {
        setCurIndex(index);
      }}
    >
      <div className={`flex items-center gap-4`}>
        <p className={`text-xs text-gray-700`}>{index + 1}</p>
        <div className={``}>
          <p
            className={`text-sm ${
              isSelected ? "text-primary" : "text-gray-700"
            } font-medium line-clamp-1 overflow-ellipsis`}
          >
            {title}
          </p>
          <p
            className={`text-xs text-gray-500 font-normal line-clamp-1 overflow-ellipsis`}
          >
            {artist}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListMenuItem;
