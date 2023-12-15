"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSongLike } from "@/libs/utils/client/fetchers";
import { useRecoilState } from "recoil";
import { playlistState } from "@/libs/recoil/atoms";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE } from "@/libs/types/modalType";
import { Dispatch, SetStateAction } from "react";
import { formatSongOptimisticSetter } from "@/libs/utils/client/commonUtils";

const useSongLike = () => {
  const queryClient = useQueryClient();
  const { setModal: setLoginModal } = useSetModal();
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(playlistState);

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
        setSelectedPlaylist((prev) => {
          if (!prev) {
            return prev;
          }
          return formatSongOptimisticSetter(userId, songId, prev);
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
            setSelectedPlaylist({
              ...selectedPlaylist,
              songs: selectedPlaylist.songs.map((song) => {
                if (song.id === res.songId) {
                  return {
                    ...song,
                    likedUsers: res.likedUsers,
                  };
                }
                return song;
              }),
            });
          }
        });
    },
  });

  const songLikeMutate = (
    songId?: string,
    userId?: string,
    optimisticSetter?: Dispatch<SetStateAction<boolean>>,
  ) => {
    if (!userId) {
      setLoginModal(MODAL_TYPE.LOGIN);
      return;
    }

    if (!songId) {
      throw new Error("Song id is not provided");
    }

    mutate({ songId, userId, optimisticSetter });
  };

  return { songLikeMutate };
};

export default useSongLike;
