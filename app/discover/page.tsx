import React from "react";
import {
  getEditorPlaylists,
  getMoodPlaylists,
} from "@/libs/utils/client/fetchers";
import { commonMoods } from "@/libs/utils/client/commonValues";
import DiscoverTemplate from "@/components/discover/DiscoverTemplate";
import PlaylistUpdateProvider from "@/components/common/playlist/PlaylistUpdateProvider";

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
  const allMoodPlaylistsFlat = allMoodPlaylists?.flat() || [];
  const editorPlaylists = await getEditorPlaylists();

  return (
    <PlaylistUpdateProvider
      propsData={[...allMoodPlaylistsFlat, ...editorPlaylists]}
    >
      <DiscoverTemplate
        moodPlaylists={allMoodPlaylists}
        editorPlaylists={editorPlaylists}
      />
    </PlaylistUpdateProvider>
  );
};

export default Page;
