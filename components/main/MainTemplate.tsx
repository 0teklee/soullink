import React from "react";
import MainFriendsPlaylists from "@/components/main/MainFriendsPlaylists";
import MainRecentPlayed from "@/components/main/MainRecentPlayed";
import { PlaylistType } from "@/libs/types/song&playlistType";
import MainTodayList from "@/components/main/MainTodayList";
import MainTimeline from "@/components/main/MainTimeline";

const MainTemplate = ({
  userId,
  userNickname,
}: {
  userId?: string;
  userNickname?: string;
}) => {
  return (
    <section className={`flex flex-col items-start py-6 gap-12 `}>
      <MainTodayList />
      <MainTimeline userId={userId} />
      <MainFriendsPlaylists userId={userId} />
      <MainRecentPlayed userId={userId} userNickname={userNickname} />
    </section>
  );
};

export default MainTemplate;
