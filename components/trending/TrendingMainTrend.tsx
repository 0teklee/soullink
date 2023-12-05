"use client";

import React, { useState } from "react";
import {
  DAYS_FILTER,
  DAYS_FILTER_ARR,
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME,
} from "@/libs/utils/client/commonValues";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMainPlaylists } from "@/libs/utils/client/fetchers";
import Title from "@/components/common/module/Title";
import FiltersDropdown from "@/components/common/playlist/module/FiltersDropdown";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import PlaylistGallery from "@/components/common/playlist/gallery-list/PlaylistGallery";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";

const TrendingMainTrend = () => {
  const [period, setPeriod] = useState<DAYS_FILTER>(DAYS_FILTER.ALL_TIME);
  const [isSlider, setIsSlider] = useState(false);

  const { data: trendingPlaylistData } = useQuery({
    queryKey: ["trendingMain", period],
    queryFn: () => getTrendingMainPlaylists(period),
    gcTime: QUERY_CACHE_TIME,
    staleTime: QUERY_STALE_TIME,
  });

  const handleDropdownChange = (val: DAYS_FILTER) => {
    setPeriod(val);
  };

  return (
    <section className={`flex flex-col gap-3 w-full`}>
      <Title text={`Trending Playlist`} size={`h1`} />
      <div className={`flex flex-col gap-2`}>
        <div
          className={`flex flex-wrap items-center gap-2 mb-2 xs:flex-col xs:items-start`}
        >
          <FiltersDropdown
            filters={DAYS_FILTER_ARR}
            setSelectedFilter={
              handleDropdownChange as <DAYS_FILTER>(val: DAYS_FILTER) => void
            }
            selectedFilter={period as unknown as string}
            selectedFilterLabel={
              DAYS_FILTER_ARR.find((item) => item.value === period)?.label
            }
          />
          <div className={`flex items-center gap-2 `}>
            <button
              onClick={() => {
                setIsSlider(false);
              }}
            >
              <ListBulletIcon
                className={`w-6 h-6 ${
                  !isSlider ? "text-gray-700" : "text-gray-400"
                } `}
              />
            </button>
            <button
              onClick={() => {
                setIsSlider(true);
              }}
            >
              <Squares2X2Icon
                className={`w-5 h-5 ${
                  isSlider ? "text-gray-700" : "text-gray-400"
                } `}
              />
            </button>
          </div>
        </div>
        <ReactQueryErrorBoundary>
          {!isSlider &&
            trendingPlaylistData &&
            trendingPlaylistData.length > 0 && (
              <PlaylistListContainer
                playlists={trendingPlaylistData}
                isLarge={true}
                isIndex={true}
              />
            )}
          {isSlider &&
            trendingPlaylistData &&
            trendingPlaylistData.length > 0 && (
              <PlaylistGallery playlists={trendingPlaylistData} />
            )}
        </ReactQueryErrorBoundary>
      </div>
    </section>
  );
};

export default TrendingMainTrend;
