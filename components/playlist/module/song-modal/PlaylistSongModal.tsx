import React, { useState } from "react";
import { SONG_URL_TYPE, SongType } from "@/libs/types/song&playlistType";
import { formatIsSongCustomUrlValid } from "@/libs/utils/client/formatter";
import {
  SONG_AVAIL_CUSTOM_URL,
  SONG_DEFAULT_VALUE,
} from "@/libs/utils/client/commonValues";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MODAL_TYPE, SongModalPropsType } from "@/libs/types/modalType";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import {
  PlaylistEditPropsState,
  SongModalPropsState,
} from "@/libs/recoil/modalAtoms";
import SubmitPage from "@/components/playlist/module/song-modal/SubmitPage";
import YoutubeSearchPage from "@/components/playlist/module/song-modal/YoutubeSearchPage";

const PlaylistSongModal = ({
  songModalProps: { isEdit },
}: {
  songModalProps: SongModalPropsType;
}) => {
  const playlistEditProps = useRecoilValue(PlaylistEditPropsState);
  const setSongModalProps = useSetRecoilState(SongModalPropsState);

  const { userId, playlistData } = playlistEditProps || {};
  const { setModal, setModalOpenState } = useSetModal();

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

    setSongValue(SONG_DEFAULT_VALUE);

    setSongModalProps((prev) => ({
      ...prev,
      modalSong: songValue,
    }));

    if (isEdit && playlistData && userId) {
      setModal(MODAL_TYPE.PLAYLIST_EDIT, {
        userId,
        playlistData,
      });

      return;
    }
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
