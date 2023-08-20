import React, { Dispatch, RefObject, SetStateAction } from "react";
import { PlayerProps, PlayerState } from "@/types/common/playerTypes";

export const handleKeyPress = (
  e: React.KeyboardEvent | KeyboardEvent,
  targetRef: RefObject<PlayerProps>,
  setState: Dispatch<SetStateAction<PlayerState>>,
) => {
  console.log(e.key);
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
