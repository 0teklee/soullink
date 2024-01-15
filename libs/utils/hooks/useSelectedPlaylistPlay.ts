import { useRecoilState } from "recoil";
import { PlaylistType } from "@/libs/types/song&playlistType";
import dayjs, { Dayjs } from "dayjs";
import {
  postPlaylistCount,
  postRecentPlayed,
} from "@/libs/utils/client/fetchers";
import { useMutation } from "@tanstack/react-query";
import { INTERVAL_5MINS_MS } from "@/libs/utils/client/contants/commonValues";
import { setRecentPlaylistIdLocalStorage } from "@/libs/utils/client/commonUtils";
import { playerGlobalState, playlistState } from "@/libs/recoil/atoms";
import { useRef } from "react";

const UseSelectedPlaylistPlay = (
  playlistData?: PlaylistType,
  userId?: string,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [playerState, setPlayerState] = useRecoilState(playerGlobalState);
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(playlistState);
  const { playing } = playerState;

  const { mutate: postPlaylistPlayedTime } = useMutation({
    mutationFn: ({ id, time }: { id: string; time: number }) =>
      postPlaylistCount(id, time),
  });

  const { mutate: mutateRecentPlayed } = useMutation({
    mutationFn: ({
      recentPlaylistId,
      curUserId,
    }: {
      recentPlaylistId: string;
      curUserId: string;
    }) => postRecentPlayed(curUserId, recentPlaylistId),
  });

  const handleRecentPlayed = (playlistId: string) => {
    if (!!userId) {
      mutateRecentPlayed({
        curUserId: userId,
        recentPlaylistId: playlistId,
      });
    }
  };

  const handlePostActions = (playlist: PlaylistType, startedAt: Dayjs) => {
    const now = dayjs();

    postPlaylistPlayedTime({
      id: playlist.id,
      time: now.diff(dayjs(startedAt), "seconds"),
    });
    handleRecentPlayed(playlist.id);

    if (selectedPlaylist) {
      setRecentPlaylistIdLocalStorage(selectedPlaylist.id);
    }
  };

  const handleChangePlaylistState = (playlist: PlaylistType) => {
    if (!playlistData) return;

    const startedAt = dayjs();

    if (selectedPlaylist && selectedPlaylist.id === playlist.id) {
      setPlayerState((prev) => ({ ...playerState, playing: !prev.playing }));
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handlePostActions(playlist, startedAt);
    }, INTERVAL_5MINS_MS);

    setSelectedPlaylist(playlistData);
    setPlayerState((prev) => ({
      ...prev,
      playing: true,
      currentSongListIndex: 0,
    }));
  };

  return {
    handleChangePlaylistState,
    playing:
      selectedPlaylist && selectedPlaylist.id === playlistData?.id && playing,
  };
};

export default UseSelectedPlaylistPlay;
