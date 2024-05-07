import React, { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import useMutatePlaylistLike from "@/libs/utils/hooks/useMutatePlaylistLike";
import useMutateSongLike from "@/libs/utils/hooks/useMutateSongLike";
import { MODAL_TYPE } from "@/libs/types/modalType";
import useClickOutside from "@/libs/utils/hooks/useClickOutside";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ListMenuContainer from "@/components/player/module/ListMenuContainer";
import usePlayerState from "@/components/player/usePlayerState";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import { useModalStore } from "@/libs/store";

const PlayerRightControl = () => {
  const listDropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: userSession } = useSession() as { data: UserSessionType };
  const { userId } = userSession || "";

  const { currentSongListIndex, selectedPlayList, currentSong } =
    usePlayerState();

  const isUserPlaylistLiked =
    !!selectedPlayList?.likedBy &&
    selectedPlayList?.likedBy.filter((likeItem) => likeItem.userId === userId)
      .length > 0;

  const isUserSongLiked =
    currentSong &&
    currentSong?.likedUsers &&
    currentSong?.likedUsers?.filter((likeItem) => likeItem.userId === userId)
      .length > 0;

  const {
    songs: songList,
    id: playlistId,
    coverImage,
  } = selectedPlayList || {
    songs: [],
    id: "",
  };

  const [isListDropdownOpen, setIsListDropdownOpen] = useState(false);
  const [isSongLiked, setIsSongLiked] = useState(!!isUserSongLiked);
  const [isPlaylistLiked, setIsPlaylistLiked] = useState(isUserPlaylistLiked);

  const setModal = useModalStore((state) => state.setModal);

  const { playlistLikeMutate } = useMutatePlaylistLike(
    playlistId,
    userId,
    setIsPlaylistLiked,
  );

  const { songLikeMutate } = useMutateSongLike(
    currentSong.id,
    userId,
    setIsSongLiked,
  );

  const handleLikePlaylist = () => {
    playlistLikeMutate();
  };

  const handleLikeSong = async () => {
    if (!userId) {
      setModal(MODAL_TYPE.LOGIN);
      return;
    }

    songLikeMutate();
  };

  const handleListDropdownOutside = () => {
    setIsListDropdownOpen(false);
  };

  useClickOutside({ ref: listDropdownRef, handler: handleListDropdownOutside });

  useEffect(() => {
    if (isUserSongLiked) {
      setIsSongLiked(true);
    }
    if (isUserPlaylistLiked) {
      setIsPlaylistLiked(true);
    }

    if (!isUserSongLiked) {
      setIsSongLiked(false);
    }
    if (!isUserPlaylistLiked) {
      setIsPlaylistLiked(false);
    }
  }, [playlistId, router]);

  return (
    <div
      className={`flex items-center justify-evenly gap-2 xs:justify-start xs:flex-1 xs:gap-3`}
    >
      {/*<button className={`xs:hidden`}>*/}
      {/*  <Image*/}
      {/*    src={`/image/player/repeat.svg`}*/}
      {/*    width={24}*/}
      {/*    height={24}*/}
      {/*    alt={`repeat`}*/}
      {/*  />*/}
      {/*</button>*/}
      <div
        className={`album_cover relative w-8 h-8 bg-gray-300 overflow-hidden  xs:hidden`}
      >
        <Image
          className={`object-cover rounded`}
          src={coverImage || `/image/common/default_cover_image.svg`}
          fill={true}
          alt={`album_cover`}
        />
      </div>
      <div className={`relative flex items-center`}>
        <button
          className={`xs:order-2 xs:flex-2`}
          aria-label={`playlist`}
          onClick={() => {
            if (!songList.length) {
              return;
            }
            setIsListDropdownOpen(!isListDropdownOpen);
          }}
        >
          <Image
            className={`dark:invert`}
            src={`/image/player/list.svg`}
            alt={`playlists`}
            width={24}
            height={24}
          />
        </button>
        {isListDropdownOpen && (
          <div ref={listDropdownRef}>
            <ListMenuContainer
              playlist={selectedPlayList}
              curIndex={currentSongListIndex}
              songList={songList}
            />
          </div>
        )}
      </div>
      <div
        className={`max-w-[200px] overflow-x-hidden xs:max-w-[90px] xs:order-1 xs:flex-1 xs:text-center`}
      >
        <p
          className={`sideways-scroll text-xs text-gray-900 dark:text-gray-100 font-medium`}
        >
          {currentSong?.title}
        </p>
        <p
          className={`sideways-scroll text-xs text-gray-600 dark:text-gray-50 font-normal xs:hidden`}
        >
          {currentSong?.artist}
        </p>
      </div>
      <div className={`flex items-center gap-2 xs:order-2 xs:flex-2`}>
        <button
          aria-label={`like playlist`}
          className={`xs:hidden`}
          onClick={handleLikePlaylist}
        >
          {!selectedPlayList?.isSongTable && isPlaylistLiked && (
            <Image
              className={`dark:invert`}
              src={`/image/common/playlist_liked.svg`}
              alt={`playlist_liked`}
              width={24}
              height={24}
            />
          )}
          {!selectedPlayList?.isSongTable && !isPlaylistLiked && (
            <Image
              className={`dark:invert`}
              src={`/image/common/playlist_like.svg`}
              alt={`playlist_like`}
              width={24}
              height={24}
            />
          )}
        </button>
        <button aria-label={`like song`} onClick={handleLikeSong}>
          {isSongLiked ? (
            <SolidHeartIcon className={`text-primary`} width={24} height={24} />
          ) : (
            <HeartIcon
              className={`text-gray-400 bg-white dark:text-gray-50 dark:bg-black`}
              width={24}
              height={24}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default PlayerRightControl;
