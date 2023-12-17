import React from "react";
import MainFriendsPlaylists from "@/components/main/MainFriendsPlaylists";
import MainRecentPlayed from "@/components/main/MainRecentPlayed";
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
    <div className={`flex flex-col items-start py-6 gap-12 `}>
      <MainTodayList />
      <MainTimeline userId={userId} />
      <MainFriendsPlaylists userId={userId} />
      <MainRecentPlayed userId={userId} userNickname={userNickname} />
    </div>
  );
};

export default MainTemplate;
