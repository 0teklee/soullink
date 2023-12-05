import React from "react";
import DiscoverMoodLists from "@/components/discover/DiscoverMoodLists";
import DiscoverSuggestion from "@/components/discover/DiscoverSuggestion";
import DiscoverEditorSelection from "@/components/discover/DiscoverEditorSelection";
import DiscoverCategories from "@/components/discover/DiscoverCategories";

const DiscoverTemplate = ({
  userId,
  userNickname,
}: {
  userId?: string;
  userNickname?: string;
}) => {
  return (
    <section className={`flex flex-col gap-12 py-6`}>
      <DiscoverEditorSelection />
      <DiscoverMoodLists userId={userId} />
      <DiscoverCategories />
      <DiscoverSuggestion userNickname={userNickname} userId={userId} />
    </section>
  );
};

export default DiscoverTemplate;
