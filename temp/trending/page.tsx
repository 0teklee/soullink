import React from "react";
import TrendingTemplate from "../../components/trending/TrendingTemplate";
import {
  getMoodPlaylists,
  getTrendingCategoriesPlaylists,
  getTrendingMainPlaylists,
  getTrendingSongs,
} from "../../libs/utils/client/fetchers";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import { UserSessionType } from "../../libs/types/userType";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { DAYS_FILTER } from "../../libs/utils/client/commonValues";

const Page = async () => {
  const queryClient = new QueryClient();

  const [{ userId }] = await Promise.all([
    getServerSession(authOptions)
      .then((session) =>
        session ? (session as UserSessionType) : { userId: "" },
      )
      .catch(() => ({ userId: "" })),
    queryClient.prefetchQuery({
      queryKey: ["trendingMain", DAYS_FILTER.ALL_TIME],
      queryFn: () => getTrendingMainPlaylists(DAYS_FILTER.ALL_TIME),
    }),
    queryClient.prefetchQuery({
      queryKey: ["trendingCategories", DAYS_FILTER.ALL_TIME],
      queryFn: () => getTrendingCategoriesPlaylists(DAYS_FILTER.ALL_TIME),
    }),
    queryClient.prefetchQuery({
      queryKey: ["trendingMood", DAYS_FILTER.ALL_TIME, null],
      queryFn: () => getMoodPlaylists(null, DAYS_FILTER.ALL_TIME),
    }),
    queryClient.prefetchQuery({
      queryKey: ["mainPageTrendingSongs", DAYS_FILTER.ALL_TIME],
      queryFn: () => getTrendingSongs(DAYS_FILTER.ALL_TIME),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TrendingTemplate userId={userId} />
    </HydrationBoundary>
  );
};

export default Page;
