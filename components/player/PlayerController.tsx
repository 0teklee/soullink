import React, { Dispatch, RefObject, useEffect, useState } from "react";
import Image from "next/image";

import {
  PlayerListItem,
  PlayerProps,
  PlayerState,
} from "@/types/common/playerTypes";
import VolumeDropdown from "@/components/player/module/VolumeDropdown";
import ListMenuContainer from "@/components/player/module/ListMenuContainer";
import { handleKeyPress } from "@/utils/client/eventHandler";

const PlayerController = ({
  playerState,
  setPlayerState,
  playerRef,
  setSongListIndex,
  songList,
  songListIndex,
}: {
  playerState: PlayerState;
  setPlayerState: Dispatch<React.SetStateAction<PlayerState>>;
  playerRef: RefObject<PlayerProps>;
  songListIndex: number;
  setSongListIndex: Dispatch<React.SetStateAction<number>>;
  songList: PlayerListItem[];
}) => {
  const playerCur = playerRef?.current;

  const {
    playing,
    played,
    duration,
    muted,
    durationSec,
    playedSec,
    isLoading,
  } = playerState;

  const [isVolumeDropdownOpen, setIsVolumeDropdownOpen] = useState(false);
  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);

  const isListFirst = songListIndex === 0;
  const isListLast = songListIndex === songList.length - 1;

  const handlePrev = () => {
    playerCur?.seekTo(playerCur?.getCurrentTime() - 3);
  };

  const handleNext = () => {
    playerCur?.seekTo(playerCur?.getCurrentTime() + 3);
  };

  const handlePrevList = () => {
    if (songListIndex === 0) {
      return;
    }
    setSongListIndex((prev) => prev - 1);
  };

  const handleNextList = () => {
    if (songListIndex === songList.length - 1) {
      return;
    }
    setSongListIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (songListIndex === songList.length - 1 || songListIndex === 0) {
      return;
    }

    setPlayerState({ ...playerState, playing: true });
  }, []);

  return (
    <div
      className={`absolute bottom-0 w-screen px-5 py-3 bg-white border-t-[1px] border-gray-200 xs:py-3 xs:px-2`}
    >
      <input
        type={`text`}
        className={`fixed hidden`}
        onKeyDown={(e) => {
          handleKeyPress(e, playerRef, setPlayerState);
        }}
      />
      <div className={`flex items-center justify-between gap-6 px-5 xs:px-0`}>
        <div
          className={`flex items-center max-w-5xl gap-2 xs:flex-0 xs:w-sm xs:gap-4`}
        >
          {!isListFirst && (
            <button className={`xs:hidden`} onClick={handlePrevList}>
              <Image
                src={`/image/player/prev_song.svg`}
                width={24}
                height={24}
                alt={`prev`}
              />
            </button>
          )}
          <button
            className={`xs:hidden`}
            onClick={() => {
              handlePrev();
            }}
          >
            <Image
              src={`/image/player/prev.svg`}
              width={24}
              height={24}
              alt={`prev`}
            />
          </button>
          <button
            onClick={() => {
              setPlayerState({ ...playerState, playing: !playing });
            }}
          >
            {playing ? (
              <Image
                src={`/image/player/pause.svg`}
                width={24}
                height={24}
                alt={`play`}
              />
            ) : (
              <Image
                src={`/image/player/play.svg`}
                width={24}
                height={24}
                alt={`play`}
              />
            )}
          </button>

          <button className={`xs:hidden`} onClick={handleNext}>
            <Image
              src={`/image/player/next.svg`}
              width={24}
              height={24}
              alt={`next`}
            />
          </button>
          {!isListLast && (
            <button className={`xs:hidden`} onClick={handleNextList}>
              <Image
                src={`/image/player/next_song.svg`}
                width={24}
                height={24}
                alt={`next`}
              />
            </button>
          )}
          <div
            className={`relative flex items-center`}
            onMouseEnter={() => {
              setIsVolumeDropdownOpen(true);
            }}
          >
            <button
              onClick={() => {
                setPlayerState({ ...playerState, muted: !muted });
              }}
            >
              <Image
                src={`/image/player/${!muted ? "volume.svg" : "mute.svg"}`}
                width={24}
                height={24}
                alt={`volume`}
              />
            </button>
            {isVolumeDropdownOpen && (
              <VolumeDropdown
                playerState={playerState}
                setPlayerState={setPlayerState}
                setIsVolumeDropdownOpen={setIsVolumeDropdownOpen}
              />
            )}
          </div>
        </div>
        <div
          className={`flex-1 flex items-center justify-evenly gap-4 xs:flex-0 xs:order-3 xs:gap-0 xs:max-w-fit xs:pr-3`}
        >
          <p className={`text-xs text-gray-900 whitespace-nowrap`}>
            {isLoading ? `loading..` : `${played} / ${duration}`}
          </p>
          <input
            className={`relative w-full h-2 mx-10 rounded-lg xs:hidden focus:appearance-none range`}
            type={`range`}
            value={playedSec}
            max={durationSec}
            onChange={(e) => {
              playerCur?.seekTo(Number(e.target.value));
            }}
          />
        </div>
        <button className={`xs:hidden`}>
          <Image
            src={`/image/player/repeat.svg`}
            width={24}
            height={24}
            alt={`repeat`}
          />
        </button>
        <div
          className={`flex items-center justify-evenly gap-2 xs:justify-start xs:flex-1 xs:gap-3`}
        >
          <div className={`album_cover w-6 h-6 bg-gray-300 xs:hidden`} />
          <div className={`relative flex items-center`}>
            <button
              className={`xs:order-2 xs:flex-2`}
              onClick={() => {
                setIsListDropdownOpen(!isListDropdownOpen);
              }}
            >
              <Image
                src={`/image/player/list.svg`}
                alt={`playlists`}
                width={24}
                height={24}
              />
            </button>
            {isListDropdownOpen && (
              <ListMenuContainer
                curIndex={songListIndex}
                songList={songList}
                setCurIndex={setSongListIndex}
              />
            )}
          </div>
          <div
            className={`whitespace-nowrap xs:order-1 xs:flex-1 xs:text-center`}
          >
            <p className={`text-xs text-gray-900 font-medium`}>
              {songList[songListIndex].title}
            </p>
            <p className={`text-xs text-gray-600 font-normal xs:hidden`}>
              {songList[songListIndex].artist}
            </p>
          </div>
          <div className={`flex items-center gap-2 xs:order-2 xs:flex-2`}>
            <button className={`xs:hidden`}>
              <Image
                src={`/image/player/list_like.svg`}
                alt={`playlists_like`}
                width={24}
                height={24}
              />
            </button>
            <button>
              <Image
                src={`/image/player/song_like.svg`}
                alt={`like`}
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerController;
