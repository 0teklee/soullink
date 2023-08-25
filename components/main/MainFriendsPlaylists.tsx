import React from "react";
import { PlaylistType } from "@/types/common/PlaylistType";
import Title from "@/components/common/module/Title";
import Link from "next/link";
import Image from "next/image";

const MainFriendsPlaylists = ({ playLists }: { playLists: PlaylistType[] }) => {
  return (
    <section className={`flex flex-col items-start w-full gap-4`}>
      <Title text={`Friends are listening to..`} size={`h1`} />
      <div className={`flex flex-wrap items-start justify-between gap-3`}>
        {playLists.map((item, index) => {
          return (
            <div
              key={`playlist_item_${item.id}_${index}`}
              className={`relative w-24 h-24 xs:w-16 xs:h-16 hover:bg-black hover:bg-opacity-30 cursor-pointer`}
            >
              <Link
                // href={`/playlist/${item.id}`}
                href={`/`}
              >
                <Image src={item.coverImage} alt={`playlist`} fill={true} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MainFriendsPlaylists;
