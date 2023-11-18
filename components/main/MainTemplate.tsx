import React from "react";
import MainTrending from "@/components/main/MainTrending";
import MainFriendsPlaylists from "@/components/main/MainFriendsPlaylists";
import MainHotTracks from "@/components/main/MainHotTracks";
import MainRecentPlayed from "@/components/main/MainRecentPlayed";
import {
  PlaylistType,
  TrendingSongPlaylistType,
} from "@/libs/types/song&playlistType";
import MainTodayList from "@/components/main/MainTodayList";

const MainTemplate = ({
  propsData,
  hotTracks,
  userId,
}: {
  propsData: PlaylistType[][];
  hotTracks: TrendingSongPlaylistType;
  userId?: string;
}) => {
  const [todayList, trendingPlayLists, friendsPlayLists] = propsData;

  return (
    <section className={`flex flex-col items-start py-6 gap-12 `}>
      <MainTodayList playlists={todayList} />
      <MainTrending playLists={trendingPlayLists} />
      <MainFriendsPlaylists playLists={friendsPlayLists} userId={userId} />
      <MainHotTracks trendingSongList={hotTracks} />
      <MainRecentPlayed />
    </section>
  );
};

export default MainTemplate;
