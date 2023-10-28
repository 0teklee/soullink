import React from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import Title from "@/components/common/module/Title";
import TopListContainter from "@/components/common/playlist/top-playlist/TopListContainter";

const MainTodayList = ({ playlists }: { playlists: PlaylistType[] }) => {
  return (
    <section
      className={`flex flex-col items-start gap-3 w-full ${
        playlists && playlists.length > 0 && "mb-[340px]"
      } `}
    >
      <Title size={`h1`} text={`Today's Playlists`} />
      {playlists && playlists.length > 0 && (
        <TopListContainter playlists={playlists} />
      )}
      {playlists && playlists.length === 0 && (
        <Title size={`h2`} text={`No playlists yet`} />
      )}
    </section>
  );
};

export default MainTodayList;
