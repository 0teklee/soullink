import React, { Suspense } from "react";
import MainFriendsPlaylists from "@/components/main/MainFriendsPlaylists";
import MainRecentPlayed from "@/components/main/MainRecentPlayed";
import MainTodayList from "@/components/main/MainTodayList";
import MainTimeline from "@/components/main/MainTimeline";

const MainTemplate = async ({
  userId,
  userNickname,
}: {
  userId?: string;
  userNickname?: string;
}) => {
  return (
    <div className={`flex flex-col items-start py-6 gap-12 `}>
      <Suspense>
        {/* @ts-expect-error Async Server Component */}
        <MainTodayList />
      </Suspense>
      <Suspense>
        {/* @ts-expect-error Async Server Component */}
        <MainTimeline userId={userId} />
      </Suspense>
      <Suspense>
        {/* @ts-expect-error Async Server Component */}
        <MainFriendsPlaylists userId={userId} />
      </Suspense>
      <MainRecentPlayed userId={userId} userNickname={userNickname} />
    </div>
  );
};

export default MainTemplate;
