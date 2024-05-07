import { PlayerType } from "@/libs/types/playerType";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { create } from "zustand";
import { CommonModalState } from "@/libs/types/modalType";
import {
  reduceCommonModal,
  reduceCommonModalOpen,
} from "@/libs/utils/client/commonUtils";
import { PLAYER_INIT_STATE } from "@/libs/utils/client/contants/commonValues";

export const playerGlobalStore = create<PlayerType>(() => ({
  ...PLAYER_INIT_STATE,
}));

export const selectedPlaylistStore = create<PlaylistType | null>((set) => null);

export const useDarkModeStore = create(() => false);

export const useModalStore = create<CommonModalState>((set) => ({
  isModalOpen: false,
  modalType: null,
  followModalProps: null,
  playlistEditModalProps: null,
  playlistDownloadModalProps: null,
  songTableModalProps: null,
  songModalProps: null,
  deleteModalProps: null,
  errorModalProps: null,
  setModal: (type, props) => {
    set((state) => reduceCommonModal(type, props, state));
  },
  setModalOpen: (isOpen) => {
    set((state) => reduceCommonModalOpen(isOpen, state));
  },
}));
