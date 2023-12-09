"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { PlaylistType, SongType } from "@/libs/types/song&playlistType";

import TableItem from "@/components/common/song/table/TableItem";
import useSongLike from "@/libs/utils/hooks/useMutateSongLike";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE } from "@/libs/types/modalType";

const SongTable = ({
  songList,
  isCreate,
  isCreateFavorite,
  setSongList,
  playlist,
  setIsModalOpen,
  userId,
}: {
  songList: SongType[];
  setIsModalOpen?: Dispatch<SetStateAction<boolean>>;
  isCreateFavorite?: boolean;
  isCreate?: boolean;
  setSongList?: Dispatch<SetStateAction<SongType[]>>;
  playlist?: PlaylistType;
  userId?: string;
}) => {
  const [draggedItem, setDraggedItem] = useState<SongType | null>(null);
  const { setModal } = useSetModal();

  const isNotCreate = !isCreate;
  const isLogin = !!userId;

  const { songLikeMutate } = useSongLike();

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

  const handleLikeSong = async (songId: string, userId?: string) => {
    if (!userId || !isLogin) {
      setModal(MODAL_TYPE.LOGIN);
      return;
    }

    songLikeMutate(songId, userId);

    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className={`self-stretch px-5 xs:px-0`}>
        <table className={`w-full px-12 table-auto`}>
          <thead className={`border-b border-gray-300`}>
            <tr className={`text-gray-500 text-lg`}>
              <th
                className={`text-start opacity-0 ${isNotCreate && "xs:hidden"}`}
              >
                no.
              </th>
              <th
                className={`text-start font-light ${
                  isNotCreate && "xs:hidden"
                }`}
              >
                TITLE
              </th>
              <th
                className={`text-start font-light ${
                  isNotCreate && "xs:hidden"
                }`}
              >
                ARTIST
              </th>
              {isNotCreate && (
                <>
                  <th className={`text-start opacity-0 xs:hidden`}>
                    Like & Add
                  </th>
                  <th className={`text-start font-light xs:hidden`}>PLAYED</th>
                  {isNotCreate && playlist && (
                    <th className={`text-start opacity-0 xs:hidden`}>PLAY</th>
                  )}
                </>
              )}
              {isCreate && (
                <th className={`w-0 opacity-0 xs:hidden`}>Delete</th>
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
                    handleLikeSong={handleLikeSong}
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
