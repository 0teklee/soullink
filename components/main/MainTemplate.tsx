import React, { Suspense } from "react";
import MainRecentPlayed from "@/components/main/MainRecentPlayed";
import MainTodayList from "@/components/main/MainTodayList";
import MainFeed from "@/components/main/MainFeed";
import CardCarouselContainer from "@/components/common/playlist/card-carousel/CardCarouselContainer";
import { playlistListDefault } from "@/libs/utils/client/contants/fallbackValues";
import FriendsListFallback from "@/components/main/module/FriendsListFallback";
import MainFriendsPlaylists from "@/components/main/MainFriendsPlaylists";
import { cn } from "@/libs/utils/client/ui";

const MainTemplate = ({
  userId,
  userNickname,
}: {
  userId?: string;
  userNickname?: string;
}) => {
  return (
    <div
      className={cn(
        `flex flex-col lg:flex-row justify-stretch lg:items-start gap-16 lg:gap-3`,
        `w-full py-6`,
      )}
    >
      <div
        className={cn(
          `flex-1 flex flex-col items-stretch gap-12 lg:items-start lg:justify-center `,
          `w-full lg:max-w-[70%] overflow-hidden`,
        )}
      >
        <Suspense
          fallback={<CardCarouselContainer playlists={playlistListDefault} />}
        >
          {/* @ts-expect-error Async Server Component */}
          <MainTodayList />
        </Suspense>
        <MainRecentPlayed userId={userId} userNickname={userNickname} />
        <MainFeed userId={userId} />
      </div>
      <div className={`flex-shrink`}>
        <Suspense fallback={<FriendsListFallback />}>
          {/* @ts-expect-error Async Server Component */}
          <MainFriendsPlaylists userId={userId} />
        </Suspense>
      </div>
    </div>
  );
};

export default MainTemplate;
