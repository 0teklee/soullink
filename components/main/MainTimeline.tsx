"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTimelinePlaylists } from "@/libs/utils/client/fetchers";
import Title from "@/components/common/module/Title";
import { PlaylistType } from "@/libs/types/song&playlistType";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";

const MainTimeline = ({
  playlists,
  userId,
}: {
  playlists: PlaylistType[];
  userId?: string;
}) => {
  const { data } = useQuery({
    queryKey: ["timeline_playlists", userId],
    queryFn: () => getTimelinePlaylists(userId),
    initialData: playlists,
  });

  return (
    <section className={`flex flex-col items-start gap-3 w-full `}>
      <Title size={`h1`} text={`Timeline`} />
      {data && data.length > 0 && (
        <PlaylistListContainer playlists={data} isLarge={true} />
      )}
      {data && data.length === 0 && (
        <Title size={`h2`} text={`No playlists yet`} />
      )}
    </section>
  );
};

export default MainTimeline;
