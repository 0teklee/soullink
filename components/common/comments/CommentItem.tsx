"use client";

import React, { useRef, useState } from "react";
import { CommentType } from "@/libs/types/userType";
import Image from "next/image";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

import {
  formatDaysAgo,
  formatIsMutualClient,
  formatPathName,
} from "@/libs/utils/client/formatter";
import {
  postDeleteComment,
  postLikeComment,
} from "@/libs/utils/client/fetchers";
import { useMutation } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { CommonLoginModalState } from "@/libs/recoil/atoms";
import { useRouter } from "next/navigation";
import CommonModal from "@/components/common/modal/CommonModal";
import CommentDeleteModal from "@/components/common/comments/CommentDeleteModal";
import useClickOutside from "@/libs/utils/hooks/useClickOutside";

const CommentItem = ({
  commentProps,
  postId,
  userId,
  refetch,
}: {
  commentProps: CommentType;
  postId: string;
  userId?: string;
  refetch: () => void;
}) => {
  const setLoginModalOpen = useSetRecoilState(CommonLoginModalState);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLikedByDropdownOpen, setIsLikedByDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    id: commentId,
    comment,
    createdAt,
    author,
    likedBy,
    isPrivate,
    isDeleted,
  } = commentProps;

  const { nickname, profilePic } = author;

  const hasLiked = likedBy.filter((user) => user.user.id === userId).length > 0;
  const isMutual = formatIsMutualClient(author, userId, postId);
  const isAuthor = author.id === userId;
  const isDeletedOrPrivate = nickname === "deleted" || nickname === "anonymous";
  const router = useRouter();

  const { mutate: likeCommentMutate } = useMutation({
    mutationFn: () => postLikeComment({ commentId, userId: userId || "" }),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
      confirm("Error occured. Please try again.");
    },
  });

  const { mutate: deleteCommentMutate } = useMutation({
    mutationFn: () => postDeleteComment({ commentId, userId: userId || "" }),
    onSuccess: () => {
      refetch();
      setIsDeleteModalOpen(false);
    },
    onError: (error) => {
      console.log(error);
      confirm("Error occured. Please try again.");
    },
  });

  const handleLike = () => {
    if (!postId) {
      return;
    }

    if (!userId) {
      setLoginModalOpen(true);
      return;
    }
    likeCommentMutate();
    refetch();
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleClickOutside = () => {
    setIsLikedByDropdownOpen(false);
  };

  useClickOutside({
    ref: dropdownRef,
    handler: handleClickOutside,
  });

  return (
    <>
      <div
        className={`flex items-center justify-between w-full px-2 py-2 border-b-[1px] border-gray-200 text-sm `}
      >
        <div
          className={`flex items-center justify-between gap-3 xs:items-start`}
        >
          <div
            className={`flex items-center justify-start gap-3 w-28 overflow-ellipsis`}
          >
            <div className={`relative w-5 h-5`}>
              <Image
                className={`rounded-full`}
                src={profilePic || "/image/common/default_profile.svg"}
                alt={`usr_${author.id}`}
                fill={true}
              />
            </div>
            <button
              className={`text-gray-900 font-medium ${
                isDeletedOrPrivate ? "cursor-default" : "hover:underline"
              }`}
              onClick={() => {
                if (isDeletedOrPrivate) {
                  return;
                }
                router.push(`/user/${formatPathName(nickname)}`);
              }}
            >
              {nickname}
            </button>
          </div>
          <p className={`text-gray-500 font-normal`}>{comment}</p>
        </div>
        {(!isPrivate || (isPrivate && isMutual)) && !isDeleted && (
          <div
            className={`flex items-center justify-between gap-1 w-[150px] xs:w-[50px]`}
          >
            <p className={`text-xs text-gray-500 xs:hidden`}>
              {formatDaysAgo(createdAt)}
            </p>
            {isAuthor && !isDeleted && (
              <button onClick={handleDelete}>
                <TrashIcon
                  className={`w-4 h-4 text-gray-500 hover:text-primary cursor-pointer`}
                />
              </button>
            )}
            <div className={`flex items-center justify-between gap-1`}>
              <button onClick={handleLike}>
                {hasLiked ? (
                  <SolidHeartIcon
                    className={`w-4 h-4 text-primary hover:text-gray-500`}
                  />
                ) : (
                  <HeartIcon
                    className={`w-4 h-4 text-gray-500 hover:text-primary
            `}
                  />
                )}
              </button>
              <div className={`relative bottom-[1px] xs:hidden`}>
                <button
                  onClick={() => {
                    if (likedBy.length > 0) {
                      setIsLikedByDropdownOpen(!isLikedByDropdownOpen);
                    }
                  }}
                >
                  <p className={`text-xs text-gray-500`}>{likedBy.length}</p>
                </button>
                {isLikedByDropdownOpen && (
                  <div
                    className={`absolute bottom-10 right-0 z-10 bg-white border border-gray-300 rounded`}
                  >
                    {likedBy?.map((user) => (
                      <div
                        ref={dropdownRef}
                        key={`likedBy_${user.user.id}`}
                        className={`flex items-center justify-start gap-1 w-full whitespace-nowrap px-2 py-2`}
                      >
                        <div
                          className={`flex items-center justify-start gap-2`}
                        >
                          <div className={`w-4 h-4`}>
                            <Image
                              className={`rounded-full`}
                              src={
                                user.user.profilePic ||
                                "/image/common/default_profile.svg"
                              }
                              alt={`usr_${user.user.id}`}
                              width={16}
                              height={16}
                            />
                          </div>
                          <button
                            onClick={() => {
                              const formattedNickname = formatPathName(
                                user.user.nickname,
                              );
                              router.push(`/user/${formattedNickname}`);
                            }}
                          >
                            <p
                              className={`text-xs text-gray-900 font-semibold underline`}
                            >
                              @{user.user.nickname}
                            </p>
                          </button>
                        </div>
                        <p className={`text-xs text-gray-900 font-normal`}>
                          liked this comment.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {isDeleteModalOpen && (
        <CommonModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
        >
          <CommentDeleteModal
            setIsModalOpen={setIsDeleteModalOpen}
            mutate={deleteCommentMutate}
          />
        </CommonModal>
      )}
    </>
  );
};

export default CommentItem;
