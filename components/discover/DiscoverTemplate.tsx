import React from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import DiscoverMoodLists from "@/components/discover/DiscoverMoodLists";
import DiscoverSuggestion from "@/components/discover/DiscoverSuggestion";
import DiscoverEditorSelection from "@/components/discover/DiscoverEditorSelection";
import DiscoverCategories from "@/components/discover/DiscoverCategories";

interface DiscoverCategoryData {
  categoryPlaylists: PlaylistType[];
  categories: string[];
}

const DiscoverTemplate = ({
  propsData,
  userId,
  userNickname,
}: {
  propsData: (PlaylistType[] | DiscoverCategoryData)[];
  userId?: string;
  userNickname?: string;
}) => {
  const [
    editorPlaylists,
    moodPlaylists,
    categoryPlaylists,
    recommendPlaylists,
  ] = propsData;
  return (
    <section className={`flex flex-col gap-12 py-6`}>
      <DiscoverEditorSelection
        editorPlaylists={editorPlaylists as PlaylistType[]}
      />
      <DiscoverMoodLists
        moodPlaylists={moodPlaylists as PlaylistType[]}
        userId={userId}
      />
      <DiscoverCategories
        propsData={categoryPlaylists as DiscoverCategoryData}
      />
      <DiscoverSuggestion
        recommendedPlaylists={recommendPlaylists as PlaylistType[]}
        userNickname={userNickname}
        userId={userId}
      />
    </section>
  );
};

export default DiscoverTemplate;
