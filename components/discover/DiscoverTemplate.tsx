import React from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import DiscoverMoodLists from "@/components/discover/DiscoverMoodLists";
import DiscoverSuggestion from "@/components/discover/DiscoverSuggestion";
import DiscoverEditorSelection from "@/components/discover/DiscoverEditorSelection";
import DiscoverCategories from "@/components/discover/DiscoverCategories";

const DiscoverTemplate = ({
  moodPlaylists,
  editorPlaylists,
  getCategoriesPlaylists,
}: {
  editorPlaylists?: PlaylistType[];
  moodPlaylists?: PlaylistType[];
  getCategoriesPlaylists?: {
    categoryPlaylists: PlaylistType[];
    categories: string[];
  };
}) => {
  return (
    <section className={`flex flex-col gap-12 py-6`}>
      <DiscoverEditorSelection editorPlaylists={editorPlaylists} />
      <DiscoverMoodLists moodPlaylists={moodPlaylists} />
      <DiscoverCategories propsData={getCategoriesPlaylists} />
      <DiscoverSuggestion />
    </section>
  );
};

export default DiscoverTemplate;
