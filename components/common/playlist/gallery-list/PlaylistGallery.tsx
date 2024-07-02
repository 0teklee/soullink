"use client";

import React from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPathName } from "@/libs/utils/client/formatter";
import { MODAL_TYPE } from "@/libs/types/modalType";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import { useModalStore } from "@/libs/store";

const PlaylistGallery = ({ playlists }: { playlists?: PlaylistType[] }) => {
  const { data: session } = useSession() as { data: UserSessionType };
  const { userId } = session || {};
  const router = useRouter();
  const setModal = useModalStore((state) => state.setModal);

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
                      setModal(MODAL_TYPE.SONG_TABLE, {
                        songs: playlist.songs,
                        userId,
                      });
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
            <p className={`text-gray-500 dark:text-gray-50 text-sm`}>
              No playlist
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaylistGallery;
