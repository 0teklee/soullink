"use client";

import { useMutation, useQueryClient } from "react-query";
import { postSongLike } from "@/libs/utils/client/fetchers";
import { useRecoilState, useSetRecoilState } from "recoil";
import { CommonLoginModalState, playlistState } from "@/libs/recoil/atoms";

const useSongLike = () => {
  const queryClient = useQueryClient();
  const setLoginModal = useSetRecoilState(CommonLoginModalState);
  const [selectedPlaylist, setSelectedPlaylist] = useRecoilState(playlistState);

  const { mutate } = useMutation({
    mutationFn: ({ songId, userId }: { songId: string; userId: string }) => {
      if (!userId || !userId) {
        throw new Error("User is not logged in");
      }
      return postSongLike({ songId, userId: userId || "" });
    },
    onSuccess: async (res) => {
      await queryClient.invalidateQueries().then(() => {
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
