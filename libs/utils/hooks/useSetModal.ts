import {
  DeleteModalPropsType,
  ErrorModalPropsType,
  MODAL_TYPE,
  PlaylistEditPropsType,
  SongModalPropsType,
} from "@/libs/types/modalType";
import { useSetRecoilState } from "recoil";

import {
  CommonModalState,
  CommonModalTypeState,
  DeleteModalPropsState,
  ErrorModalPropsState,
  PlaylistEditPropsState,
  SongModalPropsState,
} from "@/libs/recoil/modalAtoms";

const useSetModal = () => {
  const setModalOpenState = useSetRecoilState(CommonModalState);
  const setModalTypeState = useSetRecoilState(CommonModalTypeState);
  const setPlaylistEditProps = useSetRecoilState(PlaylistEditPropsState);
  const setSongModalProps = useSetRecoilState(SongModalPropsState);
  const setDeleteModalProps = useSetRecoilState(DeleteModalPropsState);
  const setErrorModalProps = useSetRecoilState(ErrorModalPropsState);

  const setModal = (
    type_input: MODAL_TYPE,
    setModalProps?:
      | PlaylistEditPropsType
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
      case MODAL_TYPE.PLAYLIST_EDIT:
        setPlaylistEditProps(setModalProps as PlaylistEditPropsType);
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

  return { setModal, setModalOpenState };
};

export default useSetModal;
