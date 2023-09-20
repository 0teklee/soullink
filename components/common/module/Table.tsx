"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { CreateSongType, SongType } from "@/types/common/Song&PlaylistType";
import Image from "next/image";
import { HeartIcon, MinusCircleIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useMutation } from "react-query";
import { postSongLike } from "@/libs/utils/client/fetchers";
import CommonLoginModal from "@/components/common/modal/CommonLoginModal";
import { useRouter } from "next/navigation";

const Table = ({
  songList,
  isCreate,
  setSongList,
  propsUserId,
}: {
  songList: SongType[] | CreateSongType[];
  isCreate?: boolean;
  setSongList?: Dispatch<SetStateAction<CreateSongType[]>>;
  propsUserId?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isNotCreate = !isCreate;
  const isLogin = !!propsUserId;
  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: ({ songId, userId }: { songId: string; userId: string }) =>
      postSongLike({ songId, userId: userId || "" }),
  });

  const handleLikeSong = async (songId: string, userId?: string) => {
    if (!userId || !isLogin) {
      setIsModalOpen(true);
      return;
    }

    mutate(
      { songId, userId },
      {
        onSuccess: () => {
          router.refresh();
        },
      },
    );
  };

  return (
    <>
      <div className={`self-stretch px-5 xs:px-0`}>
        <table className={`w-full px-12 table-auto`}>
          <thead className={`border-b border-gray-300`}>
            <tr className={`text-gray-500 text-lg`}>
              <th
                className={`text-start opacity-0 ${isNotCreate && "xs:hidden"}`}
              >
                no.
              </th>
              <th
                className={`text-start font-light ${
                  isNotCreate && "xs:hidden"
                }`}
              >
                TITLE
              </th>
              <th
                className={`text-start font-light ${
                  isNotCreate && "xs:hidden"
                }`}
              >
                ARTIST
              </th>
              {isNotCreate && (
                <>
                  <th className={`text-start opacity-0 xs:hidden`}>
                    Like & Add
                  </th>
                  <th className={`text-start font-light xs:hidden`}>PLAYED</th>
                  <th className={`text-start opacity-0 xs:hidden`}>PLAY</th>
                </>
              )}
              {isCreate && (
                <th className={`w-0 opacity-0 xs:hidden`}>Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {songList?.map((item, index) => {
              const isUserLikedSong =
                item?.likedUsers &&
                item?.likedUsers?.filter(
                  (likedItem) => likedItem.userId === propsUserId,
                ).length > 0;
              return (
                <tr
                  key={`song_item_${item.title}_${index}`}
                  className={`text-gray-500 text-base xs:text-sm border-b-[1px] border-gray-200 hover:text-white hover:bg-black hover:bg-opacity-30 cursor-pointer`}
                >
                  <td className={`py-2 pl-2 xs:hidden`}>{index + 1}</td>
                  <td className={`py-2`}>
                    <div className={`flex flex-col gap-0.5`}>
                      <p>{item.title}</p>
                      {"likedCount" in item && isNotCreate && (
                        <p className={`text-xs`}>{item.likedCount} likes</p>
                      )}
                    </div>
                  </td>
                  <td className={`py-2`}>{item.artist}</td>
                  {"playedCount" in item && isNotCreate && (
                    <>
                      <td className={`py-2`}>
                        <div className={`flex items-center gap-3`}>
                          <button className={`relative w-6 h-6`}>
                            {isUserLikedSong ? (
                              <HeartIconSolid
                                className={`w-full h-full text-primary`}
                                onClick={() => {
                                  handleLikeSong(item.id, propsUserId);
                                }}
                              />
                            ) : (
                              <HeartIcon
                                className={`w-full h-full text-gray-500`}
                                onClick={() => {
                                  handleLikeSong(item.id, propsUserId);
                                }}
                              />
                            )}
                          </button>
                          <button className={`relative w-6 h-6`}>
                            <Image
                              fill={true}
                              src="/image/common/plus.svg"
                              alt="add"
                            />
                          </button>
                        </div>
                      </td>
                      <td className={`py-2 xs:hidden`}>{item.playedCount}</td>
                      <td className={`py-2 xs:hidden`}>
                        <button className={`relative w-6 h-6`}>
                          <Image
                            fill={true}
                            src="/image/player/play.svg"
                            alt="like"
                          />
                        </button>
                      </td>
                    </>
                  )}
                  {isCreate && setSongList && (
                    <td className={`flex items-center py-2 xs:hidden`}>
                      <button
                        className={`relative top-0.5 text-gray-500 text-sm font-medium`}
                        onClick={() => {
                          setSongList((prev) =>
                            prev.filter((_, idx) => idx !== index),
                          );
                        }}
                      >
                        <MinusCircleIcon
                          className={` hover:text-gray-100`}
                          width={20}
                          height={20}
                        />
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        {(!songList || songList.length === 0) && (
          <div
            className={`flex flex-col items-center justify-center w-full h-full mt-2`}
          >
            <p className={`text-gray-400 text-lg font-normal`}>No songs yet.</p>
          </div>
        )}
      </div>
      <CommonLoginModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

export default Table;
