import React from "react";
import MainTrending from "@/components/main/MainTrending";
import MainFriendsPlaylists from "@/components/main/MainFriendsPlaylists";
import MainHotTracks from "@/components/main/MainHotTracks";
import MainMyHistory from "@/components/main/MainMyHistory";
import {
  fakeFirstPlaylistData,
  fakePlayLists,
} from "@/utils/client/commonStaticApiData";

const MainTemplate = () => {
  return (
    <div className={`flex flex-col items-start gap-y-12 `}>
      <MainTrending playLists={fakePlayLists} />
      <MainFriendsPlaylists playLists={fakePlayLists} />
      <MainHotTracks songList={fakeFirstPlaylistData.songs} />
      <MainMyHistory playLists={fakePlayLists} />
    </div>
  );
};

export default MainTemplate;
