import React from "react";
import MainFriendsPlaylists from "@/components/main/MainFriendsPlaylists";
import MainRecentPlayed from "@/components/main/MainRecentPlayed";
import { PlaylistType } from "@/libs/types/song&playlistType";
import MainTodayList from "@/components/main/MainTodayList";
import MainTimeline from "@/components/main/MainTimeline";

const MainTemplate = ({
  propsData,
  userId,
  userNickname,
}: {
  propsData: PlaylistType[][];
  userId?: string;
  userNickname?: string;
}) => {
  const [todayList, timelinePlaylist, friendsPlayLists, recentPlaylist] =
    propsData;

  return (
    <section className={`flex flex-col items-start py-6 gap-12 `}>
      <MainTodayList playlists={todayList} />
      <MainTimeline playlists={timelinePlaylist} userId={userId} />
      <MainFriendsPlaylists playLists={friendsPlayLists} userId={userId} />
      <MainRecentPlayed
        propsData={recentPlaylist}
        userId={userId}
        userNickname={userNickname}
      />
    </section>
  );
};

export default MainTemplate;
