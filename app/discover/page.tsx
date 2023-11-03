import React from "react";
import {
  getEditorPlaylists,
  getMoodPlaylists,
} from "@/libs/utils/client/fetchers";
import { commonMoods } from "@/libs/utils/client/commonValues";
import DiscoverTemplate from "@/components/discover/DiscoverTemplate";

const moodPlaylists = async () => {
  try {
    const res = await Promise.all(
      commonMoods.map(async (mood) => await getMoodPlaylists(mood)),
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

const Page = async () => {
  const allMoodPlaylists = await moodPlaylists();
  const editorPlaylists = await getEditorPlaylists();

  return (
    <DiscoverTemplate
      moodPlaylists={allMoodPlaylists}
      editorPlaylists={editorPlaylists}
    />
  );
};

export default Page;
