"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { getMainPageTrendingPlaylists } from "@/libs/utils/client/fetchers";
import { useQuery } from "react-query";

const MainTrending = ({ playLists }: { playLists: PlaylistType[] }) => {
  const { data } = useQuery<PlaylistType[]>({
    queryKey: ["mainPageTrending"],
    queryFn: () => getMainPageTrendingPlaylists(),
    initialData: playLists,
  });

  return (
    <section className={`relative flex flex-col items-start w-full gap-4`}>
      <Title text={`Trending PlayLists`} size={`h1`} />
      {data && <PlayListSlider playLists={data} />}
    </section>
  );
};

export default MainTrending;
