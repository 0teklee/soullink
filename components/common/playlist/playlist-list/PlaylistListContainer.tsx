import React from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import PlaylistListItem from "@/components/common/playlist/playlist-list/PlaylistListItem";

const PlaylistListContainer = ({
  playlists,
  isLarge,
  isIndex,
  refetch,
  refetchQueryKeys,
}: {
  playlists?: PlaylistType[];
  isLarge?: boolean;
  isIndex?: boolean;
  refetch?: () => void;
  refetchQueryKeys?: string[];
}) => {
  return (
    <div className={`flex flex-col gap-0 w-full`}>
      {playlists?.map((playlist, index) => (
        <PlaylistListItem
          isLarge={isLarge}
          key={`playlist_list_${playlist.id}_${index}`}
          playlist={playlist}
          index={isIndex ? index + 1 : undefined}
          refetch={refetch}
          refetchQueryKeys={refetchQueryKeys}
        />
      ))}
    </div>
  );
};

export default PlaylistListContainer;
