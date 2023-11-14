"use client";

import React from "react";
import { useMutation } from "react-query";
import { postSongLike } from "@/libs/utils/client/fetchers";

const useSongLike = () => {
  const { mutate } = useMutation({
    mutationFn: ({ songId, userId }: { songId: string; userId: string }) => {
      if (!userId || !userId) {
        throw new Error("User is not logged in");
      }
      return postSongLike({ songId, userId: userId || "" });
    },
  });

  return { mutate };
};

export default useSongLike;
