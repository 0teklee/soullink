"use client";

import React from "react";
import { TableCell, TableRow } from "@/components/common/atom/table";
import Image from "next/image";
import Link from "next/link";
import { formatPathName } from "@/libs/utils/client/formatter";
import { PlaylistType } from "@/libs/types/song&playlistType";
import useSelectedPlaylistPlay from "@/libs/utils/hooks/useSelectedPlaylistPlay";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import { cn } from "@/libs/utils/client/ui";

const FriendsListItem = ({
  playlist,
  userId,
}: {
  playlist: PlaylistType;
  userId?: string;
}) => {
  const { playing, handleChangePlaylistState } = useSelectedPlaylistPlay(
    playlist,
    userId,
  );

  return (
    <TableRow>
      <TableCell>
        <div
          className={`relative w-12 h-12 hover:bg-black hover:bg-opacity-30 cursor-pointer`}
        >
          <Image
            className={`object-cover rounded`}
            src={playlist.coverImage || `/image/common/default_cover_image.svg`}
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
      </TableCell>
      <TableCell>
        <div
          className={cn(
            `flex flex-col gap-0.5 `,
            `lg:max-w-[150px] overflow-hidden`,
            `text-xs `,
          )}
        >
          <Link
            className={`hover:underline sideways-scroll`}
            href={`/playlist/${formatPathName(playlist.title)}`}
          >
            {playlist.title}
          </Link>
          <div className={`flex playlists-center gap-x-1 text-gray-500`}>
            <p>{playlist.likedCount} likes</p>
            <p>{playlist.playedCount} played</p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className={`flex flex-col gap-0.5 text-xs`}>
          <p className={`text-gray-500`}>{playlist.author.nickname}</p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default FriendsListItem;
