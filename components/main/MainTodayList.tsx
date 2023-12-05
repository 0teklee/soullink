"use client";
import React from "react";
import Title from "@/components/common/module/Title";
import TopListContainter from "@/components/common/playlist/screen-width-slider/TopListContainter";
import { useQuery } from "@tanstack/react-query";
import { getMainPageTodayPlaylists } from "@/libs/utils/client/fetchers";

const MainTodayList = () => {
  const { data } = useQuery({
    queryKey: ["todayPlaylists"],
    queryFn: () => getMainPageTodayPlaylists(),
  });

  return (
    <section
      className={`flex flex-col items-start gap-3 w-full ${
        data && data.length > 0 && "mb-[340px]"
      } `}
    >
      <Title size={`h1`} text={`Today's Playlists`} />
      {data && data.length > 0 && <TopListContainter playlists={data} />}
      {data && data.length === 0 && (
        <Title size={`h2`} text={`No playlists yet`} />
      )}
    </section>
  );
};

export default MainTodayList;
