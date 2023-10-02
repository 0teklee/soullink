"use client";

import React, { useEffect } from "react";
import { PlaylistType } from "@/libs/types/common/Song&PlaylistType";
import Image from "next/image";
import dayjs from "dayjs";
import Title from "@/components/common/module/Title";
import Table from "@/components/common/module/Table";
import CommentContainer from "@/components/common/comments/CommentContainer";
import process from "process";
import { useMutation } from "react-query";
import { postPlaylistLike } from "@/libs/utils/client/fetchers";
import { playlistDefault } from "@/libs/utils/client/commonValues";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/common/userType";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { CommonLoginModalState } from "@/libs/recoil/modalAtom";

const DetailTemplate = ({ playlistData }: { playlistData: PlaylistType }) => {
  const router = useRouter();
  const { data: session } = useSession() as { data: UserSessionType };
  const userId = session?.userId;

  const setLoginModalOpen = useSetRecoilState(CommonLoginModalState);

  const {
    title,
    description,
    coverImage,
    createdAt,
    author,
    songs,
    id: playlistId,
    likedBy,
    playCount,
  } = playlistData;

  const { profilePic, nickname: authorName } = author || playlistDefault.author;
  const isUserLikedPlaylist =
    likedBy.filter((likeItem) => likeItem.userId === userId).length > 0;

  const { mutate } = useMutation({
    mutationFn: () => postPlaylistLike({ playlistId, userId: userId || "" }),
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleLikePlaylist = async () => {
    if (!userId) {
      setLoginModalOpen(true);
      return;
    }

    mutate();
  };

  useEffect(() => {
    router.refresh();
  }, [session]);

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
            src={profilePic || "/image/common/default_profile.svg"}
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
            src={
              coverImage ??
              `${process.env.NEXT_APP_BASE_URL}/image/common/default_cover_image.svg`
            }
            alt={`cover_image`}
            fill={true}
          />
        </div>
        <div className={`absolute bottom-0 right-0 w-full h-full blur-sm`}>
          {!!coverImage ?? (
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
          <p>{`${playCount || 0} played`}</p>
          <p>{`${!!likedBy ? likedBy?.length : 0} likes`}</p>
        </div>
      </div>
      <Table
        key={`table_${playlistId}`}
        songList={songs}
        propsUserId={userId}
      />
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
        <CommentContainer
          postId={playlistId}
          userId={userId || ""}
          isProfile={false}
        />
      </div>
    </section>
  );
};

export default DetailTemplate;
