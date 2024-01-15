import React, { useState } from "react";
import FiltersDropdown from "@/components/common/playlist/module/FiltersDropdown";
import {
  DAYS_FILTER,
  DAYS_FILTER_ARR,
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME,
  RECENT_FILTER,
  RECENT_FILTER_ARR,
} from "@/libs/utils/client/contants/commonValues";
import { ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import PlaylistGallery from "@/components/common/playlist/gallery-list/PlaylistGallery";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMainPlaylists } from "@/libs/utils/client/fetchers";

const TrendingMainList = () => {
  const [period, setPeriod] = useState<DAYS_FILTER>(DAYS_FILTER.ALL_TIME);
  const [recentPlayedFilter, setRecentPlayedFilter] = useState(
    RECENT_FILTER.RECENT_DESC,
  );
  const [isSlider, setIsSlider] = useState(false);

  const { data: trendingPlaylistData } = useQuery({
    queryKey: ["trendingMain", period, recentPlayedFilter],
    queryFn: () => getTrendingMainPlaylists(period, recentPlayedFilter),
    gcTime: QUERY_CACHE_TIME,
    staleTime: QUERY_STALE_TIME,
  });

  const handleDropdownChange = (val: DAYS_FILTER) => {
    setPeriod(val);
  };

  const handleRecentPlayedDropdownChange = (val: RECENT_FILTER) => {
    setRecentPlayedFilter(val);
  };
  return (
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
        <FiltersDropdown
          filters={RECENT_FILTER_ARR}
          setSelectedFilter={
            handleRecentPlayedDropdownChange as <RECENT_FILTER>(
              val: RECENT_FILTER,
            ) => void
          }
          customStyles={`text-xs`}
          selectedFilter={recentPlayedFilter as unknown as string}
          selectedFilterLabel={
            RECENT_FILTER_ARR.find((item) => item.value === recentPlayedFilter)
              ?.label
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
                !isSlider
                  ? "text-gray-700 dark:text-warmGray-50"
                  : "text-gray-400"
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
                isSlider
                  ? "text-gray-700 dark:text-warmGray-50"
                  : "text-gray-400"
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
  );
};

export default TrendingMainList;
