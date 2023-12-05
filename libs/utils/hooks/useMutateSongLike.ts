"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSongLike } from "@/libs/utils/client/fetchers";
import { useRecoilState } from "recoil";
import { playlistState } from "@/libs/recoil/atoms";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE } from "@/libs/types/modalType";

const useSongLike = () => {
  const queryClient = useQueryClient();
  const { setModal: setLoginModal } = useSetModal();
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(playlistState);

  const { mutate } = useMutation({
    mutationFn: ({ songId, userId }: { songId: string; userId: string }) => {
      if (!userId || !userId) {
        throw new Error("User is not logged in");
      }
      return postSongLike({ songId, userId: userId || "" });
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

  const songLikeMutate = (songId?: string, userId?: string) => {
    if (!userId) {
      setLoginModal(MODAL_TYPE.LOGIN);
      return;
    }

    if (!songId) {
      throw new Error("Song id is not provided");
    }

    mutate({ songId, userId });
  };

  return { songLikeMutate };
};

export default useSongLike;
