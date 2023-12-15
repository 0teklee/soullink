"use client";

import React, { useEffect } from "react";
import CommonLoginModal from "@/components/common/modal/CommonLoginModal";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { MODAL_TYPE } from "@/libs/types/modalType";
import DetailEditModal from "@/components/playlist/detail/module/DetailEditModal";
import CommonModal from "@/components/common/modal/CommonModal";
import PlaylistSongModal from "@/components/playlist/module/song-modal/PlaylistSongModal";
import CommentDeleteModal from "@/components/common/comments/CommentDeleteModal";
import {
  CommonModalState,
  CommonModalTypeState,
  DeleteModalPropsState,
  ErrorModalPropsState,
  PlaylistEditPropsState,
  PlaylistShareDownloadPropsState,
  SongModalPropsState,
} from "@/libs/recoil/modalAtoms";
import CommonErrorModal from "@/components/common/modal/CommonErrorModal";
import ShareDownloadModal from "@/components/playlist/module/share-download-modal/ShareDownloadModal";
import SearchModal from "@/components/common/search/SearchModal";

const CommonModalProvider = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(CommonModalState);
  const modalTypeState = useRecoilValue(CommonModalTypeState);
  const setPlaylistEditModalProps = useSetRecoilState(PlaylistEditPropsState);
  const setPlaylistShareModalProps = useSetRecoilState(
    PlaylistShareDownloadPropsState,
  );
  const setSongModalProps = useSetRecoilState(SongModalPropsState);
  const setDeleteModalProps = useSetRecoilState(DeleteModalPropsState);
  const setErrorModalProps = useSetRecoilState(ErrorModalPropsState);

  const isLoginModal = modalTypeState === MODAL_TYPE.LOGIN;
  const isPlaylistEditModal = modalTypeState === MODAL_TYPE.PLAYLIST_EDIT;
  const isPlaylistShareDownloadModal =
    modalTypeState === MODAL_TYPE.PLAYLIST_DOWNLOAD;
  const isSearchModal = modalTypeState === MODAL_TYPE.SEARCH;

  const isSongModal = modalTypeState === MODAL_TYPE.SONG;
  const isDeleteModal = modalTypeState === MODAL_TYPE.DELETE;
  const isErrorModal = modalTypeState === MODAL_TYPE.ERROR;

  useEffect(() => {
    if (!isModalOpen && isPlaylistEditModal) {
      setPlaylistEditModalProps(null);
    }
    if (!isModalOpen && isPlaylistShareDownloadModal) {
      setPlaylistShareModalProps(null);
    }
    if (!isModalOpen && isSongModal) {
      setSongModalProps(null);
    }
    if (!isModalOpen && isDeleteModal) {
      setDeleteModalProps(null);
    }
    if (!isModalOpen && isErrorModal) {
      setErrorModalProps(null);
    }
  }, [isModalOpen]);

  return (
    <CommonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      {isLoginModal && <CommonLoginModal />}
      {isPlaylistEditModal && <DetailEditModal />}
      {isPlaylistShareDownloadModal && <ShareDownloadModal />}
      {isSearchModal && <SearchModal />}
      {isSongModal && <PlaylistSongModal />}
      {isDeleteModal && <CommentDeleteModal />}
      {isErrorModal && <CommonErrorModal />}
    </CommonModal>
  );
};

export default CommonModalProvider;
