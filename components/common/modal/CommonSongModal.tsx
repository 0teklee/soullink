import React, { Dispatch, SetStateAction } from "react";
import { SongType } from "@/libs/types/song&playlistType";
import SongTable from "@/components/common/song/table/SongTable";

const CommonSongModal = ({
  songs,
  setIsModalOpen,
}: {
  songs: SongType[];
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className={`w-[650px] py-4 overflow-y-scroll xs:w-screen `}>
      <SongTable
        songList={songs}
        isCreate={false}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default CommonSongModal;
