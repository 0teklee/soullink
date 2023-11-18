import React from "react";
import {
  getAllMoodPlaylists,
  getCategoriesPlaylists,
  getEditorPlaylists,
} from "@/libs/utils/client/fetchers";
import DiscoverTemplate from "@/components/discover/DiscoverTemplate";
import PlaylistUpdateProvider from "@/components/common/playlist/PlaylistUpdateProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSessionType } from "@/libs/types/userType";

const Page = async () => {
  const userId = await getServerSession(authOptions).then(
    (res) => (res as UserSessionType)?.userId,
  );

  const [editorPlaylists, allMoodPlaylists, categoryPlaylists] =
    await Promise.all([
      await getEditorPlaylists(),
      await getAllMoodPlaylists(),
      await getCategoriesPlaylists(userId),
    ]);

  return (
    <PlaylistUpdateProvider
      propsData={[...allMoodPlaylists, ...editorPlaylists]}
    >
      <DiscoverTemplate
        moodPlaylists={allMoodPlaylists}
        editorPlaylists={editorPlaylists}
        getCategoriesPlaylists={categoryPlaylists}
      />
    </PlaylistUpdateProvider>
  );
};

export default Page;
