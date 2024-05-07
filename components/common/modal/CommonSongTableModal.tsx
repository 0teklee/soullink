import React from "react";
import SongTable from "@/components/common/song/table/SongTable";
import { useModalStore } from "@/libs/store";

const CommonSongTableModal = () => {
  const songTableProps = useModalStore((state) => state.songTableModalProps);

  const { songs, userId } = songTableProps || {};
  return (
    <div className={`w-[650px] py-4 overflow-y-scroll xs:w-screen `}>
      <SongTable songList={songs || []} isCreate={false} userId={userId} />
    </div>
  );
};

export default CommonSongTableModal;
