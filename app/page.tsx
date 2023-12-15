import { Noto_Sans } from "next/font/google";
import MainTemplate from "@/components/main/MainTemplate";
import {
  getMainPageFriendsPlaylists,
  getMainPageTodayPlaylists,
  getRecentPlaylists,
  getTimelinePlaylists,
} from "@/libs/utils/client/fetchers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSessionType } from "@/libs/types/userType";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const Home = async () => {
  const queryClient = new QueryClient();
  const { userId, userNickname } = await getServerSession(authOptions)
    .then((session) => (session as UserSessionType) || {})
    .catch(() => ({ userId: "", userNickname: "" }));

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["todayPlaylists"],
      queryFn: getMainPageTodayPlaylists,
    }),
    queryClient.prefetchQuery({
      queryKey: ["timeline_playlists", userId],
      queryFn: () => getTimelinePlaylists(userId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["mainPageFriendsPlaylists"],
      queryFn: () => getMainPageFriendsPlaylists(userId),
    }),
    queryClient.prefetchQuery({
      queryKey: ["recentPlayed", userId],
      queryFn: () => getRecentPlaylists(userId),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainTemplate userId={userId} userNickname={userNickname} />
    </HydrationBoundary>
  );
};

export default Home;
