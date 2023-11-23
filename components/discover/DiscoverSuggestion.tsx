"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import { useQuery } from "react-query";
import { getRecommendedPlaylists } from "@/libs/utils/client/fetchers";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";
import { PlaylistType } from "@/libs/types/song&playlistType";

const DiscoverSuggestion = ({
  recommendedPlaylists,
  userNickname,
  userId,
}: {
  recommendedPlaylists?: PlaylistType[];
  userNickname?: string;
  userId?: string;
}) => {
  const { data } = useQuery({
    queryKey: ["recommendedPlaylists", userId],
    queryFn: () => getRecommendedPlaylists(userId || ""),
    initialData: recommendedPlaylists,
  });

  return (
    <div className={`flex flex-col gap-4 h-full min-h-[200px]`}>
      <div className={`flex items-center justify-start gap-2`}>
        <Title size={`h1`} text={`Playlists for ${userNickname || "you"}`} />
      </div>
      {data && data.length > 0 && <PlayListSlider playlists={data} />}
    </div>
  );
};

export default DiscoverSuggestion;
