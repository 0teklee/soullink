"use client";

import React from "react";
import { PlaylistType } from "@/types/common/playlistType";
import Image from "next/image";
import dayjs from "dayjs";
import Title from "@/components/common/module/Title";
import Table from "@/components/common/module/Table";
import CommentContainer from "@/components/common/comments/CommentContainer";

const DetailTemplate = ({ playlistData }: { playlistData: PlaylistType }) => {
  const {
    title,
    description,
    coverImage,
    createdAt,
    author,
    authorId,
    songs,
    id,
    comments,
    likedBy,
    playCount,
  } = playlistData;

  const { profilePic, nickname: authorName } = author;

  return (
    <section
      className={`flex flex-col justify-center items-center gap-10 py-6`}
    >
      <div className={`flex items-center justify-between w-full`}>
        <p className={`text-base font-medium text-gray-900`}>
          {dayjs(createdAt).format(`YYYY.MM.DD`)}
        </p>
        <div className={`flex items-center gap-4`}>
          <button className={`relative w-5 h-5`}>
            <Image src={`/image/common/share.svg`} alt={`share`} fill={true} />
          </button>
          <button className={`relative w-5 h-5`}>
            <Image
              src={`/image/common/download.svg`}
              alt={`download`}
              fill={true}
            />
          </button>
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center gap-2`}>
        <Title size={`h1`} text={title} />
        <div className={`flex items-center gap-3`}>
          <p className={`font-normal text-black`}>by {authorName}</p>
          <Image
            className={`rounded-full`}
            src={profilePic}
            alt={`user_profile`}
            width={30}
            height={30}
          />
        </div>
      </div>
      <div
        className={`relative flex items-center justify-center w-screen h-full overflow-hidden`}
      >
        <div
          className={`relative xs:w-[300px] xs:h-[300px] 3xl:w-[500px] 3xl:h-[500px] desktop:w-[800px] desktop:h-[800px] z-1`}
        >
          <Image
            className={`z-[2]`}
            src={coverImage}
            alt={`cover_image`}
            fill={true}
          />
        </div>
        <div className={`absolute bottom-0 right-0 w-full h-full  blur-sm`}>
          <Image
            className={`object-cover z-1`}
            src={coverImage}
            alt={`bg`}
            fill={true}
          />
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center gap-3`}>
        <div className={`flex items-center justify-center  gap-3`}>
          <button className={`relative w-8 h-8`}>
            <Image
              src={`/image/player/song_like.svg`}
              alt={`like`}
              fill={true}
            />
          </button>
          <p
            className={`text-gray-900 text-xl font-normal`}
          >{`LIKE THIS PLAYLIST`}</p>
        </div>
        <div
          className={`flex items-center text-sm text-gray-900 font-medium  gap-8`}
        >
          <p>{`${playCount} played`}</p>
          <p>{`${likedBy.length} likes`}</p>
          <p>{`${comments.length} comments`}</p>
        </div>
      </div>
      <Table key={`table_${id}`} songList={songs} />
      <div className={`flex flex-col items-start w-full gap-6`}>
        <Title size={`h2`} text={`Description`} />
        <p className={`text-base font-normal text-gray-900`}>{description}</p>
      </div>
      <div className={`flex flex-col items-start w-full gap-6`}>
        <Title size={`h2`} text={`Comments`} />
        <CommentContainer commentList={comments} />
      </div>
    </section>
  );
};

export default DetailTemplate;
