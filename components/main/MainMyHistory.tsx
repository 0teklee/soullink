import React from "react";

import Title from "@/components/common/module/Title";
import { PlaylistType } from "@/types/common/Song&PlaylistType";
import PlayListSlider from "@/components/common/playlist/PlayListSlider";

const MainMyHistory = ({ playLists }: { playLists: PlaylistType[] }) => {
  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title text={`My History`} size={`h1`} />
      <PlayListSlider playLists={playLists} />
    </section>
  );
};

export default MainMyHistory;
