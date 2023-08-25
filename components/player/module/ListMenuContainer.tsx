import React, { Dispatch } from "react";
import { PlayerListItem } from "@/types/common/playerTypes";
import ListMenuItem from "@/components/player/module/ListMenuItem";

const ListMenuContainer = ({
  curIndex,
  setCurIndex,
  songList,
}: {
  curIndex: number;
  setCurIndex: Dispatch<React.SetStateAction<number>>;
  songList: PlayerListItem[];
}) => {
  return (
    <div className={`absolute bottom-12 -left-3`}>
      <div
        className={`flex flex-col items-start w-[200px] p-3 bg-gray-50 border border-gray-300 rounded `}
      >
        <div className={`w-full mb-2`}>
          <h3
            className={`mb-1 text-lg text-gray-900 font-semibold`}
          >{`list title`}</h3>
          <p className={`text-sm text-gray-500 font-normal whitespace-nowrap`}>
            by {`@userName`}
          </p>
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
