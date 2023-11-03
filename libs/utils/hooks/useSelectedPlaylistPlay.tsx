import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { playerGlobalState } from "@/libs/recoil/playerAtom";
import { playlistState } from "@/libs/recoil/playlistAtom";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import dayjs from "dayjs";
import { postPlaylistCount } from "@/libs/utils/client/fetchers";
import { useMutation } from "react-query";
import { played5MinSeconds } from "@/libs/utils/client/commonValues";
import {
  isNowMoreThanTargetTime,
  setRecentPlaylistIdLocalStorage,
} from "@/libs/utils/client/commonUtils";

const UseSelectedPlaylistPlay = (playlistData: PlaylistType) => {
  const [playerState, setPlayerState] = useRecoilState(playerGlobalState);
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(playlistState);
  const { playing, startedAt, currentSongListIndex } = playerState;

  const { mutate: postPlaylistPlayedTime } = useMutation({
    mutationFn: ({ id, time }: { id: string; time: number }) =>
      postPlaylistCount(id, time),
    onSuccess: () => {
      setPlayerState((prev) => ({ ...prev, startedAt: null }));
    },
  });

  const handleChangePlaylistState = (playlist: PlaylistType) => {
    const now = dayjs();
    const isMoreThan5Mins = isNowMoreThanTargetTime(
      startedAt,
      played5MinSeconds,
      "seconds",
    );

    if (selectedPlaylist && selectedPlaylist.id === playlist.id && playing) {
      setPlayerState({ ...playerState, playing: false });
      return;
    }

    if (selectedPlaylist && selectedPlaylist.id === playlist.id && !playing) {
      setPlayerState({ ...playerState, playing: true });
      return;
    }

    if (!startedAt) {
      setPlayerState({ ...playerState, startedAt: now });
    }

    if (selectedPlaylist && isMoreThan5Mins) {
      postPlaylistPlayedTime({
        id: selectedPlaylist.id,
        time: now.diff(dayjs(startedAt), "seconds"),
      });
      setRecentPlaylistIdLocalStorage(selectedPlaylist.id);
    }

    setSelectedPlaylist(playlistData);
  };

  return {
    handleChangePlaylistState,
    playing:
      selectedPlaylist && selectedPlaylist.id === playlistData.id && playing,
  };
};

export default UseSelectedPlaylistPlay;
