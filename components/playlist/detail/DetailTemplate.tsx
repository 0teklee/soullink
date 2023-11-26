"use client";

import React from "react";
import { PlaylistType } from "@/libs/types/song&playlistType";
import Image from "next/image";
import dayjs from "dayjs";
import Title from "@/components/common/module/Title";
import SongTable from "@/components/common/song/table/SongTable";
import CommentContainer from "@/components/common/comments/CommentContainer";
import process from "process";
import { playlistDefault } from "@/libs/utils/client/commonValues";
import { HeartIcon, PauseIcon, PlayIcon } from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartIconSolid,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import useSelectedPlaylistPlay from "@/libs/utils/hooks/useSelectedPlaylistPlay";
import { formatPathName } from "@/libs/utils/client/formatter";
import useMutatePlaylistLike from "@/libs/utils/hooks/useMutatePlaylistLike";
import { useQuery } from "@tanstack/react-query";
import { getSinglePlaylist } from "@/libs/utils/client/fetchers";
import CommonModal from "@/components/common/modal/CommonModal";
import DetailEditModal from "@/components/playlist/detail/module/DetailEditModal";

const DetailTemplate = ({
  id,
  propsData,
  userId,
}: {
  id: string;
  propsData: PlaylistType;
  userId?: string;
}) => {
  const router = useRouter();

  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  const { data: playlistData } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => getSinglePlaylist(id),
    enabled: !!id,
    initialData: propsData,
  });

  const { playing, handleChangePlaylistState } = useSelectedPlaylistPlay(
    propsData,
    userId,
  );

  const {
    title,
    description,
    coverImage,
    createdAt,
    author,
    songs,
    id: playlistId,
    likedBy,
    playedCount,
  } = playlistData || {};

  const {
    profilePic,
    nickname: authorName,
    id: authorId,
  } = author || playlistDefault.author;

  const isUserAuthor = !!userId && !!authorId && userId === authorId;

  const isUserLikedPlaylist =
    likedBy &&
    likedBy.length > 0 &&
    userId &&
    likedBy &&
    likedBy.filter((likeItem) => likeItem.userId === userId).length > 0;

  const { playlistLikeMutate } = useMutatePlaylistLike();

  const handleLikePlaylist = async () => {
    playlistLikeMutate(playlistId, userId);
  };

  return (
    <section
      className={`flex flex-col justify-center items-center gap-10 py-6`}
    >
      <div className={`flex items-center justify-between w-full`}>
        <p className={`text-base font-medium text-gray-900`}>
          {dayjs(createdAt).format(`YYYY.MM.DD`)}
        </p>
        <div className={`flex items-center gap-4`}>
          {isUserAuthor && (
            <div
              onClick={() => {
                setIsEdit(!isEdit);
              }}
              className={`flex items-center gap-2 cursor-pointer`}
            >
              <PencilIcon className={`w-5 h-5 text-gray-900`} />
              <p className={`text-sm text-gray-500`}>Edit playlist</p>
            </div>
          )}
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
        <Title size={`h1`} text={title || ""} />
        {author && (
          <div className={`flex items-center gap-3`}>
            <button
              className={`font-normal text-black hover:underline`}
              onClick={() => {
                router.push(`/user/${formatPathName(author.nickname)}`);
              }}
            >
              by {authorName}
            </button>
            <Image
              className={`rounded-full`}
              src={profilePic || "/image/common/default_profile.svg"}
              alt={`user_profile`}
              width={30}
              height={30}
            />
          </div>
        )}
      </div>
      <div
        className={`relative flex items-center justify-center w-screen h-full overflow-hidden`}
      >
        <div
          className={`relative xs:w-[300px] xs:h-[300px] 3xl:w-[500px] 3xl:h-[500px] desktop:w-[800px] desktop:h-[800px] z-1`}
        >
          <Image
            className={`object-cover z-[2]`}
            src={
              coverImage ??
              `${process.env.NEXT_APP_BASE_URL}/image/common/default_cover_image.svg`
            }
            alt={`cover_image`}
            fill={true}
          />
          {playlistData && (
            <div
              onClick={() => {
                handleChangePlaylistState(playlistData);
              }}
              className={`absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-30 z-[3] cursor-pointer opacity-0 hover:opacity-100`}
            >
              {playing ? (
                <PauseIcon className={`w-16 h-16 text-white`} />
              ) : (
                <PlayIcon className={`w-16 h-16 text-white`} />
              )}
            </div>
          )}
        </div>
        <div className={`absolute bottom-0 right-0 w-full h-full blur-sm`}>
          {coverImage && (
            <Image
              className={`object-cover z-1`}
              src={coverImage}
              alt={`bg`}
              fill={true}
            />
          )}
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center gap-3`}>
        <div className={`flex items-center justify-center  gap-3`}>
          <button
            onClick={handleLikePlaylist}
            className={`flex items-center gap-3`}
          >
            <div className={`relative w-8 h-8`}>
              {isUserLikedPlaylist ? (
                <HeartIconSolid
                  className={`text-primary`}
                  width={32}
                  height={32}
                />
              ) : (
                <HeartIcon className={`text-gray-300`} width={32} height={32} />
              )}
            </div>
            <p
              className={`text-gray-900 text-xl font-normal`}
            >{`LIKE THIS PLAYLIST`}</p>
          </button>
        </div>
        <div
          className={`flex items-center text-sm text-gray-900 font-medium  gap-8`}
        >
          <p>{`${playedCount || 0} played`}</p>
          <p>{`${!!likedBy ? likedBy?.length : 0} likes`}</p>
        </div>
      </div>
      {songs && songs.length > 0 && (
        <SongTable
          key={`table_${playlistId}`}
          songList={songs}
          playlist={propsData}
          isCreate={false}
          userId={userId}
        />
      )}
      <div
        className={`flex flex-col items-start w-full gap-6 text-base font-normal`}
      >
        <Title size={`h2`} text={`Description`} />
        {description ? (
          <p className={` text-gray-900`}>{description}</p>
        ) : (
          <p className={`text-gray-300`}>No description :/</p>
        )}
      </div>
      <div className={`flex flex-col items-start w-full gap-6`}>
        <Title size={`h2`} text={`Comments`} />
        {playlistId && (
          <CommentContainer
            postId={playlistId}
            userId={userId || ""}
            isProfile={false}
          />
        )}
      </div>
      {isEdit && isUserAuthor && playlistData && (
        <CommonModal isModalOpen={isEdit} setIsModalOpen={setIsEdit}>
          <DetailEditModal
            userId={userId}
            setIsEdit={setIsEdit}
            playlistData={playlistData}
          />
        </CommonModal>
      )}
    </section>
  );
};

export default DetailTemplate;
