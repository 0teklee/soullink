"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CreateSongType,
  PlaylistType,
  SongType,
} from "@/libs/types/common/Song&PlaylistType";

import { useMutation } from "react-query";
import { postSongLike } from "@/libs/utils/client/fetchers";
import CommonLoginModal from "@/components/common/modal/CommonLoginModal";
import { useRouter } from "next/navigation";
import TableItem from "@/components/common/songTable/TableItem";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/common/userType";

const Table = ({
  songList,
  isCreate,
  setSongList,
  playlist,
}: {
  songList: SongType[] | CreateSongType[];
  isCreate?: boolean;
  setSongList?: Dispatch<SetStateAction<CreateSongType[]>>;
  playlist?: PlaylistType;
}) => {
  const { data: session } = useSession() as { data: UserSessionType };
  const userId = session?.userId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isNotCreate = !isCreate;
  const isLogin = !!userId;
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

  useEffect(() => {
    router.refresh();
  }, [session]);

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
                  {isNotCreate && playlist && (
                    <th className={`text-start opacity-0 xs:hidden`}>PLAY</th>
                  )}
                </>
              )}
              {isCreate && (
                <th className={`w-0 opacity-0 xs:hidden`}>Delete</th>
              )}
            </tr>
          </thead>
          <tbody>
            {songList?.map((song, index) => {
              return (
                <TableItem
                  key={`${"id" in song ? song.id : "create_song"}-${index}}`}
                  song={song}
                  index={index}
                  isCreate={isCreate}
                  userId={userId}
                  playlist={playlist}
                  setSongList={setSongList}
                  handleLikeSong={handleLikeSong}
                />
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
