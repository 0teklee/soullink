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
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const Page = async () => {
  const queryClient = new QueryClient();
  const { userId, userNickname } = await getServerSession(authOptions)
    .then(
      (session) =>
        (session as UserSessionType) || { userId: "", userNickname: "" },
    )
    .catch(() => ({ userId: "", userNickname: "" }));

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["editorPlaylists"],
      queryFn: getEditorPlaylists,
    }),
    queryClient.prefetchQuery({
      queryKey: ["moodPlaylists"],
      queryFn: () => getDiscoverMoodPlaylists(userId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["categoryPlaylists", userId],
      queryFn: () => getCategoriesPlaylists(userId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["recommendedPlaylists", userId],
      queryFn: () => getRecommendedPlaylists(userId || ""),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DiscoverTemplate userId={userId} userNickname={userNickname} />
    </HydrationBoundary>
  );
};

export default Page;
