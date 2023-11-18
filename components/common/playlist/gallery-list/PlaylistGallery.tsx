"use client";

import React, { useState } from "react";
import { PlaylistType, SongType } from "@/libs/types/song&playlistType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPathName } from "@/libs/utils/client/formatter";
import CommonModal from "@/components/common/modal/CommonModal";
import CommonSongModal from "@/components/common/modal/CommonSongModal";

const PlaylistGallery = ({ playlists }: { playlists?: PlaylistType[] }) => {
  const router = useRouter();

  const [selectedSongs, setSelectedSongs] = useState<SongType[]>([]);
  const [isSongModalOpen, setIsSongModalOpen] = useState(false);

  return (
    <>
      <div className={`flex flex-wrap w-full gap-3 items-center justify-start`}>
        {playlists?.map((playlist, index) => {
          return (
            <div
              onClick={() => {
                router.push(`/playlist/${formatPathName(playlist.title)}`);
              }}
              key={`gallery_item_${index}_${playlist.title}`}
              className={`relative w-48 h-48 lg:w-32 lg:h-32 xs:w-20 xs:h-20 group`}
            >
              <Image
                className={`object-cover`}
                src={
                  playlist?.coverImage ||
                  `/image/common/default_cover_image.svg`
                }
                alt={`${playlist.title}_${index}`}
                fill={true}
              />
              <div
                className={`absolute top-0 left-0 flex flex-col items-center justify-center gap-3 w-full h-full p-2 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100`}
              >
                <div
                  className={`flex flex-col gap-1 items-center justify-center`}
                >
                  <button
                    className={`text-white text-sm font-semibold lg:text-xs hover:text-primary`}
                  >
                    {playlist.title}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const formattedNickname = formatPathName(
                        playlist.author.nickname,
                      );
                      router.push(`/user/${formattedNickname}`);
                    }}
                    className={`text-white text-xs underline hover:text-primary`}
                  >
                    {playlist.author.nickname}
                  </button>
                </div>
                <div
                  className={`flex flex-col items-center gap-3 cursor-pointer`}
                >
                  <button
                    className={`text-white text-xs font-medium hover:text-primary`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSongs(playlist.songs);
                      setIsSongModalOpen(true);
                    }}
                  >
                    {playlist.songs.length} songs
                  </button>
                  <div className={`flex items-center gap-2 text-white text-xs`}>
                    <p>{playlist?.likedCount} likes</p>
                    <p>{playlist?.playedCount} played</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {!!playlists && playlists.length === 0 && (
          <div className={`flex items-center justify-center w-full h-full`}>
            <p className={`text-gray-500 text-sm`}>No playlist</p>
          </div>
        )}
      </div>

      <CommonModal
        isModalOpen={isSongModalOpen}
        setIsModalOpen={setIsSongModalOpen}
      >
        <CommonSongModal
          songs={selectedSongs}
          setIsModalOpen={setIsSongModalOpen}
        />
      </CommonModal>
    </>
  );
};

export default PlaylistGallery;
