import React, { useState } from "react";
import VolumeDropdown from "@/components/player/module/VolumeDropdown";
import usePlayerState from "@/components/player/usePlayerState";
import Image from "next/image";
import { playerGlobalStore, selectedPlaylistStore } from "@/libs/store";

const PlayerLeftControl = () => {
  const [isVolumeDropdownOpen, setIsVolumeDropdownOpen] = useState(false);

  const { playerRef } = usePlayerState();

  const { playing, muted, currentSongListIndex } = playerGlobalStore(
    (state) => ({
      playing: state.playing,
      muted: state.muted,
      currentSongListIndex: state.currentSongListIndex,
    }),
  );

  const selectedSongList = selectedPlaylistStore((state) => state?.songs || []);

  const playerCur = playerRef?.current;

  const isListFirst = currentSongListIndex === 0;
  const isListLast = currentSongListIndex === selectedSongList.length - 1;

  const handlePlayPause = () => {
    playerGlobalStore.setState((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const handlePrev = () => {
    playerCur?.seekTo(playerCur?.getCurrentTime() - 3);
  };

  const handleNext = () => {
    playerCur?.seekTo(playerCur?.getCurrentTime() + 3);
  };

  const handlePrevList = () => {
    if (currentSongListIndex === 0) {
      return;
    }
    playerGlobalStore.setState((prev) => ({
      ...prev,
      currentSongListIndex: prev.currentSongListIndex - 1,
    }));
  };

  const handleNextList = () => {
    if (currentSongListIndex === selectedSongList.length - 1) {
      return;
    }
    playerGlobalStore.setState((prev) => ({
      ...prev,
      currentSongListIndex: prev.currentSongListIndex + 1,
    }));
  };

  return (
    <div
      className={`flex items-center max-w-5xl gap-2 xs:flex-0 xs:w-sm xs:gap-4`}
    >
      {!isListFirst && (
        <button
          className={`hidden lg:block`}
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
        className={`hidden lg:block`}
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
        className={`hidden lg:block`}
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
          className={`hidden lg:block`}
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
      <div
        className={`relative flex items-center`}
        onMouseEnter={() => {
          setIsVolumeDropdownOpen(true);
        }}
      >
        <button
          aria-label={`volume`}
          onClick={() => {
            playerGlobalStore.setState((prev) => ({ ...prev, muted: !muted }));
          }}
        >
          <Image
            className={`dark:invert`}
            src={`/image/player/${!muted ? "volume.svg" : "mute.svg"}`}
            width={24}
            height={24}
            alt={`volume`}
          />
        </button>
        {isVolumeDropdownOpen && (
          <VolumeDropdown setIsVolumeDropdownOpen={setIsVolumeDropdownOpen} />
        )}
      </div>
    </div>
  );
};

export default PlayerLeftControl;
