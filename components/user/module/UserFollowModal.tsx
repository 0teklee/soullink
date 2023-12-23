"use client";

import React from "react";
import {
  FollowerUserResponseType,
  FollowingUserResponseType,
} from "@/libs/types/userType";
import Title from "@/components/common/module/Title";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatPathName } from "@/libs/utils/client/formatter";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import {
  FollowModalPropsType,
  MODAL_TYPE,
  UseModalStateMap,
} from "@/libs/types/modalType";

const UserFollowModal = () => {
  const { useModalState } = useSetModal();

  const [userState] = useModalState<UseModalStateMap[MODAL_TYPE.FOLLOW]>(
    MODAL_TYPE.FOLLOW,
  );

  const { follows, isFollower, profileNickname } =
    userState as FollowModalPropsType;

  const router = useRouter();

  return (
    <div className={`flex flex-col items-center gap-3 bg-white`}>
      <Title
        size={"h3"}
        text={
          isFollower
            ? `${profileNickname}'s follower`
            : `${profileNickname}'s following`
        }
      />
      <div className={`flex flex-col items-center gap-2 w-full`}>
        {follows &&
          follows.length > 0 &&
          follows.map((userItem, idx) => {
            if (!userItem) {
              return null;
            }
            const formattedUser = isFollower
              ? (userItem as FollowerUserResponseType)?.follower
              : (userItem as FollowingUserResponseType)?.following;

            return (
              <div
                className={`flex items-center justify-start gap-4 w-full px-2 py-1 rounded-md xs:gap-2  text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer`}
                key={`user_${idx}_${formattedUser?.id || formattedUser?.id}`}
                onClick={() =>
                  router.push(`/user/${formatPathName(formattedUser.nickname)}`)
                }
              >
                <div className={`relative w-7 h-7 `}>
                  <Image
                    className={`object-cover rounded-full`}
                    fill={true}
                    src={
                      formattedUser.profilePic ||
                      `/image/common/default_profile.svg`
                    }
                    alt={formattedUser.nickname}
                  />
                </div>
                <p>{formattedUser.nickname}</p>
              </div>
            );
          })}
        {follows && follows.length === 0 && (
          <div className={`text-sm text-gray-400`}>
            {isFollower ? `No follower` : `No following`}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFollowModal;
