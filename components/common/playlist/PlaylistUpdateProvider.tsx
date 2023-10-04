"use client";

import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { playlistState } from "@/libs/recoil/playerAtom";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";

const PlaylistUpdateProvider = <T,>({
  propsData,
  children,
}: {
  propsData: PlaylistType | PlaylistType[];
  children: React.ReactNode;
}) => {
  const setSelectedPlaylist = useSetRecoilState(playlistState);
  useEffect(() => {
    setSelectedPlaylist((prev) => {
      if (Array.isArray(propsData)) {
        const findSelectedPlaylist = propsData.find(
          (playlist) => playlist.id === prev?.id,
        );
        if (!findSelectedPlaylist) {
          return prev;
        }
        return findSelectedPlaylist;
      }
      if (!prev || prev.id !== propsData.id) {
        return prev;
      }
      return propsData;
    });
  }, [propsData]);
  return <>{children}</>;
};

export default PlaylistUpdateProvider;
