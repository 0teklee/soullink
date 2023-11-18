"use client";

import { useMutation, useQueryClient } from "react-query";
import { postPlaylistLike } from "@/libs/utils/client/fetchers";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CommonLoginModalState, playlistState } from "@/libs/recoil/atoms";

const UseMutatePlaylistLike = () => {
  const queryClient = useQueryClient();
  const setLoginModal = useSetRecoilState(CommonLoginModalState);
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(playlistState);

  const { mutate, data: playlistLikeRes } = useMutation({
    mutationFn: ({
      playlistId,
      userId,
    }: {
      playlistId: string;
      userId: string;
    }) => postPlaylistLike({ playlistId, userId }),
    onSuccess: async (res) => {
      await queryClient.invalidateQueries();

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
      setLoginModal(true);
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
