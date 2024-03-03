import React, { memo } from "react";
import Image from "next/image";

interface PlayerLeftButtonsProps {
  playing: boolean;
  isListFirst: boolean;
  isListLast: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  handlePrevList: () => void;
  handleNextList: () => void;
  handlePlayPause: () => void;
}

const PlayerLeftButtons = ({
  playing,
  isListFirst,
  isListLast,
  handlePrev,
  handleNext,
  handlePrevList,
  handleNextList,
  handlePlayPause,
}: PlayerLeftButtonsProps) => {
  return (
    <>
      {!isListFirst && (
        <button
          className={`xs:hidden`}
          aria-label={`previous song`}
          onClick={handlePrevList}
        >
          <Image
            className={`dark:invert`}
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
        aria-label={`previous 3 seconds`}
      >
        <Image
          className={`dark:invert`}
          src={`/image/player/prev.svg`}
          width={24}
          height={24}
          alt={`prev`}
        />
      </button>
      <button onClick={handlePlayPause} aria-label={`play or pause`}>
        {playing ? (
          <Image
            className={`dark:invert`}
            src={`/image/player/pause.svg`}
            width={24}
            height={24}
            alt={`play`}
          />
        ) : (
          <Image
            className={`dark:invert`}
            src={`/image/player/play.svg`}
            width={24}
            height={24}
            alt={`play`}
          />
        )}
      </button>
      <button
        aria-label={`next 3 seconds`}
        className={`xs:hidden`}
        onClick={handleNext}
      >
        <Image
          className={`dark:invert`}
          src={`/image/player/next.svg`}
          width={24}
          height={24}
          alt={`next`}
        />
      </button>
      {!isListLast && (
        <button
          aria-label={`next song`}
          className={`xs:hidden`}
          onClick={handleNextList}
        >
          <Image
            className={`dark:invert`}
            src={`/image/player/next_song.svg`}
            width={24}
            height={24}
            alt={`next`}
          />
        </button>
      )}
    </>
  );
};

export default memo(PlayerLeftButtons);
