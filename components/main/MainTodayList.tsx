import React from "react";
import Title from "@/components/common/module/Title";
import CardCarouselContainer from "@/components/common/playlist/card-carousel/CardCarouselContainer";
import { getMainPageTodayPlaylists } from "@/libs/utils/client/fetchers";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";

const MainTodayList = async () => {
  const data = await getMainPageTodayPlaylists();
  return (
    <section className={`flex flex-col items-start gap-3 w-full`}>
      <Title size={`h1`} text={`Today's Playlists`} />
      <ReactQueryErrorBoundary>
        {data && data.length > 0 && <CardCarouselContainer playlists={data} />}
        {data && data.length === 0 && (
          <Title size={`h2`} text={`No playlists yet`} />
        )}
      </ReactQueryErrorBoundary>
    </section>
  );
};

export default MainTodayList;
