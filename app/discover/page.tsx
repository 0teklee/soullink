import React from "react";
import {
  getCategoriesPlaylists,
  getDiscoverMoodPlaylists,
  getEditorPlaylists,
  getRecommendedPlaylists,
} from "@/libs/utils/client/fetchers";
import DiscoverTemplate from "@/components/discover/DiscoverTemplate";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSessionType } from "@/libs/types/userType";

const Page = async () => {
  const { userId, userNickname } = await getServerSession(authOptions).then(
    (session) => (session as UserSessionType) || {},
  );

  const propsData = await Promise.all([
    await getEditorPlaylists(),
    await getDiscoverMoodPlaylists(),
    await getCategoriesPlaylists(userId),
    await getRecommendedPlaylists(userId || ""),
  ]);

  return (
    <DiscoverTemplate
      propsData={propsData}
      userId={userId}
      userNickname={userNickname}
    />
  );
};

export default Page;
