"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import PlayerController from "@/components/player/PlayerController";
import { handleKeyPress } from "@/libs/utils/client/eventHandler";
import { PlayerProps } from "@/libs/types/common/Song&PlaylistType";
import { useRecoilValue } from "recoil";
import { playlistState } from "@/libs/recoil/playlistAtom";

const Player = dynamic(() => import("@/components/player/Player"), {
  ssr: false,
});

const PlayerContainer = () => {
  const selectedPlayList = useRecoilValue(playlistState);
  const selectedSongList = selectedPlayList?.songs || [];
  const isSongListEmpty = selectedSongList.length === 0;

  const [playerState, setPlayerState] = useState({
    playing: false,
    played: "00:00",
    duration: "00:00",
    playedSec: 0,
    durationSec: 0,
    volume: 0.8,
    muted: false,
    seeking: false,
    isLoading: !isSongListEmpty,
  });

  const [songListIndex, setSongListIndex] = useState(0);

  const playerRef = useRef<PlayerProps>(null);

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
            setSongListIndex={setSongListIndex}
            songListIndex={songListIndex}
            songList={selectedSongList}
            song={
              selectedSongList.length > 0
                ? selectedSongList[songListIndex].url
                : ""
            }
          />
          <PlayerController
            playerState={playerState}
            setPlayerState={setPlayerState}
            playerRef={playerRef}
            setSongListIndex={setSongListIndex}
            songListIndex={songListIndex}
            playlist={selectedPlayList}
          />
        </>
      )}
    </div>
  );
};

export default PlayerContainer;
