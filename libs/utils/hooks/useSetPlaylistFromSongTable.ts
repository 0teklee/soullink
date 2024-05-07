import { PlaylistType } from "@/libs/types/song&playlistType";

import { playerGlobalStore, selectedPlaylistStore } from "@/libs/store";
import { useStore } from "zustand";

export const useSetPlaylistFromSongTable = (
  songId: string,
  targetPlaylist?: PlaylistType,
) => {
  const { playing, currentSongListIndex } = useStore(playerGlobalStore);
  const { id: selectedId, songs: selectedSongs } = selectedPlaylistStore(
    (state) => ({ id: state?.id, songs: state?.songs }),
  );

  if (!targetPlaylist) {
    return;
  }

  const { songs: targetSongs } = targetPlaylist;
  const targetSongIndex = targetSongs.findIndex((song) => song.id === songId);

  const isTargetSongPlaying =
    !!selectedId &&
    playing &&
    targetPlaylist.id === selectedId &&
    selectedSongs &&
    songId === selectedSongs[currentSongListIndex]?.id;

  const updatePlaylist = (_playlist: PlaylistType) => {
    selectedPlaylistStore.setState(_playlist);
    playerGlobalStore.setState((prev) => ({
      ...prev,
      currentSongListIndex: targetSongIndex || 0,
      playing: true,
    }));
  };

  const updateCurrentPlaySong = () => {
    if (playing && isTargetSongPlaying) {
      playerGlobalStore.setState((prev) => ({ ...prev, playing: false }));
      return;
    }

    playerGlobalStore.setState((prev) => ({
      ...prev,
      currentSongListIndex: targetSongIndex,
      playing: true,
    }));
  };

  const playSongFromTable = (playlist: PlaylistType) => {
    if (!selectedId || selectedId !== playlist.id) {
      return updatePlaylist(playlist);
    }

    return updateCurrentPlaySong();
  };

  return {
    playSongFromTable,
    isSongPlaying: isTargetSongPlaying,
  };
};
