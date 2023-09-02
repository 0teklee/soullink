import React, { Dispatch, RefObject, SetStateAction } from "react";
import { PlayerProps, PlayerState } from "@/types/common/Song&PlaylistType";
import { useRouter } from "next/router";

export const handleKeyPress = (
  e: React.KeyboardEvent<Document> | KeyboardEvent,
  targetRef: RefObject<PlayerProps>,
  setState?: Dispatch<SetStateAction<PlayerState>>,
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
