"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import SongTable from "@/components/common/song/table/SongTable";
import {
  PlaylistType,
  SongType,
  TrendingSongPlaylistType,
} from "@/libs/types/song&playlistType";
import { getTrendingSongs } from "@/libs/utils/client/fetchers";
import { useQuery } from "react-query";

const MainHotTracks = ({
  trendingSongList,
}: {
  trendingSongList: TrendingSongPlaylistType;
}) => {
  const { data } = useQuery({
    queryKey: ["mainPageTrendingSongs"],
    queryFn: () => getTrendingSongs(),
    initialData: trendingSongList,
  });

  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title size={`h1`} text={`Popular Tracks`} />
      {data && data.songs && data.songs.length > 0 && (
        <SongTable
          songList={data.songs as SongType[]}
          playlist={data as PlaylistType}
          isCreate={false}
        />
      )}
    </section>
  );
};

export default MainHotTracks;
