import React from "react";
import { CreatePlaylistType } from "@/libs/types/song&playlistType";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { postCreatePlaylist } from "@/libs/utils/client/fetchers";
import { formatPathName } from "@/libs/utils/client/formatter";
import { useSetRecoilState } from "recoil";
import { CommonLoginModalState } from "@/libs/recoil/atoms";

const PlaylistCreateSubmit = ({
  payload,
  isPayloadValid,
  userId,
}: {
  payload: CreatePlaylistType;
  isPayloadValid: boolean;
  userId?: string;
}) => {
  const router = useRouter();
  const setLoginModalOpen = useSetRecoilState(CommonLoginModalState);

  const { mutate } = useMutation({
    mutationFn: () => {
      if (!userId) {
        throw Error("need login");
      }
      return postCreatePlaylist(payload, userId);
    },
    onSuccess: (data) => {
      router.push(`/playlist/${formatPathName(data.playlistTitle)}`);
    },
  });

  return (
    <div>
      <button
        className={`px-5 py-2 rounded-xl text-white text-lg font-medium bg-primary disabled:bg-gray-300`}
        disabled={!isPayloadValid}
        onClick={() => {
          if (!userId) {
            setLoginModalOpen(true);
            return;
          }
          mutate();
        }}
      >
        submit
      </button>
    </div>
  );
};

export default PlaylistCreateSubmit;
