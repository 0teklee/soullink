import React from "react";
import TrendingCategories from "@/components/trending/TrendingCategories";
import TrendingMood from "@/components/trending/TrendingMood";
import TrendingMainTrend from "@/components/trending/TrendingMainTrend";
import {
  PlaylistType,
  TrendingSongPlaylistType,
} from "@/libs/types/song&playlistType";
import TrendingTracks from "@/components/trending/TrendingTracks";

interface TrendingCategoryData {
  recentMostPlayedCategoryPlaylist: PlaylistType[];
  categories: string[];
}

const TrendingTemplate = ({
  propsData,
  userId,
}: {
  propsData: (
    | PlaylistType[]
    | TrendingCategoryData
    | TrendingSongPlaylistType
  )[];
  userId?: string;
}) => {
  const [mainInitData, categoryInitData, moodInitData, trendingSongList] =
    propsData;
  return (
    <div className={`flex flex-col items-start gap-12 py-12 xs:py-5`}>
      <TrendingMainTrend initData={mainInitData as PlaylistType[]} />
      <TrendingTracks
        trendingSongList={trendingSongList as TrendingSongPlaylistType}
        userId={userId}
      />
      <TrendingCategories initData={categoryInitData as TrendingCategoryData} />
      <TrendingMood initData={moodInitData as PlaylistType[]} />
    </div>
  );
};

export default TrendingTemplate;
