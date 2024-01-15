import React from "react";
import { getTimelinePlaylists } from "@/libs/utils/client/fetchers";
import Title from "@/components/common/module/Title";
import PlaylistListContainer from "@/components/common/playlist/column-list/PlaylistListContainer";

const MainTimeline = async ({ userId }: { userId?: string }) => {
  const data = await getTimelinePlaylists(userId);

  return (
    <section className={`flex flex-col items-start gap-3 w-full `}>
      <Title size={`h1`} text={`Timeline`} />
      {data && data.length > 0 && (
        <PlaylistListContainer playlists={data} isLarge={true} />
      )}
      {data && data.length === 0 && (
        <Title size={`h2`} text={`No playlists yet`} />
      )}
    </section>
  );
};

export default MainTimeline;
