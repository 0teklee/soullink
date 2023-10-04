import { Inter } from "next/font/google";
import MainTemplate from "@/components/main/MainTemplate";
import {
  getTrendingPlaylists,
  getTrendingSongs,
} from "@/libs/utils/client/fetchers";
import PlaylistUpdateProvider from "@/components/common/playlist/PlaylistUpdateProvider";

const inter = Inter({ subsets: ["latin"] });

// api 함수

const Home = async () => {
  const getMainData = await getTrendingPlaylists();
  const getHotTracks = await getTrendingSongs();
  const tempProps = {
    trendingPlayLists: getMainData,
    friendsPlayLists: getMainData,
    hotTracks: getHotTracks,
    myHistory: getMainData,
  };
  const propsData = [...getMainData, ...getMainData, ...getMainData];

  return (
    <section className={`py-6`}>
      <PlaylistUpdateProvider propsData={propsData}>
        <MainTemplate propsData={tempProps} />
      </PlaylistUpdateProvider>
    </section>
  );
};

export default Home;
