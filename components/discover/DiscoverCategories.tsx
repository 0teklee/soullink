"use client";

import React from "react";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesPlaylists } from "@/libs/utils/client/fetchers";
import Title from "@/components/common/module/Title";
import FiltersList from "@/components/common/playlist/module/FiltersList";
import { filterCategoryPlaylist } from "@/libs/utils/client/commonUtils";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";

const DiscoverCategories = ({ userId }: { userId?: string }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const { data } = useQuery({
    queryKey: ["categoryPlaylists", userId],
    queryFn: () => getCategoriesPlaylists(userId),
  });

  const { categoryPlaylists, categories } = data || {
    categories: [],
    categoryPlaylists: [],
  };

  const formattedCategories = ["all", ...categories];

  const selectedCategoryPlaylists = filterCategoryPlaylist(
    selectedCategory,
    categoryPlaylists,
  );

  return (
    <div className={`flex flex-col gap-3 items-start`}>
      <Title size={`h1`} text={`Discover Categories`} />
      <FiltersList
        filters={formattedCategories}
        onClick={(category: string) => {
          setSelectedCategory(category);
        }}
        selectedFilter={selectedCategory}
      />

      {!!categoryPlaylists && categoryPlaylists.length > 0 && (
        <ReactQueryErrorBoundary>
          <PlaylistListContainer
            key={`discover_categories`}
            playlists={selectedCategoryPlaylists}
          />
        </ReactQueryErrorBoundary>
      )}
    </div>
  );
};

export default DiscoverCategories;
