import React from "react";
import SongTable from "@/components/common/song/table/SongTable";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE, UseModalStateMap } from "@/libs/types/modalType";

const CommonSongTableModal = () => {
  const { useModalState } = useSetModal();
  const [songTableProps] = useModalState<
    UseModalStateMap[MODAL_TYPE.SONG_TABLE]
  >(MODAL_TYPE.SONG_TABLE);
  const { songs, userId } = songTableProps || {};
  return (
    <div className={`w-[650px] py-4 overflow-y-scroll xs:w-screen `}>
      <SongTable songList={songs || []} isCreate={false} userId={userId} />
    </div>
  );
};

export default CommonSongTableModal;
