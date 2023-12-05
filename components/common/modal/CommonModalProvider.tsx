"use client";

import React, { useEffect } from "react";
import CommonLoginModal from "@/components/common/modal/CommonLoginModal";
import { useRecoilState } from "recoil";
import { MODAL_TYPE } from "@/libs/types/modalType";
import DetailEditModal from "@/components/playlist/detail/module/DetailEditModal";
import CommonModal from "@/components/common/modal/CommonModal";
import PlaylistSongModal from "@/components/playlist/create/PlaylistSongModal";
import CommentDeleteModal from "@/components/common/comments/CommentDeleteModal";
import {
  CommonModalState,
  CommonModalTypeState,
  DeleteModalPropsState,
  ErrorModalPropsState,
  PlaylistEditPropsState,
  SongModalPropsState,
} from "@/libs/recoil/modalAtoms";
import CommonErrorModal from "@/components/common/modal/CommonErrorModal";

const CommonModalProvider = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(CommonModalState);
  const [modalTypeState, setModalTypeState] =
    useRecoilState(CommonModalTypeState);
  const [playlistEditModalProps, setPlaylistEditModalProps] = useRecoilState(
    PlaylistEditPropsState,
  );
  const [songModalProps, setSongModalProps] =
    useRecoilState(SongModalPropsState);
  const [deleteModalProps, setDeleteModalProps] = useRecoilState(
    DeleteModalPropsState,
  );
  const [errorModalProps, setErrorModalProps] =
    useRecoilState(ErrorModalPropsState);

  const isLoginModal = modalTypeState === MODAL_TYPE.LOGIN;

  const isPlaylistEditModal =
    modalTypeState === MODAL_TYPE.PLAYLIST_EDIT && !!playlistEditModalProps;
  const isSongModal = modalTypeState === MODAL_TYPE.SONG && !!songModalProps;
  const isDeleteModal =
    modalTypeState === MODAL_TYPE.DELETE && !!deleteModalProps;
  const isErrorModal = modalTypeState === MODAL_TYPE.ERROR && !!errorModalProps;

  useEffect(() => {
    if (!isModalOpen && isPlaylistEditModal) {
      setPlaylistEditModalProps(null);
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
      {isPlaylistEditModal && (
        <DetailEditModal editModalProps={playlistEditModalProps} />
      )}
      {isSongModal && <PlaylistSongModal songModalProps={songModalProps} />}
      {isDeleteModal && (
        <CommentDeleteModal deleteModalProps={deleteModalProps} />
      )}
      {isErrorModal && (
        <CommonErrorModal
          error={errorModalProps.error}
          resetErrorBoundary={errorModalProps?.resetErrorBoundary}
        />
      )}
    </CommonModal>
  );
};

export default CommonModalProvider;
