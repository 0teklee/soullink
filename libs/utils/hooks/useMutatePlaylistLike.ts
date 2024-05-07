"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPlaylistLike } from "@/libs/utils/client/fetchers";
import { selectedPlaylistStore, useModalStore } from "@/libs/store";
import { MODAL_TYPE } from "@/libs/types/modalType";
import { Dispatch, SetStateAction } from "react";
import { formatPlaylistOptimisticSetter } from "@/libs/utils/client/commonUtils";
import useTimer from "@/libs/utils/hooks/useTimer";
import { useStore } from "zustand";

const UseMutatePlaylistLike = (
  playlistId?: string,
  userId?: string,
  optimisticSetter?: Dispatch<SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  const setModal = useModalStore((state) => state.setModal);
  const selectedPlaylist = useStore(selectedPlaylistStore);

  const { mutate } = useMutation({
    mutationFn: ({
      playlistId,
      userId,
    }: {
      playlistId: string;
      userId: string;
      optimisticSetter?: Dispatch<SetStateAction<boolean>>;
    }) => postPlaylistLike({ playlistId, userId }),
    onMutate: ({ playlistId, userId, optimisticSetter }) => {
      if (optimisticSetter) {
        optimisticSetter((prev) => !prev);
      }

      if (userId && selectedPlaylist && selectedPlaylist.id === playlistId) {
        selectedPlaylistStore.setState((prev) => {
          if (!prev) {
            return prev;
          }
          return {
            ...formatPlaylistOptimisticSetter(userId, playlistId, prev),
          };
        });
      }
    },
    onSuccess: async (res) => {
      await queryClient.refetchQueries({
        type: "all",
      });

      if (selectedPlaylist && selectedPlaylist.id === res.playlistId) {
        selectedPlaylistStore.setState((prev) => {
          return { ...prev, likedBy: res.likedBy };
        });
      }
    },
  });

  const playlistLikeHandler = () => {
    if (!userId) {
      setModal(MODAL_TYPE.LOGIN);
      return;
    }

    if (!playlistId) {
      return;
    }

    mutate({ playlistId, userId, optimisticSetter });
  };

  const { timer, resetTimer } = useTimer(() => {
    playlistLikeHandler();
  }, 300);

  const playlistLikeMutate = () => {
    resetTimer(timer);
  };

  return { playlistLikeMutate };
};

export default UseMutatePlaylistLike;
