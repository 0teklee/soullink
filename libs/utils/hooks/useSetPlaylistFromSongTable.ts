import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import { useRecoilState } from "recoil";
import { playlistState } from "@/libs/recoil/playlistAtom";
import { playerGlobalState } from "@/libs/recoil/playerAtom";

export const useSetPlaylistFromSongTable = (
  songId: string,
  targetPlaylist?: PlaylistType,
) => {
  const [currentPlaylist, setCurrentPlaylist] = useRecoilState(playlistState);
  const [currentPlayer, setCurrentPlayer] = useRecoilState(playerGlobalState);

  if (!targetPlaylist) {
    return;
  }

  const { songs: targetSongs } = targetPlaylist;
  const targetSongIndex = targetSongs.findIndex((song) => song.id === songId);

  const isSongPlaying =
    currentPlaylist &&
    currentPlayer &&
    currentPlayer.playing &&
    targetPlaylist.id === currentPlaylist?.id &&
    songId === currentPlaylist?.songs[currentPlayer.currentSongListIndex]?.id;

  const updatePlaylist = (playlist: PlaylistType) => {
    setCurrentPlaylist(playlist);
    setCurrentPlayer({
      ...currentPlayer,
      currentSongListIndex: targetSongIndex || 0,
      playing: true,
    });
  };

  const updateCurrentPlaySong = () => {
    if (currentPlayer.playing && isSongPlaying) {
      setCurrentPlayer((prev) => ({ ...prev, playing: false }));
      return;
    }

    setCurrentPlayer({
      ...currentPlayer,
      currentSongListIndex: targetSongIndex,
      playing: true,
    });
  };

  const playSongFromTable = (playlist: PlaylistType) => {
    if (!currentPlaylist || currentPlaylist.id !== playlist.id) {
      return updatePlaylist(playlist);
    }

    return updateCurrentPlaySong();
  };

  return { playSongFromTable, currentPlayer, currentPlaylist, isSongPlaying };
};
