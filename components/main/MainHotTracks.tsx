import React from "react";
import Title from "@/components/common/module/Title";
import Table from "@/components/common/module/Table";
import { fakeFirstPlaylistData } from "@/utils/client/commonValues";
import { SongType } from "@/types/common/PlaylistType";

const MainHotTracks = ({ songList }: { songList: SongType[] }) => {
  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title size={`h1`} text={`Popular Tracks`} />
      <Table songList={songList} />
    </section>
  );
};

export default MainHotTracks;