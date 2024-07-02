"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { PlaylistType, SongType } from "@/libs/types/song&playlistType";

import TableItem from "@/components/common/song/table/TableItem";

const SongTable = ({
  songList,
  isCreate,
  isCreateFavorite,
  setSongList,
  playlist,
  userId,
}: {
  songList: SongType[];
  isCreateFavorite?: boolean;
  isCreate?: boolean;
  setSongList?: Dispatch<SetStateAction<SongType[]>>;
  playlist?: PlaylistType;
  userId?: string;
}) => {
  const [draggedItem, setDraggedItem] = useState<SongType | null>(null);

  const isNotCreate = !isCreate;

  const handleDragStart = (item: SongType) => {
    if (isCreate) {
      setDraggedItem(item);
    }
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedItem && songList && setSongList) {
      const newList = [...songList];
      const draggedIndex = newList.findIndex((i) => i.id === draggedItem.id);
      newList.splice(draggedIndex, 1);
      newList.splice(targetIndex, 0, draggedItem);
      setSongList(newList);
      setDraggedItem(null);
    }
  };

  return (
    <>
      <div className={`self-stretch px-0 lg:px-5`}>
        <table className={`w-full px-12 table-auto`}>
          <thead
            className={`hidden lg:table-header-group border-b border-gray-300`}
          >
            <tr className={`text-gray-500 dark:text-gray-50 text-lg`}>
              <th className={`text-start opacity-0 ${isNotCreate && ""}`}>
                no.
              </th>
              <th className={`text-start font-light ${isNotCreate && ""}`}>
                TITLE
              </th>
              <th className={`text-start font-light ${isNotCreate && ""}`}>
                ARTIST
              </th>
              {isNotCreate && (
                <>
                  <th className={`text-start opacity-0 `}>Like & Add</th>
                  <th className={`text-start font-light `}>PLAYED</th>
                  {isNotCreate && playlist && (
                    <th className={`text-start opacity-0 `}>PLAY</th>
                  )}
                </>
              )}
              {isCreate && (
                <th className={`w-0 opacity-0 hidden lg:block`}>Delete</th>
              )}
            </tr>
          </thead>
          <tbody onDragOver={(e) => e.preventDefault()}>
            {!!songList &&
              songList.length > 0 &&
              songList?.map((song, index) => {
                return (
                  <TableItem
                    key={`${"id" in song ? song.id : "create_song"}-${index}}`}
                    song={song}
                    index={index}
                    isCreate={isCreate}
                    isCreateFavorite={isCreateFavorite}
                    userId={userId}
                    playlist={playlist}
                    setSongList={setSongList}
                    handleDragStart={handleDragStart}
                    handleDragDrop={handleDrop}
                  />
                );
              })}
          </tbody>
        </table>
        {(!songList || songList.length === 0) && (
          <div
            className={`flex flex-col items-center justify-center w-full h-full mt-2`}
          >
            <p className={`text-gray-400 text-lg font-normal`}>No songs yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SongTable;
