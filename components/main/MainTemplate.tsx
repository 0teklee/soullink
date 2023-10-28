import React from "react";
import MainTrending from "@/components/main/MainTrending";
import MainFriendsPlaylists from "@/components/main/MainFriendsPlaylists";
import MainHotTracks from "@/components/main/MainHotTracks";
import MainRecentPlayed from "@/components/main/MainRecentPlayed";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import MainTodayList from "@/components/main/MainTodayList";

const MainTemplate = ({
  propsData: { trendingPlayLists, friendsPlayLists, popularTracks, myHistory },
}: {
  propsData: {
    trendingPlayLists: PlaylistType[];
    friendsPlayLists: PlaylistType[];
    popularTracks: PlaylistType;
    myHistory: PlaylistType[];
  };
}) => {
  return (
    <section className={`flex flex-col items-start py-6 gap-12 `}>
      <MainTodayList playlists={trendingPlayLists} />
      <MainTrending playLists={trendingPlayLists} />
      <MainFriendsPlaylists playLists={friendsPlayLists} />
      <MainHotTracks trendingsongList={popularTracks} />
      <MainRecentPlayed />
    </section>
  );
};

export default MainTemplate;
