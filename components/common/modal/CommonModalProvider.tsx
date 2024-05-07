"use client";

import React from "react";
import CommonLoginModal from "@/components/common/modal/CommonLoginModal";
import DetailEditModal from "@/components/playlist/detail/module/DetailEditModal";
import CommonModal from "@/components/common/modal/CommonModal";
import PlaylistSongModal from "@/components/playlist/module/song-modal/PlaylistSongModal";
import CommentDeleteModal from "@/components/common/comments/CommentDeleteModal";
import CommonErrorModal from "@/components/common/modal/CommonErrorModal";
import ShareDownloadModal from "@/components/playlist/module/share-download-modal/ShareDownloadModal";
import SearchModal from "@/components/common/search/SearchModal";
import UserFollowModal from "@/components/user/module/UserFollowModal";
import CommonSongTableModal from "@/components/common/modal/CommonSongTableModal";
import { MODAL_TYPE } from "@/libs/types/modalType";
import { useModalStore } from "@/libs/store";

const CommonModalProvider = () => {
  const isModalOpen = useModalStore((state) => state.isModalOpen);
  const modalType = useModalStore((state) => state.modalType);
  const setModalOpen = useModalStore((state) => state.setModalOpen);

  return (
    <CommonModal isModalOpen={isModalOpen} setIsModalOpen={setModalOpen}>
      {modalType === MODAL_TYPE.LOGIN && <CommonLoginModal />}
      {modalType === MODAL_TYPE.FOLLOW && <UserFollowModal />}
      {modalType === MODAL_TYPE.PLAYLIST_EDIT && <DetailEditModal />}
      {modalType === MODAL_TYPE.PLAYLIST_DOWNLOAD && <ShareDownloadModal />}
      {modalType === MODAL_TYPE.SEARCH && <SearchModal />}
      {modalType === MODAL_TYPE.SONG_TABLE && <CommonSongTableModal />}
      {modalType === MODAL_TYPE.SONG && <PlaylistSongModal />}
      {modalType === MODAL_TYPE.DELETE && <CommentDeleteModal />}
      {modalType === MODAL_TYPE.ERROR && <CommonErrorModal />}
    </CommonModal>
  );
};

export default CommonModalProvider;
