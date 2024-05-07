import { playerGlobalStore, selectedPlaylistStore } from "@/libs/store";
import { useEffect, useRef } from "react";
import { PlayerProps } from "@/libs/types/song&playlistType";
import { useStore } from "zustand";

const UsePlayerState = () => {
  const { currentSongListIndex, playing } = playerGlobalStore((state) => ({
    currentSongListIndex: state.currentSongListIndex,
    playing: state.playing,
  }));

  const selectedPlayList = useStore(selectedPlaylistStore);

  const playerRef = useRef<PlayerProps>(null);
  const prevSongId = useRef<string | null>(null);

  const selectedSongList = selectedPlaylistStore((state) => state?.songs || []);
  const currentSong =
    selectedSongList.length > 0
      ? selectedSongList[currentSongListIndex]
      : { id: "", title: "", artist: "", url: "", likedUsers: [] };

  const isSongListEmpty = selectedSongList.length === 0;
  const songId = currentSong && currentSong?.id;

  const song =
    selectedSongList &&
    selectedSongList?.length > 0 &&
    selectedSongList[currentSongListIndex]?.url
      ? selectedSongList[currentSongListIndex].url
      : "";

  useEffect(() => {
    if (!selectedPlayList) {
      playerGlobalStore.setState((prev) => ({
        ...prev,
        playing: false,
      }));
    }
  }, [playing]);

  return {
    playerRef,
    selectedPlayList,
    selectedSongList,
    isSongListEmpty,
    currentSong,
    song,
    currentSongListIndex,
    songId,
    prevSongId,
  };
};

export default UsePlayerState;
