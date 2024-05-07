import React from "react";
import { PlayerProps, SongType } from "@/libs/types/song&playlistType";
import { playerGlobalStore } from "@/libs/store";

export const handleSourceSet = (
  currentIndex?: number,
  songList?: SongType[],
) => {
  if (currentIndex === undefined || songList === undefined) {
    return;
  }
  const sourceSet = songList
    .slice(currentIndex, songList.length)
    .map((song) => {
      return {
        src: song.url,
      };
    });

  return sourceSet;
};

const handlePlayerKeyPress = (
  e: React.KeyboardEvent<Document> | KeyboardEvent,
  playerRef: React.RefObject<PlayerProps>,
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
      playerGlobalStore.setState((prev) => {
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
      playerGlobalStore.setState((prev) => ({
        ...prev,
        volume: prev.volume + 0.1,
      }));
      break;
    case "ArrowDown":
      e.preventDefault();
      playerGlobalStore.setState((prev) => ({
        ...prev,
        volume: prev.volume - 0.1,
      }));
      break;
  }
};
export default handlePlayerKeyPress;
