import {
  DeleteModalPropsType,
  ErrorModalPropsType,
  FollowModalPropsType,
  MODAL_TYPE,
  PlaylistEditPropsType,
  ShareDownloadModalPropsType,
  SongModalPropsType,
  SongTableModalPropsType,
} from "@/libs/types/modalType";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  CommonModalState,
  CommonModalTypeState,
  DeleteModalPropsState,
  ErrorModalPropsState,
  FollowPropsState,
  PlaylistEditPropsState,
  PlaylistShareDownloadPropsState,
  SongModalPropsState,
  SongTableModalPropsState,
} from "@/libs/recoil/modalAtoms";

const useSetModal = () => {
  const setModalOpenState = useSetRecoilState(CommonModalState);
  const setModalTypeState = useSetRecoilState(CommonModalTypeState);
  const [followModalState, setFollowProps] = useRecoilState(FollowPropsState);
  const [playlistEditModalState, setPlaylistEditProps] = useRecoilState(
    PlaylistEditPropsState,
  );
  const [playlistDownloadModalState, setPlaylistDownloadProps] = useRecoilState(
    PlaylistShareDownloadPropsState,
  );
  const [songTableModalState, setSongTableModalProps] = useRecoilState(
    SongTableModalPropsState,
  );
  const [songCreateEditModalState, setSongModalProps] =
    useRecoilState(SongModalPropsState);
  const [deleteModalState, setDeleteModalProps] = useRecoilState(
    DeleteModalPropsState,
  );
  const [errorModalState, setErrorModalProps] =
    useRecoilState(ErrorModalPropsState);

  const useModalState = <T>(type: MODAL_TYPE): T => {
    switch (type) {
      case MODAL_TYPE.FOLLOW:
        return [followModalState, setFollowProps] as T;
      case MODAL_TYPE.PLAYLIST_EDIT:
        return [playlistEditModalState, setPlaylistEditProps] as T;
      case MODAL_TYPE.SONG_TABLE:
        return [songTableModalState, setSongTableModalProps] as T;
      case MODAL_TYPE.SONG:
        return [songCreateEditModalState, setSongModalProps] as T;
      case MODAL_TYPE.DELETE:
        return [deleteModalState, setDeleteModalProps] as T;
      case MODAL_TYPE.ERROR:
        return [errorModalState, setErrorModalProps] as T;
      case MODAL_TYPE.PLAYLIST_DOWNLOAD:
        return [playlistDownloadModalState, setPlaylistDownloadProps] as T;
      default:
        return [null, null] as T;
    }
  };

  const setModal = (
    type_input: MODAL_TYPE,
    setModalProps?:
      | PlaylistEditPropsType
      | ShareDownloadModalPropsType
      | FollowModalPropsType
      | SongTableModalPropsType
      | SongModalPropsType
      | DeleteModalPropsType
      | ErrorModalPropsType,
  ) => {
    setModalTypeState(type_input);
    setModalOpenState(true);

    if (!setModalProps || !type_input) {
      return;
    }

    switch (type_input) {
      case MODAL_TYPE.FOLLOW:
        setFollowProps(setModalProps as FollowModalPropsType);
        break;
      case MODAL_TYPE.PLAYLIST_EDIT:
        setPlaylistEditProps(setModalProps as PlaylistEditPropsType);
        break;
      case MODAL_TYPE.PLAYLIST_DOWNLOAD:
        setPlaylistDownloadProps(setModalProps as ShareDownloadModalPropsType);
        break;
      case MODAL_TYPE.SONG_TABLE:
        setSongTableModalProps(setModalProps as SongTableModalPropsType);
        break;
      case MODAL_TYPE.SONG:
        setSongModalProps(setModalProps as SongModalPropsType);
        break;
      case MODAL_TYPE.DELETE:
        setDeleteModalProps(setModalProps as DeleteModalPropsType);
        break;
      case MODAL_TYPE.ERROR:
        setErrorModalProps(setModalProps as ErrorModalPropsType);
        break;
      default:
        break;
    }
  };

  return { setModal, setModalOpenState, useModalState };
};

export default useSetModal;
