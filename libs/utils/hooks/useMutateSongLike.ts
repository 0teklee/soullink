"use client";

import { useMutation, useQueryClient } from "react-query";
import { postSongLike } from "@/libs/utils/client/fetchers";
import { useSetRecoilState } from "recoil";
import { CommonLoginModalState } from "@/libs/recoil/atoms";

const useSongLike = () => {
  const queryClient = useQueryClient();
  const setLoginModal = useSetRecoilState(CommonLoginModalState);

  const { mutate } = useMutation({
    mutationFn: ({ songId, userId }: { songId: string; userId: string }) => {
      if (!userId || !userId) {
        throw new Error("User is not logged in");
      }
      return postSongLike({ songId, userId: userId || "" });
    },
    onSuccess: async () => {
      await queryClient.resetQueries();
    },
  });

  const songLikeMutate = (songId?: string, userId?: string) => {
    if (!userId) {
      setLoginModal(true);
      return;
    }

    if (!songId) {
      throw new Error("Song id is not provided");
      return;
    }

    mutate({ songId, userId });
  };

  return { songLikeMutate };
};

export default useSongLike;
