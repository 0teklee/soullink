import React from "react";
import { getMoodPlaylists } from "@/libs/utils/client/fetchers";
import { commonMoods } from "@/libs/utils/client/commonValues";
import DiscoverTemplate from "@/components/discover/DiscoverTemplate";

// const energeticPlaylist = async () => await getMoodPlaylists("energetic");
// const upbeatPlaylist = async () => await getMoodPlaylists("upbeat");
// const chillPlaylist = async () => await getMoodPlaylists("chill");
// const relaxedPlaylist = async () => await getMoodPlaylists("relaxed");
// const melancholicPlaylist = async () => await getMoodPlaylists("melancholic");
// const darkPlaylist = async () => await getMoodPlaylists("dark");

const moodPlaylists = async () => {
  try {
    const res = await Promise.all(
      commonMoods.map(async (mood) => await getMoodPlaylists(mood)),
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};

// const [
//     energeticPlaylist,
//   upbeatPlaylist,
//   chillPlaylist,
//   relaxedPlaylist,
//   melancholicPlaylist,
//   darkPlaylist,
// ] = moodPromises;

// const [
//   energeticPlaylist,
//   upbeatPlaylist,
//   chillPlaylist,
//   relaxedPlaylist,
//   melancholicPlaylist,
//   darkPlaylist,
// ] =  Promise.all(moodPromises);

const Page = async () => {
  const allMoodPlaylists = await moodPlaylists();
  const [
    energeticPlaylist,
    upbeatPlaylist,
    chillPlaylist,
    relaxedPlaylist,
    melancholicPlaylist,
    darkPlaylist,
  ] = allMoodPlaylists ?? [];

  return (
    <main>
      <DiscoverTemplate moodPlaylists={allMoodPlaylists} />
    </main>
  );
};

export default Page;
