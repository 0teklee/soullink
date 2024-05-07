import { PlaylistType } from "@/libs/types/song&playlistType";
import dayjs, { Dayjs } from "dayjs";
import {
  postPlaylistCount,
  postRecentPlayed,
} from "@/libs/utils/client/fetchers";
import { useMutation } from "@tanstack/react-query";
import { INTERVAL_5MINS_MS } from "@/libs/utils/client/contants/commonValues";
import {
  getIsSelectedPlaying,
  setRecentPlaylistIdLocalStorage,
} from "@/libs/utils/client/commonUtils";
import { playerGlobalStore, selectedPlaylistStore } from "@/libs/store";
import { useRef } from "react";
import { useStore } from "zustand";

const UseSelectedPlaylistPlay = (
  playlistData?: PlaylistType,
  userId?: string,
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const selectedPlaylist = useStore(selectedPlaylistStore);
  const { playing } = getIsSelectedPlaying(playlistData?.id);

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

    if (!!selectedPlaylist) {
      setRecentPlaylistIdLocalStorage(selectedPlaylist.id);
    }
  };

  const handleChangePlaylistState = (playlist: PlaylistType) => {
    if (!playlistData) return;

    const startedAt = dayjs();

    if (selectedPlaylist && selectedPlaylist.id === playlist.id) {
      playerGlobalStore.setState((prev) => ({
        ...prev,
        playing: !prev.playing,
      }));
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handlePostActions(playlist, startedAt);
    }, INTERVAL_5MINS_MS);

    selectedPlaylistStore.setState(() => playlistData);
  };

  return {
    handleChangePlaylistState,
    playing,
  };
};

export default UseSelectedPlaylistPlay;
