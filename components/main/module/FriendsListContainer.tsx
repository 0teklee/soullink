import React from "react";
import Link from "next/link";
import { formatPathName } from "@/libs/utils/client/formatter";
import Image from "next/image";
import { PlaylistType } from "@/libs/types/song&playlistType";
import { playlistListDefault } from "@/libs/utils/client/contants/fallbackValues";

const FriendsListContainer = ({
  data = playlistListDefault,
}: {
  data?: PlaylistType[];
}) => {
  return (
    <div className={`flex flex-wrap items-start justify-start gap-3`}>
      {data?.map((item, index) => {
        return (
          <div
            key={`playlist_item_${item.id}_${index}`}
            className={`relative w-24 h-24 xs:w-16 xs:h-16 hover:bg-black hover:bg-opacity-30 cursor-pointer`}
          >
            <Link href={`/playlist/${formatPathName(item.title)}`}>
              <Image
                className={`object-cover`}
                src={item.coverImage || `/image/common/default_cover_image.svg`}
                alt={`playlist`}
                fill={true}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FriendsListContainer;
