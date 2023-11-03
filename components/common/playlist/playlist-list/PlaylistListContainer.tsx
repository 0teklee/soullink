"use client";

import React, { Suspense } from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import PlaylistListItem from "@/components/common/playlist/playlist-list/PlaylistListItem";

const PlaylistListContainer = ({
  playlists,
}: {
  playlists?: PlaylistType[];
}) => {
  return (
    <div className={`flex flex-col gap-0 w-full`}>
      {playlists?.map((playlist, index) => (
        <PlaylistListItem
          key={`playlist_list_${playlist.id}_${index}`}
          playlist={playlist}
        />
      ))}
    </div>
  );
};

export default PlaylistListContainer;
