import React, { Suspense } from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import DiscoverMoodLists from "@/components/discover/module/DiscoverMoodLists";
import DiscoverSuggestion from "@/components/discover/module/DiscoverSuggestion";
import DiscoverEditorSelection from "@/components/discover/module/DiscoverEditorSelection";
import DiscoverCategories from "@/components/discover/module/DiscoverCategories";

const DiscoverTemplate = ({
  moodPlaylists,
  editorPlaylists,
}: {
  editorPlaylists?: PlaylistType[];
  moodPlaylists?: PlaylistType[][];
}) => {
  return (
    <section className={`flex flex-col gap-12 py-6`}>
      <DiscoverEditorSelection editorPlaylists={editorPlaylists} />
      <DiscoverMoodLists moodPlaylists={moodPlaylists} />
      <Suspense fallback={<div>Loading...</div>}>
        <DiscoverCategories />
        <DiscoverSuggestion />
      </Suspense>
    </section>
  );
};

export default DiscoverTemplate;
