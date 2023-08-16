import React, { Dispatch, RefObject } from "react";
import Image from "next/image";

import { PlayerProps, PlayerState } from "@/types/common/playerTypes";
import { secondsFormatter } from "@/utils/client/formatter";

const PlayerController = (props: {
  playerState: PlayerState;
  setPlayerState: Dispatch<React.SetStateAction<PlayerState>>;
  playerRef: RefObject<PlayerProps>;
}) => {
  const { playerState, setPlayerState, playerRef } = props;
  const {
    playing,
    played,
    duration,
    seeking,
    volume,
    muted,
    durationSec,
    playedSec,
  } = playerState;
  const playerCur = playerRef?.current;

  const handlePrev = () => {
    playerCur?.seekTo(playerCur?.getCurrentTime() - 3);
  };

  const handleNext = () => {
    playerCur?.seekTo(playerCur?.getCurrentTime() + 3);
  };
  return (
    <div
      className={`absolute bottom-0 w-screen px-5 py-3 bg-white xs:py-3 xs:px-2`}
    >
      <div className={`flex items-center justify-between gap-6 px-5 xs:px-0`}>
        <div
          className={`flex items-center max-w-5xl gap-2 xs:flex-0 xs:w-sm xs:gap-4`}
        >
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
          <button
            className={`xs:hidden`}
            onKeyDown={(e) => {
              console.log("next", e);
              e.code === "ArrowRight" && handleNext();
            }}
            onClick={() => {
              handleNext();
            }}
          >
            <Image
              src={`/image/player/next.svg`}
              width={24}
              height={24}
              alt={`next`}
            />
          </button>
          <button>
            <Image
              src={`/image/player/volume.svg`}
              width={24}
              height={24}
              alt={`volume`}
            />
          </button>
        </div>
        <div
          className={`flex-1 flex items-center justify-evenly gap-4 xs:flex-0 xs:order-3 xs:gap-0 xs:max-w-fit xs:pr-3`}
        >
          <p className={`text-xs text-gray-900 whitespace-nowrap`}>
            {played} / {duration}
          </p>
          <input
            className={`relative w-full h-0.5 mx-10 xs:hidden bg-gray-300`}
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
          <button className={`xs:order-2 xs:flex-2`}>
            <Image
              src={`/image/player/list.svg`}
              alt={`playlists`}
              width={24}
              height={24}
            />
          </button>
          <div
            className={`whitespace-nowrap xs:order-1 xs:flex-1 xs:text-center`}
          >
            <p
              className={`text-xs text-gray-900 font-medium`}
            >{`Song Title`}</p>
            <p className={`text-xs text-gray-600 font-normal xs:hidden`}>
              artist name
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
