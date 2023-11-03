"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/common/userType";
import { useQuery } from "react-query";
import { getRecommendedPlaylists } from "@/libs/utils/client/fetchers";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";

const DiscoverSuggestion = () => {
  const { data: session } = useSession() as { data: UserSessionType };
  const { userNickname: nickname, userId } = session || {};

  const { data: recommendedPlaylists } = useQuery({
    queryKey: ["recommendedPlaylists", userId],
    queryFn: () => getRecommendedPlaylists(userId || ""),
  });

  return (
    <div className={`flex flex-col gap-4 h-full min-h-[200px]`}>
      <div className={`flex items-center justify-start gap-2`}>
        <Title size={`h1`} text={`Playlists for ${nickname || "you"}`} />
      </div>
      {recommendedPlaylists && recommendedPlaylists.length > 0 && (
        <PlayListSlider playLists={recommendedPlaylists} />
      )}
    </div>
  );
};

export default DiscoverSuggestion;
