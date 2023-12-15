"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPlaylistLike } from "@/libs/utils/client/fetchers";
import { useRecoilState } from "recoil";
import { playlistState } from "@/libs/recoil/atoms";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE } from "@/libs/types/modalType";
import { Dispatch, SetStateAction } from "react";
import { formatPlaylistOptimisticSetter } from "@/libs/utils/client/commonUtils";

const UseMutatePlaylistLike = () => {
  const queryClient = useQueryClient();
  const { setModal: setLoginModal } = useSetModal();
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(playlistState);

  const { mutate } = useMutation({
    mutationFn: ({
      playlistId,
      userId,
      optimisticSetter,
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
        setSelectedPlaylist((prev) => {
          if (!prev) {
            return prev;
          }
          return formatPlaylistOptimisticSetter(userId, playlistId, prev);
        });
      }
    },
    onSuccess: async (res) => {
      await queryClient.refetchQueries({
        type: "all",
      });

      if (selectedPlaylist && selectedPlaylist.id === res.playlistId) {
        setSelectedPlaylist({
          ...selectedPlaylist,
          likedBy: res.likedBy,
        });
      }
    },
  });

  const playlistLikeMutate = (
    playlistId?: string,
    userId?: string,
    optimisticSetter?: Dispatch<SetStateAction<boolean>>,
  ) => {
    if (!userId) {
      setLoginModal(MODAL_TYPE.LOGIN);
      return;
    }

    if (!playlistId) {
      return;
    }

    mutate({ playlistId, userId, optimisticSetter });
  };

  return { playlistLikeMutate };
};

export default UseMutatePlaylistLike;
