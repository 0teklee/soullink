import React from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import PlaylistListItem from "@/components/common/playlist/column-list/PlaylistListItem";

const PlaylistListContainer = ({
  playlists,
  isLarge,
  isIndex,
}: {
  playlists?: PlaylistType[];
  isLarge?: boolean;
  isIndex?: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-0 w-full dark:text-gray-50`}>
      {playlists?.map((playlist, index) => (
        <PlaylistListItem
          isLarge={isLarge}
          key={`playlist_list_${playlist.id}_${index}`}
          playlist={playlist}
          index={isIndex ? index + 1 : undefined}
        />
      ))}
      {!playlists?.length && (
        <p className={`text-gray-300 text-lg font-normal`}>No playlists yet.</p>
      )}
    </div>
  );
};

export default PlaylistListContainer;
