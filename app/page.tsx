import { Inter } from "next/font/google";
import MainTemplate from "@/components/main/MainTemplate";
import {
  getMainPageTrendingPlaylists,
  getTrendingSongs,
} from "@/libs/utils/client/fetchers";
import PlaylistUpdateProvider from "@/components/common/playlist/PlaylistUpdateProvider";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";

const inter = Inter({ subsets: ["latin"] });

const Home = async () => {
  const getMainData = await getMainPageTrendingPlaylists();
  const getHotTracks = await getTrendingSongs();
  const tempProps = {
    trendingPlayLists: getMainData,
    friendsPlayLists: getMainData,
    popularTracks: getHotTracks as PlaylistType,
    myHistory: getMainData,
  };
  const propsData = [...getMainData, ...getMainData, ...getMainData];

  return (
    <PlaylistUpdateProvider propsData={propsData}>
      <MainTemplate propsData={tempProps} />
    </PlaylistUpdateProvider>
  );
};

export default Home;
