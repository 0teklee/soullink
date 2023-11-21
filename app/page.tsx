import { Inter } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"] });

const Home = async () => {
  const { userId, userNickname } =
    ((await getServerSession(authOptions)) as UserSessionType) || {};

  const props = await Promise.all([
    getMainPageTodayPlaylists(),
    getTimelinePlaylists(userId),
    getMainPageFriendsPlaylists(userId),
    getRecentPlaylists(userId),
  ]);

  return (
    <MainTemplate
      propsData={props}
      userId={userId}
      userNickname={userNickname}
    />
  );
};

export default Home;
