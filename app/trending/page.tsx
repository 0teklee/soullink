import React from "react";
import TrendingTemplate from "@/components/trending/TrendingTemplate";
import {
  getMoodPlaylists,
  getTrendingCategoriesPlaylists,
  getTrendingMainPlaylists,
} from "@/libs/utils/client/fetchers";
import PlaylistUpdateProvider from "@/components/common/playlist/PlaylistUpdateProvider";

const Page = async () => {
  const [mainInitData, categoryInitData, moodInitData] = await Promise.all([
    getTrendingMainPlaylists(`0`),
    getTrendingCategoriesPlaylists(`0`),
    getMoodPlaylists(null, `0`),
  ]);

  return (
    <PlaylistUpdateProvider
      propsData={[
        ...mainInitData,
        ...(categoryInitData?.recentMostPlayedCategoryPlaylist || []),
        ...moodInitData,
      ]}
    >
      <TrendingTemplate
        mainInitData={mainInitData}
        categoryInitData={categoryInitData}
        moodInitData={moodInitData}
      />
    </PlaylistUpdateProvider>
  );
};

export default Page;
