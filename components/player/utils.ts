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

  switch (e.key) {
    case " ":
      e.preventDefault();
      setPlayerState((prev) => {
        return { ...prev, playing: !prev.playing };
      });
      break;
    case "ArrowLeft":
      e.preventDefault();
      playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() - 3);
      break;
    case "ArrowRight":
      e.preventDefault();
      playerRef?.current?.seekTo(playerRef?.current?.getCurrentTime() + 3);
      break;
    case "ArrowUp":
      e.preventDefault();
      setPlayerState((prev) => ({ ...prev, volume: prev.volume + 0.1 }));
      break;
    case "ArrowDown":
      e.preventDefault();
      setPlayerState((prev) => ({ ...prev, volume: prev.volume - 0.1 }));
      break;
  }
};
export default handlePlayerKeyPress;
