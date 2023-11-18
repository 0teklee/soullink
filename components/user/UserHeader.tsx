"use client";

import React, { useState } from "react";
import { UserSessionType, UserType } from "@/libs/types/userType";
import Image from "next/image";
import BgColorExtract from "@/components/common/module/BgColorExtract";
import { useMutation } from "react-query";
import { postUserFollow } from "@/libs/utils/client/fetchers";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { CommonLoginModalState } from "@/libs/recoil/atoms";
import CommonModal from "@/components/common/modal/CommonModal";
import UserFollowModal from "@/components/user/module/UserFollowModal";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const UserHeader = ({
  userProfile,
  session,
}: {
  userProfile: UserType;
  session?: UserSessionType;
}) => {
  const setLoginModalOpen = useSetRecoilState(CommonLoginModalState);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFollowerModal, setIsFollowerModal] = useState(false);

  const {
    nickname,
    profilePic,
    followers,
    following,
    bio,
    playedCount,
    id: targetId,
  } = userProfile;

  const isProfileOwner = session?.userId === targetId;
  const isFollowing = followers?.some(
    (user) => user.follower.id === session?.userId,
  );

  const { mutate: followMutate } = useMutation({
    mutationFn: () =>
      postUserFollow({ targetId, userId: session?.userId || "" }),
  });

  const handleFollow = () => {
    if (isProfileOwner) {
      return;
    }

    if (!session?.userId) {
      setLoginModalOpen(true);
      return;
    }
    followMutate();
  };

  return (
    <>
      <div className={`absolute left-0 w-screen `}>
        <div className={`relative w-full`}>
          <BgColorExtract
            imageUrl={profilePic || "/image/common/default_cover_image.svg"}
          />
          <div
            className={`relative left-0 flex items-start justify-start w-screen mt-10 xs:my-10 pt-12 pb-4 xs:py-2 xs:px-4 xl:px-24 3xl:px-48 desktop:px-[400px] gap-x-[60px] bg-transparent xs:flex-col xs:items-center xs:justify-center`}
          >
            <div
              className={`profile-card relative flex flex-col items-center gap-y-3 z-10`}
            >
              <div className={`group xs:relative`}>
                {!isProfileOwner && (
                  <div
                    onClick={handleFollow}
                    className={`absolute -top-8 flex items-center justify-center gap-2 w-full cursor-pointer xs:h-full xs:top-0 xs:bg-black xs:bg-opacity-50 xs:opacity-0 xs:group-hover:opacity-100 xs:transition-opacity z-20`}
                  >
                    <p className={`text-xl`}>
                      {isFollowing ? `Unfollow` : `Follow`}
                    </p>
                    {!!isFollowing ? (
                      <MinusIcon
                        className={`z-1 text-bg-difference`}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <PlusIcon
                        className={`z-1 text-bg-difference`}
                        width={24}
                        height={24}
                      />
                    )}
                  </div>
                )}
                <div className={`relative w-[250px] h-[250px]`}>
                  <Image
                    src={profilePic || "/image/common/default_cover_image.svg"}
                    alt={nickname}
                    fill={true}
                  />
                </div>
              </div>
              <div className={`flex flex-col items-center gap-1`}>
                <div className={`flex items-center justify-center`}>
                  <p className={`text-2xl font-semibold `}>{nickname}</p>
                </div>
                <div className={`bg-transparent`}>
                  <div className={`mb-1`}>
                    <p className={`text-center text-sm font-normal `}>
                      {playedCount} played
                    </p>
                    <div
                      className={`flex items-center justify-between max-w-full text-normal font-medium gap-3 `}
                    >
                      <button
                        onClick={() => {
                          setIsFollowerModal(false);
                          setIsModalOpen(true);
                        }}
                      >
                        following {following?.length}
                      </button>
                      <button
                        onClick={() => {
                          setIsFollowerModal(true);
                          setIsModalOpen(true);
                        }}
                      >
                        follower {followers?.length}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className={`w-full max-w-5xl line-clamp-[12] overflow-ellipsis`}
              >
                <p className={`text-base `}>{!!bio && bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CommonModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <UserFollowModal
            follows={isFollowerModal ? followers : following}
            isFollower={isFollowerModal}
            profileNickname={nickname}
          />
        </CommonModal>
      )}
    </>
  );
};

export default UserHeader;
