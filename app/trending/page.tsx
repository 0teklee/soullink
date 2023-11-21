import React from "react";
import TrendingTemplate from "@/components/trending/TrendingTemplate";
import {
  getMoodPlaylists,
  getTrendingCategoriesPlaylists,
  getTrendingMainPlaylists,
  getTrendingSongs,
} from "@/libs/utils/client/fetchers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSessionType } from "@/libs/types/userType";

const Page = async () => {
  const propsData = await Promise.all([
    getTrendingMainPlaylists(`0`),
    getTrendingCategoriesPlaylists(`0`),
    getMoodPlaylists(null, `0`),
    getTrendingSongs(),
  ]);

  const { userId, userNickname } =
    ((await getServerSession(authOptions)) as UserSessionType) || {};

  return <TrendingTemplate propsData={propsData} userId={userId} />;
};

export default Page;
