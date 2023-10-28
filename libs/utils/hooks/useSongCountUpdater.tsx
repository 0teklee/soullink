"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState } from "@/libs/recoil/playlistAtom";
import useTimer from "@/libs/utils/hooks/useTimer";
import { useMutation } from "react-query";
import { postPlaylistCount, postSongCount } from "@/libs/utils/client/fetchers";
import { playerGlobalState } from "@/libs/recoil/playerAtom";
import dayjs, { Dayjs } from "dayjs";
import { played5MinsMs } from "@/libs/utils/client/commonValues";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import { isNowMoreThanTargetTime } from "@/libs/utils/client/commonUtils";

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
