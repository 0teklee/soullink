"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  commonMoods,
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME,
} from "@/libs/utils/client/commonValues";
import { filterMoodPlaylists } from "@/libs/utils/client/commonUtils";
import Title from "@/components/common/module/Title";
import ImageCardContainer from "@/components/common/carousel/img-card/ImageCardContainer";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import { formatMoodFontColor } from "@/libs/utils/client/formatter";
import { getDiscoverMoodPlaylists } from "@/libs/utils/client/fetchers";
import { useQuery } from "@tanstack/react-query";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";

const DiscoverMoodLists = ({ userId }: { userId?: string }) => {
  const { data } = useQuery({
    queryKey: ["moodPlaylists"],
    queryFn: () => getDiscoverMoodPlaylists(userId),
    gcTime: QUERY_CACHE_TIME,
    staleTime: QUERY_STALE_TIME,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sortedMoodPlaylists = useMemo(
    () => commonMoods.map((mood) => filterMoodPlaylists(mood, data)),
    [data],
  );

  const moodTextColor = formatMoodFontColor(commonMoods[selectedIndex]);

  useEffect(() => {
    const filledData = sortedMoodPlaylists.findIndex((mood) => mood.length > 0);
    setSelectedIndex(filledData);
  }, []);

  return (
    <div className={`flex flex-col gap-4 h-full min-h-[200px]`}>
      <div className={`flex items-center justify-start gap-2`}>
        <Title size={`h1`} text={`Playlists By Mood`} />
      </div>
      <div className={`flex flex-col items-center gap-2`}>
        <div className={`relative`}>
          <div
            onClick={() => {
              setIsDropdownOpen((prev) => !prev);
            }}
            className={`flex items-center justify-start gap-3 mb-1 text-xl  font-semibold cursor-pointer`}
          >
            <p className={`${moodTextColor}`}>{commonMoods[selectedIndex]}</p>
            {isDropdownOpen ? (
              <ChevronUpIcon className={`w-5 h-5 text-gray-700`} />
            ) : (
              <ChevronDownIcon className={`w-5 h-5 text-gray-700`} />
            )}
          </div>
          {isDropdownOpen && (
            <div
              className={`absolute flex flex-col gap-1 items-start justify-start bg-white rounded-lg z-30 overflow-hidden`}
            >
              {commonMoods.map((mood, index) => (
                <div
                  onClick={() => {
                    setSelectedIndex(index);
                    setIsDropdownOpen(false);
                  }}
                  key={`${mood}-${index}`}
                  className={`flex items-center justify-start gap-1 w-full p-2 text-xl text-gray-700 bg-white hover:bg-gray-50 hover:${formatMoodFontColor(
                    mood,
                    true,
                  )} font-semibold cursor-pointer `}
                >
                  <p>{mood}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <ReactQueryErrorBoundary>
          <ImageCardContainer playlists={sortedMoodPlaylists[selectedIndex]} />
        </ReactQueryErrorBoundary>
      </div>
    </div>
  );
};

export default DiscoverMoodLists;
