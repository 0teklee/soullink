"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import { useQuery } from "@tanstack/react-query";
import { getRecommendedPlaylists } from "@/libs/utils/client/fetchers";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";

const DiscoverSuggestion = ({
  userNickname,
  userId,
}: {
  userNickname?: string;
  userId?: string;
}) => {
  const { data } = useQuery({
    queryKey: ["recommendedPlaylists", userId],
    queryFn: () => getRecommendedPlaylists(userId || ""),
  });

  return (
    <div className={`flex flex-col gap-4 h-full min-h-[200px]`}>
      <div className={`flex items-center justify-start gap-2`}>
        <Title size={`h1`} text={`Playlists for ${userNickname || "you"}`} />
      </div>
      {data && data.length > 0 && (
        <ReactQueryErrorBoundary>
          <PlayListSlider playlists={data} />
        </ReactQueryErrorBoundary>
      )}
    </div>
  );
};

export default DiscoverSuggestion;
