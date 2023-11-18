"use client";

import React from "react";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";
import { UserSessionType } from "@/libs/types/userType";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { getCategoriesPlaylists } from "@/libs/utils/client/fetchers";
import Title from "@/components/common/module/Title";
import FiltersList from "@/components/common/playlist/module/FiltersList";
import { filterCategoryPlaylist } from "@/libs/utils/client/commonUtils";
import { PlaylistType } from "@/libs/types/song&playlistType";

const DiscoverCategories = ({
  propsData,
}: {
  propsData?: { categoryPlaylists: PlaylistType[]; categories: string[] };
}) => {
  const { data: session } = useSession() as { data: UserSessionType };
  const { userId } = session || {};

  const [selectedCategory, setSelectedCategory] = React.useState<string>("");

  const { data, refetch } = useQuery({
    queryKey: ["categoryPlaylists", userId],
    queryFn: () => getCategoriesPlaylists(userId),
    initialData: propsData,
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
        <PlaylistListContainer
          key={`discover_categories`}
          playlists={selectedCategoryPlaylists}
        />
      )}
    </div>
  );
};

export default DiscoverCategories;
