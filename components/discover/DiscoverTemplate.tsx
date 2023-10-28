import React from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import { filterMoodPlaylists } from "@/libs/utils/client/commonUtils";
import { commonMoods } from "@/libs/utils/client/commonValues";
import ImageCardContainer from "@/components/common/carousel/img-card/ImageCardContainer";

const DiscoverTemplate = ({
  moodPlaylists,
}: {
  moodPlaylists?: PlaylistType[][];
}) => {
  const [
    energeticPlaylist,
    upbeatPlaylist,
    chillPlaylist,
    relaxedPlaylist,
    melancholicPlaylist,
    darkPlaylist,
  ] = commonMoods.map((mood) => filterMoodPlaylists(mood, moodPlaylists));

  return (
    <section className={`flex flex-col gap-12 py-6`}>
      <ImageCardContainer playlists={energeticPlaylist} />
      <ImageCardContainer playlists={upbeatPlaylist} />
      <ImageCardContainer playlists={chillPlaylist} />
      {/*<ImageCardContainer playlists={relaxedPlaylist} />*/}
      {/*<ImageCardContainer playlists={melancholicPlaylist} />*/}
      {/*<ImageCardContainer playlists={darkPlaylist} />*/}
    </section>
  );
};

export default DiscoverTemplate;
