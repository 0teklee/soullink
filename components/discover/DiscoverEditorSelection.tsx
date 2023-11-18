"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import { PlaylistType } from "@/libs/types/song&playlistType";
import FullImageCardContainer from "@/components/common/carousel/full-img/FullImageCardContainer";
import { useQuery } from "react-query";
import { getEditorPlaylists } from "@/libs/utils/client/fetchers";
import {
  QUERY_CACHE_TIME,
  QUERY_STALE_TIME,
} from "@/libs/utils/client/commonValues";

const DiscoverEditorSelection = ({
  editorPlaylists,
}: {
  editorPlaylists?: PlaylistType[];
}) => {
  const { data } = useQuery({
    queryKey: ["editorPlaylists"],
    queryFn: () => getEditorPlaylists(),
    initialData: editorPlaylists,
    cacheTime: QUERY_CACHE_TIME,
    staleTime: QUERY_STALE_TIME,
  });

  return (
    <div className={`mb-[260px] xs:mb-[180px]`}>
      <div className={`flex flex-col gap-4 h-full min-h-[200px]`}>
        <div className={`flex items-center justify-start gap-2`}>
          <Title size={`h1`} text={`Featured Playlists`} />
        </div>
        <div className={`mt-12 absolute left-0 bg-white`}>
          <FullImageCardContainer playlists={data} />
        </div>
      </div>
    </div>
  );
};

export default DiscoverEditorSelection;
