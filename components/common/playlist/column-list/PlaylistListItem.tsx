"use client";

import React, { useEffect, useState } from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  formatMoodFontColor,
  formatPathName,
} from "@/libs/utils/client/formatter";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import {
  HeartIcon as OutlineHeartIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import useSelectedPlaylistPlay from "@/libs/utils/hooks/useSelectedPlaylistPlay";
import useMutatePlaylistLike from "@/libs/utils/hooks/useMutatePlaylistLike";
import { TableCell, TableRow } from "@/components/common/atom/table";
import Link from "next/link";
import { cn } from "@/libs/utils/client/ui";
import CategoriesList from "@/components/common/category/list/CategoriesList";

const PlaylistListItem = ({
  playlist,
  index,
}: {
  playlist: PlaylistType;
  index?: number;
}) => {
  const { data: session } = useSession() as { data: UserSessionType };
  const userId = session?.userId;

  const router = useRouter();
  const { playing, handleChangePlaylistState } = useSelectedPlaylistPlay(
    playlist,
    userId,
  );

  const {
    id: playlistId,
    title,
    author,
    coverImage,
    likedCount,
    playedCount,
    mood,
    likedBy,
  } = playlist;

  const [isUserLikedPlaylist, setIsUserLikedPlaylist] = useState(
    likedBy?.filter((user) => user.userId === userId).length > 0,
  );

  const cover = coverImage || `/image/common/default_cover_image.svg`;

  const { playlistLikeMutate } = useMutatePlaylistLike(
    playlistId,
    userId,
    setIsUserLikedPlaylist,
  );

  const handleLikePlaylist = () => {
    playlistLikeMutate();
  };

  useEffect(() => {
    setIsUserLikedPlaylist(
      likedBy?.filter((user) => user.userId === userId).length > 0,
    );
  }, [playlist, likedBy, userId]);

  return (
    <TableRow
      className={`flex items-center first-of-type:border-t border-gray-100`}
    >
      <TableCell className={`flex-1 flex items-center gap-3`}>
        {index && (
          <div className={`flex items-center justify-center w-5`}>
            <p className={`text-gray-700 dark:text-gray-50 xs:text-xs`}>
              {index}
            </p>
          </div>
        )}
        <div
          className={`relative w-12 h-12 hover:bg-black hover:bg-opacity-30 cursor-pointer`}
        >
          <Image
            className={`object-cover rounded`}
            src={cover}
            alt={`playlist`}
            fill={true}
          />
          <div
            onClick={() => {
              handleChangePlaylistState(playlist);
            }}
            className={`absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 z-[3] cursor-pointer opacity-0 hover:opacity-100`}
          >
            {playing ? (
              <PauseIcon className={`w-12 h-12 text-white`} />
            ) : (
              <PlayIcon className={`w-12 h-12 text-white`} />
            )}
          </div>
        </div>
        <div className={cn(`flex flex-col gap-0.5 text-xs overflow-hidden`)}>
          <Link
            className={cn(
              `max-w-[100px] sm:max-w-[200px] md:max-w-full`,
              `sideways-scroll hover:underline`,
            )}
            href={`/playlist/${formatPathName(title)}`}
          >
            {title}
          </Link>
          <div
            className={`flex playlists-center gap-x-1 text-gray-500 text-xxs sm:text-xs whitespace-nowrap`}
          >
            <div className={`flex items-center justify-start gap-2`}>
              {isUserLikedPlaylist ? (
                <button
                  onClick={handleLikePlaylist}
                  className={`flex items-center justify-center`}
                  aria-label={`unlike playlist`}
                >
                  <HeartIcon
                    className={`w-4 h-4 text-primary hover:text-gray-500`}
                  />
                </button>
              ) : (
                <button
                  onClick={handleLikePlaylist}
                  className={`flex items-center justify-center`}
                  aria-label={`like playlist`}
                >
                  <OutlineHeartIcon
                    className={`w-4 h-4 text-gray-500 hover:text-primary`}
                  />
                </button>
              )}
              <button className={`hover:underline hover:text-primary`}>
                {likedCount} likes
              </button>
            </div>
            <p>{playedCount} played</p>
          </div>
        </div>
      </TableCell>
      <TableCell className={`flex items-center gap-4 flex-shrink`}>
        <div
          className={cn(
            `hidden sm:flex flex-col items-end flex-shrink gap-3`,
            `text-xxs sm:text-xs font-medium`,
          )}
        >
          {mood && (
            <p className={` ${formatMoodFontColor(mood.name)} `}>{mood.name}</p>
          )}
          {playlist?.category && playlist.category.length > 0 && (
            <div className={`flex flex-wrap items-center gap-1`}>
              <CategoriesList categories={playlist.category} />
            </div>
          )}
        </div>
        <button
          onClick={() => {
            router.push(`/user/${formatPathName(author.nickname)}`);
          }}
          className={`text-xs sm:w-36 text-gray-500 font-medium hover:text-primary`}
        >
          by {author.nickname}
        </button>
      </TableCell>
    </TableRow>
  );
};

export default PlaylistListItem;
