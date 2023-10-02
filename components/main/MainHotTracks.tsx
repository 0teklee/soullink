"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import Table from "@/components/common/module/Table";
import { SongType } from "@/libs/types/common/Song&PlaylistType";
import { UserSessionType } from "@/libs/types/common/userType";
import { useSession } from "next-auth/react";

const MainHotTracks = ({ songList }: { songList: SongType[] }) => {
  const { data: session } = useSession() as { data: UserSessionType };
  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title size={`h1`} text={`Popular Tracks`} />
      <Table songList={songList} userId={session?.userId} />
    </section>
  );
};

export default MainHotTracks;
