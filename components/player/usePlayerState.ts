import { useRecoilState, useRecoilValue } from "recoil";
import { playerGlobalState, playlistState } from "@/libs/recoil/atoms";
import { useEffect, useRef } from "react";
import { PlayerProps } from "@/libs/types/song&playlistType";

const UsePlayerState = () => {
  const [playerState, setPlayerState] = useRecoilState(playerGlobalState);
  const selectedPlayList = useRecoilValue(playlistState);

  const playerRef = useRef<PlayerProps>(null);
  const prevSongId = useRef<string | null>(null);

  const songListIndex = playerState.currentSongListIndex;

  const selectedSongList = selectedPlayList?.songs || [];
  const currentSong =
    selectedSongList.length > 0
      ? selectedSongList[songListIndex]
      : { id: "", title: "", artist: "", url: "", likedUsers: [] };

  const isSongListEmpty = selectedSongList.length === 0;
  const songId = currentSong && currentSong?.id;

  const song =
    playerState &&
    selectedSongList &&
    selectedSongList?.length > 0 &&
    selectedSongList[songListIndex]?.url
      ? selectedSongList[songListIndex].url
      : "";

  useEffect(() => {
    if (!selectedPlayList) {
      setPlayerState((prev) => ({
        ...prev,
        playing: false,
      }));
    }
  }, [playerState.playing]);

  return {
    playerRef,
    playerState,
    setPlayerState,
    selectedPlayList,
    selectedSongList,
    isSongListEmpty,
    currentSong,
    song,
    songListIndex,
    songId,
    prevSongId,
  };
};

export default UsePlayerState;
