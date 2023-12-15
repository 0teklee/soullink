import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PlaylistType, SongType } from "@/libs/types/song&playlistType";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import {
  HeartIcon,
  MinusCircleIcon,
  PauseIcon,
  PlayIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { useSetPlaylistFromSongTable } from "@/libs/utils/hooks/useSetPlaylistFromSongTable";

const TableItem = ({
  song,
  index,
  handleLikeSong,
  isCreate,
  isCreateFavorite,
  setSongList,
  playlist,
  userId,
  handleDragStart,
  handleDragDrop,
}: {
  song: SongType;
  index: number;
  handleLikeSong?: (
    songId: string,
    userId?: string,
    optimisticUpdate?: Dispatch<SetStateAction<boolean>>,
  ) => void;
  isCreate?: boolean;
  isCreateFavorite?: boolean;
  setSongList?: React.Dispatch<React.SetStateAction<SongType[]>>;
  playlist?: PlaylistType;
  userId?: string;
  handleDragStart: (item: SongType) => void;
  handleDragDrop: (targetIndex: number) => void;
}) => {
  const playSongItemHook = useSetPlaylistFromSongTable(
    "id" in song ? song.id : "",
    playlist,
  );

  const { playSongFromTable, isSongPlaying } = playSongItemHook || {};

  const isNotCreate = !isCreate;
  const [isUserLikedSong, setIsUserLikedSong] = useState(
    !!song?.likedUsers &&
      song?.likedUsers?.filter((likedItem) => likedItem.userId === userId)
        .length > 0,
  );

  const handlePlaySong = () => {
    if (!playSongFromTable || !playlist) {
      return;
    }
    playSongFromTable(playlist);
  };

  useEffect(() => {
    setIsUserLikedSong(
      !!song?.likedUsers &&
        song?.likedUsers?.filter((likedItem) => likedItem.userId === userId)
          .length > 0,
    );
  }, [playlist]);

  return (
    <tr
      draggable={isCreate}
      onDragStart={
        isCreate
          ? () => {
              handleDragStart(song);
            }
          : undefined
      }
      onDrop={
        isCreate
          ? () => {
              handleDragDrop(index);
            }
          : undefined
      }
      key={`song_item_${song.title}_${index}`}
      className={`text-gray-500 text-base xs:text-sm border-b-[1px] border-gray-200 hover:text-white hover:bg-black hover:bg-opacity-30 cursor-pointer`}
    >
      <td className={`py-2 pl-2 xs:hidden`}>{index + 1}</td>
      <td className={`py-2`}>
        <div className={`flex flex-col gap-0.5`}>
          <p>{song.title}</p>
          {"likedCount" in song && isNotCreate && (
            <p className={`text-xs`}>{song.likedCount} likes</p>
          )}
        </div>
      </td>
      <td className={`py-2`}>{song.artist}</td>
      {"playedCount" in song && isNotCreate && (
        <>
          <td className={`py-2`}>
            <div className={`flex items-center gap-3`}>
              <button className={`relative w-6 h-6`}>
                {isUserLikedSong ? (
                  <HeartIconSolid
                    className={`w-full h-full text-primary hover:text-gray-500`}
                    onClick={() => {
                      if (!handleLikeSong) {
                        return;
                      }
                      handleLikeSong(song.id, userId, setIsUserLikedSong);
                    }}
                  />
                ) : (
                  <HeartIcon
                    className={`w-full h-full text-gray-500 hover:text-primary`}
                    onClick={() => {
                      if (!handleLikeSong) {
                        return;
                      }
                      handleLikeSong(song.id, userId, setIsUserLikedSong);
                    }}
                  />
                )}
              </button>
            </div>
          </td>
          <td className={`py-2 xs:hidden`}>{song.playedCount}</td>
          <td className={`py-2 xs:hidden`}>
            {isNotCreate && playlist && (
              <button
                className={`relative w-6 h-6`}
                onClick={() => {
                  handlePlaySong();
                }}
              >
                {isSongPlaying ? (
                  <PauseIcon
                    className={`w-full h-full text-gray-500 hover:text-primary`}
                  />
                ) : (
                  <PlayIcon
                    className={`w-full h-full text-gray-500 hover:text-primary`}
                  />
                )}
              </button>
            )}
          </td>
        </>
      )}
      {isCreate && !isCreateFavorite && setSongList && (
        <td className={`flex items-center py-2 xs:hidden`}>
          <button
            className={`relative top-0.5 text-gray-500 text-sm font-medium`}
            onClick={() => {
              setSongList((prev) => prev.filter((_, idx) => idx !== index));
            }}
          >
            <MinusCircleIcon
              className={` hover:text-gray-100`}
              width={20}
              height={20}
            />
          </button>
        </td>
      )}
      {isCreate && isCreateFavorite && setSongList && (
        <td className={`flex items-center py-2 xs:hidden`}>
          <button
            className={`relative top-0.5 text-gray-500 text-sm font-medium`}
            onClick={() => {
              setSongList((prev) => [...prev, song]);
            }}
          >
            <PlusCircleIcon
              className={` hover:text-gray-100`}
              width={20}
              height={20}
            />
          </button>
        </td>
      )}
    </tr>
  );
};

export default TableItem;
