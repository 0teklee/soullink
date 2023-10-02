import React from "react";
import { CreatePlaylistType } from "@/libs/types/common/Song&PlaylistType";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

const PlaylistCreateSubmit = ({
  payload,
  isPayloadValid,
}: {
  payload: CreatePlaylistType;
  isPayloadValid: boolean;
}) => {
  const router = useRouter();

  const fetcherCreatePlaylist = async () => {
    const res = await fetch(`/api/playlist/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
        // TODO : userId 는 세션에서 가져오도록 수정
        userId: "966cd2cd-3cad-4e95-8ff1-451bad286fdf",
      }),
    });
    const data = await res.json();
    return data;
  };

  const { mutate } = useMutation(fetcherCreatePlaylist, {
    onSuccess: (data) => {
      router.push(`/playlist/${data.playlistTitle.replace(" ", "-")}`);
    },
  });

  return (
    <div>
      <button
        className={`px-5 py-2 rounded-xl text-white text-lg font-medium bg-primary disabled:bg-gray-300`}
        disabled={!isPayloadValid}
        onClick={() => {
          mutate();
        }}
      >
        submit
      </button>
    </div>
  );
};

export default PlaylistCreateSubmit;
