import React from "react";
import { PlayerProps } from "@/libs/types/song&playlistType";
import { SetterOrUpdater } from "recoil";
import { PlayerType } from "@/libs/types/playerType";

const handlePlayerKeyPress = (
  e: React.KeyboardEvent<Document> | KeyboardEvent,
  playerRef: React.RefObject<PlayerProps>,
  setPlayerState: SetterOrUpdater<PlayerType>,
) => {
  if (
    e.target instanceof Element &&
    (e?.target?.tagName === "INPUT" || e?.target?.tagName === "TEXTAREA")
  ) {
    return;
  }

  // e.preventDefault();

  switch (e.key) {
    case " ":
      setPlayerState((prev) => {
        return { ...prev, playing: !prev.playing };
      });
      break;
    case "ArrowLeft":
      playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 3);
      break;
    case "ArrowRight":
      playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() + 3);
      break;
    case "ArrowUp":
      setPlayerState((prev) => ({ ...prev, volume: prev.volume + 0.1 }));
      break;
    case "ArrowDown":
      setPlayerState((prev) => ({ ...prev, volume: prev.volume - 0.1 }));
      break;
  }
};
export default handlePlayerKeyPress;
