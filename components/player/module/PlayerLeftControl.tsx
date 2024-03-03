import React, { memo, useCallback, useState } from "react";
import VolumeDropdown from "@/components/player/module/VolumeDropdown";
import usePlayerState from "@/components/player/usePlayerState";
import Image from "next/image";
import PlayerLeftButtons from "@/components/player/module/PlayerLeftButtons";

interface PlayerLeftControlProps {
  handlePrevList: () => void;
  handleNextList: () => void;
  playing: boolean;
  muted: boolean;
}

const PlayerLeftControl = () => {
  const [isVolumeDropdownOpen, setIsVolumeDropdownOpen] = useState(false);

  const {
    setPlayerState,
    playerRef,
    songListIndex,
    playerState,
    selectedSongList,
  } = usePlayerState();

  const { playing, muted } = playerState;

  const isListFirst = songListIndex === 0;
  const isListLast = songListIndex === selectedSongList.length - 1;

  const playerCur = playerRef?.current;

  const handlePlayPause = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, playing: !prev.playing }));
  }, [setPlayerState]);

  const handlePrev = useCallback(() => {
    playerCur?.seekTo(playerCur?.getCurrentTime() - 3);
  }, [playerCur]);

  const handleNext = useCallback(() => {
    playerCur?.seekTo(playerCur?.getCurrentTime() + 3);
  }, [playerCur]);

  const handlePrevList = useCallback(() => {
    if (songListIndex === 0) {
      return;
    }
    setPlayerState((prev) => ({
      ...prev,
      currentSongListIndex: prev.currentSongListIndex - 1,
    }));
  }, [songListIndex, selectedSongList]);

  const handleNextList = useCallback(() => {
    if (songListIndex === selectedSongList.length - 1) {
      return;
    }
    setPlayerState((prev) => ({
      ...prev,
      currentSongListIndex: prev.currentSongListIndex + 1,
    }));
  }, [songListIndex, selectedSongList]);

  return (
    <div
      className={`flex items-center max-w-5xl gap-2 xs:flex-0 xs:w-sm xs:gap-4`}
    >
      <PlayerLeftButtons
        playing={playing}
        isListFirst={isListFirst}
        isListLast={isListLast}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handlePrevList={handlePrevList}
        handleNextList={handleNextList}
        handlePlayPause={handlePlayPause}
      />
      <div
        className={`relative flex items-center`}
        onMouseEnter={() => {
          setIsVolumeDropdownOpen(true);
        }}
      >
        <button
          aria-label={`volume`}
          onClick={() => {
            setPlayerState((prev) => ({ ...prev, muted: !muted }));
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

export default memo(PlayerLeftControl);
