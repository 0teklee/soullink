"use client";
import React, { Suspense, useEffect, useState } from "react";

import Title from "@/components/common/module/Title";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";
import { useQuery } from "react-query";
import { getRecentPlaylists } from "@/libs/utils/client/fetchers";

const MainRecentPlayed = () => {
  const [recentPlayedIds, setRecentPlayedIds] = useState(
    localStorage.getItem("recentPlaylist") || "",
  );

  const { data: playLists } = useQuery<PlaylistType[]>(
    ["recentPlayed", recentPlayedIds],
    () => getRecentPlaylists(recentPlayedIds),
    { enabled: !!recentPlayedIds },
  );

  useEffect(() => {
    if (recentPlayedIds) return;
    const recentPlayed = localStorage.getItem("recentPlaylist");
    if (recentPlayed) setRecentPlayedIds(recentPlayed);
  }, [localStorage]);

  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title text={`Recent Played`} size={`h1`} />
      <Suspense fallback={<div>Loading...</div>}>
        {playLists && playLists.length > 0 ? (
          <PlayListSlider playLists={playLists} />
        ) : (
          <Title text={`No recent listening history`} size={`h2`} />
        )}
      </Suspense>
    </section>
  );
};

export default MainRecentPlayed;
