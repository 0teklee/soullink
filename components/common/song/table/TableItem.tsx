import React, { useEffect, useState } from "react";
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
import useSongLike from "@/libs/utils/hooks/useMutateSongLike";
import { cn } from "@/libs/utils/client/ui";

const TableItem = ({
  song,
  index,
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

  const { songLikeMutate } = useSongLike(song.id, userId, setIsUserLikedSong);

  const handlePlaySong = () => {
    if (!playSongFromTable || !playlist) {
      return;
    }
    playSongFromTable(playlist);
  };

  const handleLikeSong = async () => {
    songLikeMutate();
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
      onClick={() => {
        if (isCreate) {
          return;
        }

        handlePlaySong();
      }}
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
      className={cn(
        `text-gray-500 dark:text-gray-50 text-base text-xs lg:text-base`,
        `border-b-[1px] border-gray-200 `,
        `hover:text-white hover:bg-black hover:bg-opacity-30 cursor-pointer`,
      )}
    >
      <td className={`py-2 pl-2 hidden lg:table-cell`}>{index + 1}</td>
      <td className={`py-2`}>
        <div className={`flex flex-col gap-0.5`}>
          <div className={`max-w-lg overflow-x-hidden md:max-w-[200px]`}>
            <p className={`sideways-scroll`}>{song.title}</p>
          </div>
          {"likedCount" in song && isNotCreate && (
            <p className={`text-xs`}>{song.likedCount} likes</p>
          )}
        </div>
      </td>
      <td className={`py-2`}>
        <div
          className={`max-w-md overflow-x-hidden md:max-w-[50px] md:text-xs`}
        >
          <p className={`sideways-scroll`}>{song.artist}</p>
        </div>
      </td>
      {"playedCount" in song && isNotCreate && (
        <>
          <td className={`py-2`}>
            <div className={`flex items-center gap-3`}>
              <button
                className={`relative w-6 h-6`}
                aria-label={`like-playlist-button`}
              >
                {isUserLikedSong ? (
                  <HeartIconSolid
                    className={`w-full h-full text-primary hover:text-gray-500`}
                    onClick={() => {
                      handleLikeSong();
                    }}
                  />
                ) : (
                  <HeartIcon
                    className={`w-full h-full text-gray-500 hover:text-primary`}
                    onClick={() => {
                      handleLikeSong();
                    }}
                  />
                )}
              </button>
            </div>
          </td>
          <td className={`py-2 hidden lg:table-cell`}>{song.playedCount}</td>
          <td className={`py-2 hidden lg:table-cell`}>
            {isNotCreate && playlist && (
              <button
                className={`relative w-6 h-6`}
                onClick={() => {
                  handlePlaySong();
                }}
                aria-label={`play-playlist-button`}
              >
                {isSongPlaying ? (
                  <PauseIcon
                    className={`w-full h-full text-gray-500 dark:text-gray-50 hover:text-primary`}
                  />
                ) : (
                  <PlayIcon
                    className={`w-full h-full text-gray-500 dark:text-gray-50 hover:text-primary`}
                  />
                )}
              </button>
            )}
          </td>
        </>
      )}
      {isCreate && !isCreateFavorite && setSongList && (
        <td className={`hidden lg:flex items-center py-2`}>
          <button
            className={`relative top-0.5 text-gray-500 dark:text-gray-50 text-sm font-medium`}
            onClick={() => {
              setSongList((prev) => prev.filter((_, idx) => idx !== index));
            }}
            aria-label={`delete song ${song.title}`}
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
        <td className={`hidden lg:flex items-center py-2`}>
          <button
            className={`relative top-0.5 text-gray-500 dark:text-gray-50 text-sm font-medium`}
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
