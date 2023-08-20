"use client";

import React, { useEffect, useRef, useState } from "react";
import { PlayerListItem, PlayerProps } from "@/types/common/playerTypes";
import dynamic from "next/dynamic";
import PlayerController from "@/components/player/PlayerController";
import { handleKeyPress } from "@/utils/client/eventHandler";

const Player = dynamic(() => import("@/components/player/Player"), {
  ssr: false,
});

const PlayerContainer = () => {
  const songList: PlayerListItem[] = [
    {
      id: "first_list_1",
      listId: 0,
      artist: "Sade",
      title: "Smooth Operator Smooth Operator Smooth Operator",
      url: "https://www.youtube.com/watch?v=4TYv2PhG89A",
    },
    {
      id: "first_list_2",
      listId: 1,
      artist: "Utata Hikaru",
      title: "In My Room",
      url: "https://soundcloud.com/gum_mp3/in-my-room-utada-hikaru-db-garage-mix?si=7329048ff1f8437cb3f775d34b745e38&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing",
    },
  ];

  const [playerState, setPlayerState] = useState({
    playing: false,
    played: "00:00",
    duration: "00:00",
    playedSec: 0,
    durationSec: 0,
    volume: 0.8,
    muted: false,
    seeking: false,
  });

  const [songListIndex, setSongListIndex] = useState(0);

  const playerRef = useRef<PlayerProps>(null);

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
    <div>
      <Player
        playerState={playerState}
        setPlayerState={setPlayerState}
        playerRef={playerRef}
        song={songList[songListIndex].url}
      />
      <PlayerController
        playerState={playerState}
        setPlayerState={setPlayerState}
        playerRef={playerRef}
        songList={songList}
        setSongListIndex={setSongListIndex}
        songListIndex={songListIndex}
      />
    </div>
  );
};

export default PlayerContainer;
