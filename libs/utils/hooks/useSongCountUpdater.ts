"use client";
import { useRecoilValue } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { postSongCount } from "@/libs/utils/client/fetchers";
import dayjs from "dayjs";
import { playerGlobalState } from "@/libs/recoil/atoms";

const UseSongCountUpdater = () => {
  const playerState = useRecoilValue(playerGlobalState);
  const { mutate: postSongPlayedCount } = useMutation({
    mutationFn: ({ id }: { id: string }) => postSongCount(id),
  });

  const { songStartedAt, durationSec } = playerState;

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
