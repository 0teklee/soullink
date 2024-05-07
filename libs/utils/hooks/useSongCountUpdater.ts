"use client";
import { useMutation } from "@tanstack/react-query";
import { postSongCount } from "@/libs/utils/client/fetchers";
import dayjs from "dayjs";
import { playerGlobalStore } from "@/libs/store";
import { useStore } from "zustand";

const UseSongCountUpdater = () => {
  const { songStartedAt, durationSec } = useStore(playerGlobalStore);
  const { mutate: postSongPlayedCount } = useMutation({
    mutationFn: ({ id }: { id: string }) => postSongCount(id),
  });

  const handleSongChange = (songId: string) => {
    if (!songStartedAt || !durationSec) {
      return;
    }

    const halfDuration = durationSec / 10;

    const playedSeconds = dayjs().diff(dayjs(songStartedAt), "seconds");
    const isMoreThanHalf = playedSeconds > halfDuration;

    if (isMoreThanHalf) {
      postSongPlayedCount({ id: songId });
    }
  };

  return { handleSongChange };
};

export default UseSongCountUpdater;
