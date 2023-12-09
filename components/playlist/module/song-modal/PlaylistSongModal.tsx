import React, { useState } from "react";
import { SONG_URL_TYPE, SongType } from "@/libs/types/song&playlistType";
import { formatIsSongCustomUrlValid } from "@/libs/utils/client/formatter";
import {
  SONG_AVAIL_CUSTOM_URL,
  SONG_DEFAULT_VALUE,
} from "@/libs/utils/client/commonValues";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  MODAL_TYPE,
  SongModalPropsType,
  UseModalStateMap,
} from "@/libs/types/modalType";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import SubmitPage from "@/components/playlist/module/song-modal/SubmitPage";
import YoutubeSearchPage from "@/components/playlist/module/song-modal/YoutubeSearchPage";

const PlaylistSongModal = () => {
  const { setModal, setModalOpenState, useModalState } = useSetModal();
  const [songModalProps, setSongModalProps] = useModalState<
    UseModalStateMap[MODAL_TYPE.SONG]
  >(MODAL_TYPE.SONG);

  const [playlistEditProps, setPlaylistEditProps] = useModalState<
    UseModalStateMap[MODAL_TYPE.PLAYLIST_EDIT]
  >(MODAL_TYPE.PLAYLIST_EDIT);

  const { isEdit } = songModalProps || {};
  const { userId, playlistData } = playlistEditProps || {};

  const [page, setPage] = useState("submit");
  const [songValue, setSongValue] = useState<SongType>(SONG_DEFAULT_VALUE);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [urlType, setUrlType] = useState<SONG_URL_TYPE>("");
  const [isAvailableCustomUrl, setIsAvailableCustomUrl] =
    useState<boolean>(true);

  const isUrlValid = formatIsSongCustomUrlValid(
    songValue.url,
    SONG_AVAIL_CUSTOM_URL,
  );

  const handleAddSong = () => {
    if (urlType === "custom" && !isUrlValid) {
      setIsAvailableCustomUrl(false);
      return;
    }

    if (songValue.title === "" || songValue.artist === "" || !songValue.url) {
      alert("Please fill title, artist and url of the song");
      return;
    }

    if (isEdit && playlistData && userId) {
      setModal(MODAL_TYPE.PLAYLIST_EDIT, {
        userId,
        playlistData,
        addedSongList: [...(playlistEditProps?.addedSongList ?? []), songValue],
      });
      return;
    }

    setSongModalProps((prev) => ({
      ...prev,
      modalSong: songValue,
    }));

    setModalOpenState(false);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`relative flex flex-col items-center justify-center gap-4 max-w-md p-5 xs:p-2 bg-white text-gray-700`}
    >
      <button
        onClick={() => {
          if (isEdit) {
            setModal(MODAL_TYPE.PLAYLIST_EDIT);
            return;
          }
          setModalOpenState(false);
        }}
        className={`absolute top-2 right-3 text-gray-400 text-base`}
      >
        <XMarkIcon className={`w-5 h-5`} />
      </button>
      {page === "submit" && (
        <SubmitPage
          urlType={urlType}
          setUrlType={setUrlType}
          songValue={songValue}
          setSongValue={setSongValue}
          handleAddSong={handleAddSong}
          isAvailableCustomUrl={isAvailableCustomUrl}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          setPage={setPage}
        />
      )}
      {page === "search" && (
        <YoutubeSearchPage
          songValue={songValue}
          setSongValue={setSongValue}
          urlType={urlType}
          setModalOpenState={setModalOpenState}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default PlaylistSongModal;
