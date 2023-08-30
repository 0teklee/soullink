import React from "react";
import { SongType } from "@/types/common/playlistType";
import Image from "next/image";

const Table = ({
  songList,
  isCreate,
}: {
  songList: SongType[];
  isCreate?: boolean;
}) => {
  const isNotCreate = !isCreate;
  return (
    <div className={`self-stretch px-5 xs:px-0`}>
      <table className={`w-full px-12 table-auto`}>
        <thead className={`border-b border-gray-300`}>
          <tr className={`text-gray-500 text-lg`}>
            <th className={`text-start opacity-0 xs:hidden`}>no.</th>
            <th className={`text-start font-light xs:hidden`}>TITLE</th>
            <th className={`text-start font-light xs:hidden`}>Artist</th>
            {isNotCreate && (
              <>
                <th className={`text-start opacity-0 xs:hidden`}>Like & Add</th>
                <th className={`text-start font-light xs:hidden`}>PLAYED</th>
                <th className={`text-start opacity-0 xs:hidden`}>PLAY</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {songList.map((item, index) => {
            return (
              <tr
                key={`song_item_${item.id}_${index}`}
                className={`text-gray-500 text-base xs:text-sm border-b-[1px] border-gray-200 hover:text-white hover:bg-black hover:bg-opacity-30 cursor-pointer`}
              >
                <td className={`py-2 pl-2 xs:hidden`}>{index + 1}</td>
                <td className={`py-2`}>
                  <div className={`flex flex-col gap-0.5`}>
                    <p>{item.title}</p>
                    {isNotCreate && (
                      <p className={`text-xs`}>{item.likedCount} likes</p>
                    )}
                  </div>
                </td>
                <td className={`py-2`}>{item.artist}</td>
                {isNotCreate && (
                  <>
                    <td className={`py-2`}>
                      <div className={`flex items-center gap-3`}>
                        <button className={`relative w-6 h-6`}>
                          <Image
                            fill={true}
                            src="/image/player/song_like.svg"
                            alt="like"
                          />
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
