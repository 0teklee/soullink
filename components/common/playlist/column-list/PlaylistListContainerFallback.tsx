import React from "react";
import { playlistListDefault } from "@/libs/utils/client/contants/fallbackValues";
import FallbackSection from "@/components/common/fallback/FallbackSection";
import PlaylistListItem from "@/components/common/playlist/column-list/PlaylistListItem";

const PlaylistListContainerFallback = ({
  isIndex,
  isLarge,
  title = "Loading",
}: {
  isIndex: boolean;
  isLarge: boolean;
  title: string;
}) => {
  return (
    <FallbackSection title={title}>
      <div className={`flex flex-col gap-0 w-full dark:text-gray-50`}>
        {playlistListDefault.map((playlist, index) => (
          <PlaylistListItem
            key={`fallback_playlist_list_${playlist.id}_${index}`}
            index={isIndex ? index : undefined}
            playlist={playlist}
          />
        ))}
      </div>
    </FallbackSection>
  );
};

export default PlaylistListContainerFallback;
