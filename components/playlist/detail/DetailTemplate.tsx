"use client";

import React, { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import Title from "@/components/common/module/Title";
import SongTable from "@/components/common/song/table/SongTable";
import CommentSection from "@/components/common/comments/CommentSection";
import process from "process";
import { playlistDefault } from "@/libs/utils/client/commonValues";
import {
  ArrowDownTrayIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
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
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE } from "@/libs/types/modalType";
import ReactQueryErrorBoundary from "@/components/common/react-query-provider/ReactQueryErrorBoundary";
import UseCustomizeStyle from "@/libs/utils/hooks/useCustomizeStyle";

const DetailTemplate = ({ id, userId }: { id: string; userId?: string }) => {
  const router = useRouter();

  const { setModal } = useSetModal();

  const [isEdit, setIsEdit] = React.useState<boolean>(false);

  const { data: playlistData } = useQuery({
    queryKey: ["playlist", id],
    queryFn: () => getSinglePlaylist(id),
    throwOnError: true,
  });

  const { playing, handleChangePlaylistState } = useSelectedPlaylistPlay(
    playlistData,
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
    bgColor,
    fontColor,
  } = playlistData || {};

  const {
    profilePic,
    nickname: authorName,
    id: authorId,
  } = author || playlistDefault.author;

  const isUserAuthor = !!userId && !!authorId && userId === authorId;
  const [isUserLikedPlaylist, setIsUserLikedPlaylist] = useState(
    !!userId &&
      !!likedBy &&
      likedBy.length > 0 &&
      likedBy.filter((likeItem) => likeItem.userId === userId).length > 0,
  );

  const { playlistLikeMutate } = useMutatePlaylistLike(
    playlistId,
    userId,
    setIsUserLikedPlaylist,
  );

  const handleLikePlaylist = async () => {
    playlistLikeMutate();
  };

  const handleDownloadModal = () => {
    setModal(MODAL_TYPE.PLAYLIST_DOWNLOAD, {
      title,
      author,
      coverImage,
      songs,
      bgColor,
      fontColor,
    });
  };

  UseCustomizeStyle(bgColor, fontColor);

  return (
    <section
      className={`flex flex-col justify-center items-center gap-10 py-6 `}
    >
      <div className={`flex items-center justify-between w-full`}>
        <p
          className={`text-base font-medium ${
            fontColor ? "" : "text-gray-900 dark:text-warmGray-100"
          }`}
        >
          {dayjs(createdAt).format(`YYYY.MM.DD`)}
        </p>
        <div className={`flex items-center gap-4`}>
          {isUserAuthor && (
            <div
              onClick={() => {
                setIsEdit(!isEdit);
                if (!(playlistData && userId)) {
                  return;
                }

                setModal(MODAL_TYPE.PLAYLIST_EDIT, {
                  userId,
                  playlistData,
                });
              }}
              className={`flex items-center gap-2 cursor-pointer`}
            >
              <PencilIcon
                className={`w-5 h-5 ${
                  fontColor ? "" : "text-gray-900 dark:text-warmGray-100"
                }`}
              />
              <p
                className={`text-sm ${
                  fontColor ? "" : "text-gray-500 dark:text-warmGray-50"
                }`}
              >
                Edit playlist
              </p>
            </div>
          )}
          <button className={`relative w-5 h-5`}>
            <ShareIcon
              className={`w-5 h-5 ${
                fontColor || "text-gray-700 dark:text-warmGray-50"
              } font-medium`}
            />
          </button>
          <button className={`relative w-5 h-5`} onClick={handleDownloadModal}>
            <ArrowDownTrayIcon
              className={`w-5 h-5 ${
                fontColor || "text-gray-700 dark:text-warmGray-50"
              } font-medium`}
            />
          </button>
        </div>
      </div>
      <div className={`flex flex-col items-center justify-center gap-2`}>
        <Title size={`h1`} text={title || ""} customColor={fontColor} />
        {author && (
          <div className={`flex items-center gap-3`}>
            <button
              className={`font-normal ${
                fontColor || "text-black"
              } hover:underline`}
              onClick={() => {
                router.push(`/user/${formatPathName(author.nickname)}`);
              }}
            >
              by {authorName}
            </button>
            <div className={`relative w-6 h-6 rounded-full bg-white`}>
              <Image
                className={`object-cover rounded-full`}
                src={profilePic || "/image/common/default_profile.svg"}
                alt={`user_profile`}
                fill={true}
              />
            </div>
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
                <HeartIcon
                  className={`${fontColor ? "" : "text-gray-300"}`}
                  width={32}
                  height={32}
                />
              )}
            </div>
            <p
              className={`${
                fontColor ? "" : "text-gray-900 dark:text-warmGray-100"
              } text-xl font-normal`}
            >{`LIKE THIS PLAYLIST`}</p>
          </button>
        </div>
        <div
          className={`flex items-center text-sm ${
            fontColor ? "" : "text-gray-900 dark:text-warmGray-100"
          } font-medium  gap-8`}
        >
          <p>{`${playedCount || 0} played`}</p>
          <p>{`${!!likedBy ? likedBy?.length : 0} likes`}</p>
        </div>
      </div>
      {songs && songs.length > 0 && (
        <ReactQueryErrorBoundary>
          <SongTable
            key={`table_${playlistId}`}
            songList={songs}
            playlist={playlistData}
            isCreate={false}
            userId={userId}
          />
        </ReactQueryErrorBoundary>
      )}
      <div
        className={`flex flex-col items-start w-full gap-6 text-base font-normal`}
      >
        <Title size={`h2`} text={`Description`} customColor={fontColor} />
        {description ? (
          <p
            className={` ${
              fontColor ? "" : "text-gray-900 dark:text-warmGray-100"
            }`}
          >
            {description}
          </p>
        ) : (
          <p className={`${fontColor ? "" : "text-gray-300"}`}>
            No description :/
          </p>
        )}
      </div>
      <div className={`flex flex-col items-start w-full gap-6`}>
        <Title size={`h2`} text={`Comments`} customColor={fontColor} />
        <CommentSection postId={id} userId={userId || ""} isProfile={false} />
      </div>
    </section>
  );
};

export default DetailTemplate;
