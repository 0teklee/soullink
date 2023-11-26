"use client";

import React, { useEffect, useState } from "react";
import {
  DAYS_FILTER,
  DAYS_FILTER_ARR,
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME,
} from "@/libs/utils/client/commonValues";
import { useQueries } from "@tanstack/react-query";
import { getMoodLists, getMoodPlaylists } from "@/libs/utils/client/fetchers";
import Title from "@/components/common/module/Title";
import FiltersDropdown from "@/components/common/playlist/module/FiltersDropdown";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import { PlaylistMoodType, PlaylistType } from "@/libs/types/song&playlistType";
import { formatMoodBgColor } from "@/libs/utils/client/formatter";

const TrendingMood = ({ initData }: { initData: PlaylistType[] }) => {
  const [period, setPeriod] = useState<DAYS_FILTER>(DAYS_FILTER.ALL_TIME);
  const [selectedMood, setSelectedMood] = useState<null | PlaylistMoodType>(
    null,
  );

  const [moodPlaylistQuery, moodListQuery] = useQueries({
    queries: [
      {
        queryKey: ["trendingMood", period, selectedMood],
        queryFn: () => getMoodPlaylists(selectedMood, `${period}`),
        initialData: initData,
        gcTime: QUERY_CACHE_TIME,
        staleTime: QUERY_STALE_TIME,
      },
      {
        queryKey: ["filteredMood", period],
        queryFn: () => getMoodLists(`${period}`),
        gcTime: QUERY_CACHE_TIME,
        staleTime: QUERY_STALE_TIME,
      },
    ],
  });

  const { data: moodPlaylistData, refetch: trendingRefetch } =
    moodPlaylistQuery;
  const { data: moodFilterData, refetch: filterRefetch } = moodListQuery;

  const handleDropdownChange = (val: DAYS_FILTER) => {
    setPeriod(val);
  };

  useEffect(() => {
    trendingRefetch();
    filterRefetch();
  }, [period]);

  return (
    <section className={`flex flex-col gap-3 w-full`}>
      <Title text={`Trending Moods`} size={`h1`} />
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
          <div
            className={`flex gap-2 items-start justify-start bg-white z-10 overflow-hidden`}
          >
            {moodFilterData?.map(({ name, count }, index) => (
              <div
                onClick={() => {
                  setSelectedMood(name as PlaylistMoodType);
                }}
                key={`${name}-${index}`}
                className={`flex items-center justify-start gap-1 w-full px-2 py-1.5 text-xs rounded text-gray-700 hover:${formatMoodBgColor(
                  name as PlaylistMoodType,
                )} hover:text-white  font-semibold cursor-pointer `}
              >
                <p>{name}</p>
                <p
                  className={`px-2 py-1 rounded-full text-gray-50 ${formatMoodBgColor(
                    name as PlaylistMoodType,
                  )} bg-opacity-30`}
                >
                  {count}
                </p>
              </div>
            ))}
          </div>
        </div>
        <PlaylistListContainer
          playlists={moodPlaylistData}
          isLarge={true}
          isIndex={true}
        />
      </div>
    </section>
  );
};

export default TrendingMood;
