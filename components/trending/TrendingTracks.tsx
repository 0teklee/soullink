"use client";

import React, { useState } from "react";
import Title from "@/components/common/module/Title";
import SongTable from "@/components/common/song/table/SongTable";
import {
  PlaylistType,
  SongType,
  TrendingSongPlaylistType,
} from "@/libs/types/song&playlistType";
import { getTrendingSongs } from "@/libs/utils/client/fetchers";
import { useQuery } from "react-query";
import { DAYS_FILTER, DAYS_FILTER_ARR } from "@/libs/utils/client/commonValues";
import FiltersDropdown from "@/components/common/playlist/module/FiltersDropdown";

const TrendingTracks = ({
  trendingSongList,
  userId,
}: {
  trendingSongList: TrendingSongPlaylistType;
  userId?: string;
}) => {
  const [period, setPeriod] = useState<DAYS_FILTER>(DAYS_FILTER.ALL_TIME);

  const { data } = useQuery({
    queryKey: ["mainPageTrendingSongs", period],
    queryFn: () => getTrendingSongs(period),
    initialData: trendingSongList,
  });

  const handleDropdownChange = (val: DAYS_FILTER) => {
    setPeriod(val);
  };

  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title size={`h1`} text={`Popular Tracks`} />
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
      {data && data.songs && data.songs.length > 0 && (
        <SongTable
          songList={data.songs as SongType[]}
          playlist={data as PlaylistType}
          isCreate={false}
          userId={userId}
        />
      )}
    </section>
  );
};

export default TrendingTracks;
