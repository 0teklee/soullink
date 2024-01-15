"use client";

import React from "react";
import Title from "@/components/common/module/Title";
import Link from "next/link";
import Image from "next/image";
import { formatPathName } from "@/libs/utils/client/formatter";
import { getMainPageFriendsPlaylists } from "@/libs/utils/client/fetchers";

const MainFriendsPlaylists = async ({ userId }: { userId?: string }) => {
  const data = await getMainPageFriendsPlaylists(userId);

  const dataAvailable = data && data.length > 0;

  return (
    <>
      {dataAvailable && (
        <section className={`flex flex-col items-start w-full gap-4`}>
          <Title text={`Friends are listening to..`} size={`h1`} />
          <div className={`flex flex-wrap items-start justify-between gap-3`}>
            {data.map((item, index) => {
              return (
                <div
                  key={`playlist_item_${item.id}_${index}`}
                  className={`relative w-24 h-24 xs:w-16 xs:h-16 hover:bg-black hover:bg-opacity-30 cursor-pointer`}
                >
                  <Link href={`/playlist/${formatPathName(item.title)}`}>
                    <Image
                      className={`object-cover`}
                      src={
                        item.coverImage ||
                        `/image/common/default_cover_image.svg`
                      }
                      alt={`playlist`}
                      fill={true}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default MainFriendsPlaylists;
