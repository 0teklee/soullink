import React from "react";
import Title from "@/components/common/module/Title";
import PlayListSlider from "@/components/main/module/PlayListSlider";
import { PlaylistType } from "@/types/common/PlaylistType";

const MainTrending = ({ playLists }: { playLists: PlaylistType[] }) => {
  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title text={`Trending PlayList`} size={`h1`} />
      <PlayListSlider playLists={playLists} />
    </section>
  );
};

export default MainTrending;
