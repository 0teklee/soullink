"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPlaylistLike } from "@/libs/utils/client/fetchers";
import { useRecoilState } from "recoil";
import { playlistState } from "@/libs/recoil/atoms";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE } from "@/libs/types/modalType";

const UseMutatePlaylistLike = () => {
  const queryClient = useQueryClient();
  const { setModal: setLoginModal } = useSetModal();
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(playlistState);

  const { mutate } = useMutation({
    mutationFn: ({
      playlistId,
      userId,
    }: {
      playlistId: string;
      userId: string;
    }) => postPlaylistLike({ playlistId, userId }),
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

  const playlistLikeMutate = (playlistId?: string, userId?: string) => {
    if (!userId) {
      setLoginModal(MODAL_TYPE.LOGIN);
      return;
    }

    if (!playlistId) {
      return;
    }

    mutate({ playlistId, userId });
  };

  return { playlistLikeMutate };
};

export default UseMutatePlaylistLike;
