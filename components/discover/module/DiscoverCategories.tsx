"use client";

import React, { Suspense } from "react";
import PlaylistListContainer from "@/components/common/playlist/playlist-list/PlaylistListContainer";
import { UserSessionType } from "@/libs/types/common/userType";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { getCategoriesPlaylists } from "@/libs/utils/client/fetchers";
import Title from "@/components/common/module/Title";
import CategoriesList from "@/components/common/playlist/module/CategoriesList";
import categoriesList from "@/components/common/playlist/module/CategoriesList";
import { filterCategoryPlaylist } from "@/libs/utils/client/commonUtils";

const DiscoverCategories = () => {
  const { data: session } = useSession() as { data: UserSessionType };
  const { userId } = session || {};

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

  return (
    <div className={`flex flex-col gap-3 items-start`}>
      <Title size={`h1`} text={`Discover Categories`} />
      <CategoriesList
        categories={formattedCategories}
        onClick={(category: string) => {
          setSelectedCategory(category);
        }}
        selectedCategory={selectedCategory}
      />
      {!!categoryPlaylists && categoryPlaylists.length > 0 && (
        <PlaylistListContainer
          key={`discover_categories`}
          playlists={filterCategoryPlaylist(
            selectedCategory,
            categoryPlaylists,
          )}
        />
      )}
    </div>
  );
};

export default DiscoverCategories;
