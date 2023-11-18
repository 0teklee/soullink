import React from "react";
import TrendingCategories from "@/components/trending/TrendingCategories";
import TrendingMood from "@/components/trending/TrendingMood";
import TrendingMainTrend from "@/components/trending/TrendingMainTrend";
import { PlaylistType } from "@/libs/types/song&playlistType";

const TrendingTemplate = ({
  mainInitData,
  categoryInitData,
  moodInitData,
}: {
  mainInitData: PlaylistType[];
  categoryInitData: {
    recentMostPlayedCategoryPlaylist: PlaylistType[];
    categories: string[];
  };
  moodInitData: PlaylistType[];
}) => {
  return (
    <div className={`flex flex-col items-start gap-12 py-12 xs:py-5`}>
      <TrendingMainTrend initData={mainInitData} />
      <TrendingCategories initData={categoryInitData} />
      <TrendingMood initData={moodInitData} />
    </div>
  );
};

export default TrendingTemplate;
