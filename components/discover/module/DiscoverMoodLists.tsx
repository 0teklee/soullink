"use client";

import React, { useState } from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import { commonMoods } from "@/libs/utils/client/commonValues";
import { filterMoodPlaylists } from "@/libs/utils/client/commonUtils";
import Title from "@/components/common/module/Title";
import ImageCardContainer from "@/components/common/carousel/img-card/ImageCardContainer";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { formatMoodFontColor } from "@/components/playlistCreate/utils";

const DiscoverMoodLists = ({
  moodPlaylists,
}: {
  moodPlaylists?: PlaylistType[][];
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sortedMoodPlaylists = commonMoods.map((mood) =>
    filterMoodPlaylists(mood, moodPlaylists),
  );

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
            className={`flex items-center justify-start gap-3 mb-1 text-xl text-gray-700 font-semibold cursor-pointer`}
          >
            <p className={`${formatMoodFontColor(commonMoods[selectedIndex])}`}>
              {commonMoods[selectedIndex]}
            </p>
            {isDropdownOpen ? (
              <ChevronUpIcon className={`w-5 h-5`} />
            ) : (
              <ChevronDownIcon className={`w-5 h-5`} />
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
                  )} font-semibold cursor-pointer `}
                >
                  <p>{mood}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <ImageCardContainer playlists={sortedMoodPlaylists[selectedIndex]} />
      </div>
    </div>
  );
};

export default DiscoverMoodLists;
