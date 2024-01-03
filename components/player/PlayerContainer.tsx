"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import PlayerController from "@/components/player/PlayerController";
import { PlayerProps } from "@/libs/types/song&playlistType";
import { useRecoilState, useRecoilValue } from "recoil";
import useSongCountUpdater from "@/libs/utils/hooks/useSongCountUpdater";
import dayjs from "dayjs";
import { playerGlobalState, playlistState } from "@/libs/recoil/atoms";

import handlePlayerKeyPress from "@/components/player/utils";

const Player = dynamic(() => import("@/components/player/Player"), {
  ssr: false,
});

const PlayerContainer = () => {
  const [playerState, setPlayerState] = useRecoilState(playerGlobalState);
  const selectedPlayList = useRecoilValue(playlistState);
  const selectedSongList = selectedPlayList?.songs || [];
  const currentSong =
    selectedSongList.length > 0 &&
    selectedSongList[playerState.currentSongListIndex];
  const isSongListEmpty = selectedSongList.length === 0;
  const songId = currentSong && currentSong?.id;

  const playerRef = useRef<PlayerProps>(null);
  const prevSongId = useRef<string | null>(null);
  const { handleSongChange } = useSongCountUpdater();

  useEffect(() => {
    if (!songId) {
      return;
    }
    if (!prevSongId.current) {
      prevSongId.current = songId;
    }

    if (playerState?.songStartedAt) {
      handleSongChange(prevSongId.current);
      prevSongId.current = songId;
    }

    setPlayerState({
      ...playerState,
      songStartedAt: dayjs(new Date()),
    });
  }, [currentSong]);

  useEffect(() => {
    if (isSongListEmpty) {
      return;
    }
    setPlayerState((prev) => ({
      ...prev,
      playing: prev.playing,
    }));
  }, [selectedPlayList]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handlePlayerKeyPress(e, playerRef, setPlayerState);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setPlayerState, playerRef]);

  return (
    <div className={`fixed bottom-0 z-50`}>
      {!!playerState && (
        <>
          <Player
            playerState={playerState}
            setPlayerState={setPlayerState}
            playerRef={playerRef}
            songListIndex={playerState.currentSongListIndex}
            songList={selectedSongList}
            song={
              playerState &&
              selectedPlayList &&
              selectedPlayList?.songs &&
              selectedPlayList?.songs?.length > 0 &&
              selectedPlayList.songs[playerState.currentSongListIndex]?.url
                ? selectedPlayList.songs[playerState.currentSongListIndex].url
                : ""
            }
          />
          <PlayerController
            playerState={playerState}
            setPlayerState={setPlayerState}
            playerRef={playerRef}
            songListIndex={playerState.currentSongListIndex}
            playlist={selectedPlayList}
          />
        </>
      )}
    </div>
  );
};

export default PlayerContainer;
