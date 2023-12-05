import React from "react";
import { PlaylistCreateRequestType } from "@/libs/types/song&playlistType";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { postCreatePlaylist } from "@/libs/utils/client/fetchers";
import { formatPathName } from "@/libs/utils/client/formatter";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE } from "@/libs/types/modalType";

const PlaylistCreateSubmit = ({
  payload,
  isPayloadValid,
  userId,
}: {
  payload: PlaylistCreateRequestType;
  isPayloadValid: boolean;
  userId?: string;
}) => {
  const router = useRouter();
  const { setModal } = useSetModal();

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
            setModal(MODAL_TYPE.LOGIN);
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
