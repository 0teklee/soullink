"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSongLike } from "@/libs/utils/client/fetchers";
import { selectedPlaylistStore, useModalStore } from "@/libs/store";
import { MODAL_TYPE } from "@/libs/types/modalType";
import { Dispatch, SetStateAction } from "react";
import { formatSongOptimisticSetter } from "@/libs/utils/client/commonUtils";
import useTimer from "@/libs/utils/hooks/useTimer";
import { useStore } from "zustand";

const useSongLike = (
  songId?: string,
  userId?: string,
  optimisticSetter?: Dispatch<SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();
  const setModal = useModalStore((state) => state.setModal);
  const selectedPlaylist = useStore(selectedPlaylistStore);

  const { mutate } = useMutation({
    mutationFn: ({
      songId,
      userId,
    }: {
      songId: string;
      userId: string;
      optimisticSetter?: Dispatch<SetStateAction<boolean>>;
    }) => {
      if (!userId || !userId) {
        throw new Error("User is not logged in");
      }

      if (!songId) {
        throw new Error("Song id is not provided");
      }

      return postSongLike({ songId, userId: userId || "" });
    },
    onMutate: ({ songId, userId, optimisticSetter }) => {
      if (optimisticSetter) {
        optimisticSetter((prev) => !prev);
      }

      if (
        userId &&
        selectedPlaylist &&
        selectedPlaylist.songs.filter((song) => song.id === songId).length > 0
      ) {
        selectedPlaylistStore((prev) => {
          if (!prev) {
            return prev;
          }
          return {
            ...formatSongOptimisticSetter(userId, songId, prev),
          };
        });
      }
    },
    onSuccess: async (res) => {
      await queryClient
        .invalidateQueries({
          type: "all",
        })
        .then(() => {
          if (
            selectedPlaylist &&
            selectedPlaylist.songs.filter((song) => song.id === res.songId)
              .length > 0
          ) {
            selectedPlaylistStore((prev) => ({
              ...prev,
              songs: prev?.songs.map((song) => {
                if (song.id === res.songId) {
                  return {
                    ...song,
                    likedUsers: res.likedUsers,
                  };
                }
                return song;
              }),
            }));
          }
        });
    },
  });

  const songLikeHandler = () => {
    if (!userId) {
      setModal(MODAL_TYPE.LOGIN);
      return;
    }

    if (!songId) {
      throw new Error("Song id is not provided");
    }

    mutate({ songId, userId, optimisticSetter });
  };

  const { timer, resetTimer } = useTimer(() => {
    songLikeHandler();
  }, 300);

  const songLikeMutate = () => {
    resetTimer(timer);
  };

  return { songLikeMutate };
};

export default useSongLike;
