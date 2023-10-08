import React from "react";
import Title from "@/components/common/module/Title";
import Table from "@/components/common/songTable/Table";
import {
  PlaylistType,
  SongType,
  TrendingSongPlaylistType,
} from "@/libs/types/common/Song&PlaylistType";

const MainHotTracks = ({
  trendingsongList,
}: {
  trendingsongList: TrendingSongPlaylistType;
}) => {
  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title size={`h1`} text={`Popular Tracks`} />
      <Table
        songList={trendingsongList.songs as SongType[]}
        playlist={trendingsongList as PlaylistType}
        isCreate={false}
      />
    </section>
  );
};

export default MainHotTracks;
