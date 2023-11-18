import { Inter } from "next/font/google";
import MainTemplate from "@/components/main/MainTemplate";
import {
  getMainPageFriendsPlaylists,
  getMainPageTodayPlaylists,
  getMainPageTrendingPlaylists,
  getTrendingSongs,
} from "@/libs/utils/client/fetchers";
import PlaylistUpdateProvider from "@/components/common/playlist/PlaylistUpdateProvider";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserSessionType } from "@/libs/types/userType";

const inter = Inter({ subsets: ["latin"] });

const Home = async () => {
  const userId = await getServerSession(authOptions).then(
    (res) => (res as UserSessionType)?.userId,
  );

  const props = await Promise.all([
    getMainPageTodayPlaylists(),
    getMainPageTrendingPlaylists(),
    getMainPageFriendsPlaylists(userId),
    getTrendingSongs(),
  ]);

  const propsData = props.slice(0, 4) as PlaylistType[][];
  const UpdateProviderProps = propsData.flat();

  return (
    <PlaylistUpdateProvider propsData={UpdateProviderProps}>
      <MainTemplate
        propsData={propsData}
        hotTracks={props[3]}
        userId={userId}
      />
    </PlaylistUpdateProvider>
  );
};

export default Home;
