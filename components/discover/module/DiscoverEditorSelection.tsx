import React from "react";
import Title from "@/components/common/module/Title";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import FullImageCardContainer from "@/components/common/carousel/full-img/FullImageCardContainer";

const DiscoverEditorSelection = ({
  editorPlaylists,
}: {
  editorPlaylists?: PlaylistType[];
}) => {
  return (
    <div className={`mb-[260px] xs:mb-[180px]`}>
      <div className={`flex flex-col gap-4 h-full min-h-[200px]`}>
        <div className={`flex items-center justify-start gap-2`}>
          <Title size={`h1`} text={`Featured Playlists`} />
        </div>
        <div className={`mt-12 absolute left-0 bg-white`}>
          <FullImageCardContainer playlists={editorPlaylists} />
        </div>
      </div>
    </div>
  );
};

export default DiscoverEditorSelection;
