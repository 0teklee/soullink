"use client";

import React, { useState } from "react";
import Title from "@/components/common/module/Title";
import Image from "next/image";
import Table from "@/components/common/module/Table";
import PlaylistModal from "@/components/playlistCreate/PlaylistModal";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  CreatePlaylistType,
  CreateSongType,
} from "@/types/common/Song&PlaylistType";
import { handleImageUpload } from "@/libs/utils/client/ImageUpload";

const queryClient = new QueryClient();

const PlaylistCreateTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [songList, setSongList] = useState<CreateSongType[]>([]);
  const [payload, setPayload] = useState<CreatePlaylistType>({
    title: "",
    description: "",
    coverImage: "",
    songs: songList,
  });

  const handlePayloadImgUpload = (imgUrl: string) => {
    setPayload((prev) => ({
      ...prev,
      coverImage: imgUrl,
    }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <section
        className={`flex flex-col items-center justify-center gap-10 xs:py-5 py-12`}
      >
        <Title size={`h1`} text={`Create Playlist`} />
        <div
          className={`flex flex-col items-center justify-center cursor-pointer`}
        >
          <p className={`mb-3 text-gray-500 text-base font-normal`}>
            add cover
          </p>
          <div
            onClick={() => {
              handleImageUpload(handlePayloadImgUpload);
            }}
            className={`relative flex items-center justify-center w-[300px] h-[300px] bg-gray-100 border border-gray-300 rounded-xl`}
          >
            {!payload.coverImage && (
              <Image
                src={`/image/common/plus.svg`}
                width={36}
                height={36}
                alt={`add cover`}
              />
            )}
            {payload.coverImage && (
              <Image
                className={`object-cover`}
                src={`${payload.coverImage}`}
                fill={true}
                alt={`add cover`}
              />
            )}
          </div>
        </div>
        <Table songList={songList} isCreate={true} />
        <button
          className={`flex items-center gap-1`}
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={`/image/common/plus.svg`}
            width={24}
            height={24}
            alt={`plus`}
          />
          <span className={`text-gray-400`}>add</span>
        </button>
        <div
          className={`flex flex-col items-start w-full pr-12 xs:pr-0 xs:w-[300px] xs:items-center xs:justify-center`}
        >
          <Title size={`h2`} text={`Playlist Title`} />
          <input
            placeholder={`playlist title`}
            className={`w-full max-w-3xl h-full mt-3 px-5 py-2 text-gray-900 bg-white border border-gray-300 resize-none rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          />
        </div>
        <div
          className={`flex flex-col items-start w-full pr-12 xs:pr-0 xs:w-[300px] xs:items-center xs:justify-center`}
        >
          <Title size={`h2`} text={`Description`} />
          <textarea
            placeholder={`..for playlist`}
            className={`w-full h-full max-w-3xl min-h-[200px] mt-3 px-5 pt-2 text-gray-900 bg-white border border-gray-300 resize-none rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
          />
        </div>
        {isModalOpen && (
          <PlaylistModal
            setModalOpen={setIsModalOpen}
            setSongList={setSongList}
          />
        )}
      </section>
    </QueryClientProvider>
  );
};

export default PlaylistCreateTemplate;
