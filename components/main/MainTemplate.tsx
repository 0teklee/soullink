import React, { Suspense } from "react";
import MainFriendsPlaylists from "@/components/main/MainFriendsPlaylists";
import MainRecentPlayed from "@/components/main/MainRecentPlayed";
import MainTodayList from "@/components/main/MainTodayList";
import MainTimeline from "@/components/main/MainTimeline";
import TopListContainter from "@/components/common/playlist/screen-width-slider/TopListContainter";
import FriendsListFallback from "@/components/main/module/FriendsListFallback";
import { playlistListDefault } from "@/libs/utils/client/contants/fallbackValues";

const MainTemplate = ({
  userId,
  userNickname,
}: {
  userId?: string;
  userNickname?: string;
}) => {
  return (
    <div className={`flex flex-col items-start py-6 gap-12 `}>
      <Suspense
        fallback={<TopListContainter playlists={playlistListDefault} />}
      >
        {/* @ts-expect-error Async Server Component */}
        <MainTodayList />
      </Suspense>
      <MainTimeline userId={userId} />
      <Suspense fallback={<FriendsListFallback />}>
        {/* @ts-expect-error Async Server Component */}
        <MainFriendsPlaylists userId={userId} />
      </Suspense>
      <MainRecentPlayed userId={userId} userNickname={userNickname} />
    </div>
  );
};

export default MainTemplate;
