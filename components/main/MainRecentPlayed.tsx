"use client";
import React, { Suspense, useEffect, useState } from "react";

import Title from "@/components/common/module/Title";
import { PlaylistType } from "@/libs/types/song&playlistType";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";
import { useQuery } from "@tanstack/react-query";
import {
  getLocalRecentPlaylists,
  getRecentPlaylists,
} from "@/libs/utils/client/fetchers";

const MainRecentPlayed = ({
  userId,
  userNickname,
}: {
  userId?: string;
  userNickname?: string;
}) => {
  const [recentPlayedIds, setRecentPlayedIds] = useState("");
  const [isLocal, setIsLocal] = useState(!userId);

  const { data: recentPlayedPlayLists, isSuccess: isRecentSuccess } = useQuery({
    queryKey: ["recentPlayed", userId],
    queryFn: !isLocal
      ? () => getRecentPlaylists(userId)
      : () => getLocalRecentPlaylists(recentPlayedIds),
  });

  const isDataSuccess = isRecentSuccess && recentPlayedPlayLists;

  useEffect(() => {
    if (!userId) {
      setIsLocal(true);
    }
  }, [userId]);

  useEffect(() => {
    if (recentPlayedIds || !localStorage) {
      return;
    }

    const recentPlayed = localStorage.getItem("recentPlaylist");
    if (recentPlayed) {
      setRecentPlayedIds(recentPlayed);
    }
  }, []);

  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title
        text={`Recently Played ${userNickname ? `by ${userNickname}` : ""}`}
        size={`h1`}
      />
      <Suspense fallback={<div>Loading...</div>}>
        {isDataSuccess && recentPlayedPlayLists?.length > 0 && (
          <PlayListSlider playlists={recentPlayedPlayLists} />
        )}
        {isDataSuccess && recentPlayedPlayLists?.length === 0 && (
          <Title text={`No recent listening history`} size={`h2`} />
        )}
      </Suspense>
    </section>
  );
};

export default MainRecentPlayed;
