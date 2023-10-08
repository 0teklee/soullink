import React, { RefObject } from "react";
import { PlayerProps } from "@/libs/types/common/Song&PlaylistType";
import { SetterOrUpdater } from "recoil";
import { PlayerType } from "@/libs/types/common/playerType";

export const handleKeyPress = (
  e: React.KeyboardEvent<Document> | KeyboardEvent,
  targetRef: RefObject<PlayerProps>,
  setState?: SetterOrUpdater<PlayerType>,
) => {
  if (!setState) {
    return;
  }

  if (
    e.target instanceof Element &&
    (e?.target?.tagName === "INPUT" || e?.target?.tagName === "TEXTAREA")
  ) {
    return;
  }

  switch (e.key) {
    case " ":
      e.preventDefault();
      setState((prev) => ({ ...prev, playing: !prev.playing }));
      break;
    case "ArrowLeft":
      e.preventDefault();
      targetRef?.current?.seekTo(targetRef?.current?.getCurrentTime() - 3);
      break;
    case "ArrowRight":
      e.preventDefault();
      targetRef?.current?.seekTo(targetRef?.current?.getCurrentTime() + 3);
      break;
    case "ArrowUp":
      e.preventDefault();
      setState((prev) => ({ ...prev, volume: prev.volume + 0.1 }));
      break;
    case "ArrowDown":
      e.preventDefault();
      setState((prev) => ({ ...prev, volume: prev.volume - 0.1 }));
      break;
  }
};
