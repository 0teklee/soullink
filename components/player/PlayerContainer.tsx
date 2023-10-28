"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import PlayerController from "@/components/player/PlayerController";
import { handleKeyPress } from "@/libs/utils/client/eventHandler";
import { PlayerProps } from "@/libs/types/common/Song&PlaylistType";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState } from "@/libs/recoil/playlistAtom";
import { playerGlobalState } from "@/libs/recoil/playerAtom";
import useSongCountUpdater from "@/libs/utils/hooks/useSongCountUpdater";
import dayjs from "dayjs";

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
      playing: true,
    }));
  }, [selectedPlayList]);

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      handleKeyPress(e, playerRef, setPlayerState);
    });
    return () => {
      document.removeEventListener("keydown", (e: KeyboardEvent) => {
        handleKeyPress(e, playerRef, setPlayerState);
      });
    };
  }, []);

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
              selectedPlayList?.songs.length > 0 &&
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
