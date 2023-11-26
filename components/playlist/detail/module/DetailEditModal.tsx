"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  PlaylistCreateRequestType,
  PlaylistType,
  SongType,
} from "@/libs/types/song&playlistType";
import SongTable from "@/components/common/song/table/SongTable";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { handleImageUpload } from "@/libs/utils/client/commonUtils";
import PlaylistSongModal from "@/components/playlist/create/PlaylistSongModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postEditPlaylist } from "@/libs/utils/client/fetchers";
import { useRouter } from "next/navigation";
import {
  formatEditPlaylistValid,
  formatPathName,
} from "@/libs/utils/client/formatter";
import CommonModal from "@/components/common/modal/CommonModal";

const DetailEditModal = ({
  userId,
  playlistData,
  setIsEdit,
}: {
  userId: string;
  playlistData: PlaylistType;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    title,
    description,
    coverImage,
    songs,
    id: playlistId,
    mood,
    category,
  } = playlistData;

  const [isMaxSongList, setIsMaxSongList] = useState<boolean>(false);
  const [isSongModalOpen, setIsSongModalOpen] = useState<boolean>(false);
  const [editPayload, setEditPayload] = useState<PlaylistCreateRequestType>({
    title,
    description,
    coverImage,
    songs,
    mood: mood.name,
    categories: category.map((item) => item.name),
  });
  const [songList, setSongList] = useState<SongType[]>(songs || []);

  const { mutate: mutatePlaylistEdit } = useMutation({
    mutationFn: () => postEditPlaylist(editPayload, userId, playlistId),
    onSuccess: async (res) => {
      if (res.playlistTitle === title) {
        await queryClient.refetchQueries({
          stale: true,
        });
        return;
      }
      router.push(`/playlist/${formatPathName(res.playlistTitle)}`);
      setIsEdit(false);
    },
  });

  const isValid = useMemo(() => {
    return formatEditPlaylistValid(editPayload, songList, userId, playlistId);
  }, [editPayload, songList, userId, playlistId]);

  const handlePayloadImgUpload = (imgUrl: string) => {
    setEditPayload((prev) => ({
      ...prev,
      coverImage: imgUrl,
    }));
  };

  const handleSubmit = (
    payload: PlaylistCreateRequestType,
    playlist_id: string,
    user_id: string,
  ) => {
    if (!user_id) {
      throw Error("need login");
    }
    if (!playlist_id) {
      throw Error("need playlist id");
    }
    mutatePlaylistEdit();
  };

  useEffect(() => {
    setEditPayload((prev) => ({
      ...prev,
      songs: songList,
    }));
  }, [songList]);

  return (
    <div
      className={`flex flex-col gap-y-6 items-center w-[calc(100vw-200px)] max-w-xl text-gray-700 xs:w-[calc(100vw-100px)]`}
    >
      <h1 className={`text-xl font-bold`}>Edit Playlist</h1>
      <div className={`flex flex-col gap-y-3 w-full`}>
        <label htmlFor={`title`} className={`text-sm font-medium`}>
          Title
        </label>
        <input
          type={`text`}
          id={`title`}
          className={`w-full px-4 py-2 bg-white ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary`}
          placeholder={`Title`}
          onChange={(e) => {
            setEditPayload((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
          value={editPayload.title}
          maxLength={40}
        />
      </div>
      <div className={`flex flex-col gap-y-3 w-full`}>
        <label htmlFor={`description`} className={`text-sm font-medium`}>
          Description
        </label>
        <textarea
          id={`description`}
          className={`w-full px-4 py-2 bg-white ring-1 ring-gray-300 rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-primary`}
          placeholder={`Description`}
          onChange={(e) => {
            setEditPayload((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
          value={editPayload.description}
        />
      </div>
      <div className={`flex flex-col gap-y-3 w-full`}>
        <label htmlFor={`coverImage`} className={`text-sm font-medium`}>
          Cover Image - click to change
        </label>
        <div
          onClick={() => {
            handleImageUpload(handlePayloadImgUpload);
          }}
          className={`relative flex w-32 h-32 cursor-pointer`}
        >
          <PhotoIcon
            className={`absolute top-0 right-1 text-gray-300 z-10`}
            width={32}
            height={32}
          />
          <Image
            src={
              editPayload.coverImage || `/image/common/default_cover_image.svg`
            }
            alt={`Cover Image`}
            fill={true}
            className={`object-cover rounded-md`}
          />
        </div>
      </div>
      <div className={`flex flex-col items-center gap-y-3 w-full`}>
        <label htmlFor={`songs`} className={`text-sm font-medium`}>
          Songs
        </label>
        {songs && (
          <SongTable
            songList={songList}
            setSongList={setSongList}
            setIsModalOpen={setIsEdit}
            userId={userId}
            isCreate={true}
          />
        )}
        <p
          className={`${
            isMaxSongList ? "text-pink-600" : "text-gray-300"
          } text-xs font-medium`}
        >
          *You can add up to 20 songs to the list
        </p>
        <button
          className={`flex items-center gap-1`}
          onClick={() => {
            if (songList.length >= 20) {
              setIsMaxSongList(true);
              return;
            }
            setIsSongModalOpen(true);
          }}
        >
          <Image
            src={`/image/common/plus.svg`}
            width={24}
            height={24}
            alt={`plus`}
          />
          <span className={`text-gray-400`}>add</span>
        </button>
      </div>
      <div className={`flex items-center justify-center gap-3 w-full`}>
        <button
          className={`flex items-center justify-center gap-3 px-4 py-2 text-sm font-medium text-pink-700 bg-white ring-1 ring-pink-700 rounded-md hover:bg-pink-700 hover:text-white`}
          onClick={() => {
            setIsEdit(false);
          }}
        >
          <p className={``}>Cancel</p>
        </button>
        <button
          disabled={!isValid}
          onClick={() => {
            setIsEdit(false);
            handleSubmit(editPayload, playlistId, userId);
          }}
          className={`flex items-center justify-center gap-3 px-4 py-2 text-primary ring-1 ring-primary hover:bg-primary hover:text-white rounded-md hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <p className={`text-sm font-medium`}>Save</p>
        </button>
      </div>
      {isSongModalOpen && (
        <div className={`z-20`}>
          <CommonModal
            isModalOpen={isSongModalOpen}
            setIsModalOpen={setIsSongModalOpen}
          >
            <PlaylistSongModal
              setModalOpen={setIsSongModalOpen}
              setSongList={setSongList}
              setPayload={setEditPayload}
            />
          </CommonModal>
        </div>
      )}
    </div>
  );
};

export default DetailEditModal;
