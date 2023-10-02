import React from "react";
import Title from "@/components/common/module/Title";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";

const MainTrending = ({ playLists }: { playLists: PlaylistType[] }) => {
  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title text={`Trending PlayLists`} size={`h1`} />
      <PlayListSlider playLists={playLists} />
    </section>
  );
};

export default MainTrending;
