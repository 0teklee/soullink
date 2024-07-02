"use client";

import React, { useEffect, useState } from "react";
import { EditProfilePayload, UserType } from "@/libs/types/userType";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postNicknameDuplicate,
  postUserEdit,
  postUserFollow,
} from "@/libs/utils/client/fetchers";
import {
  CheckIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ClipboardIcon,
  PencilIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import useTimer from "@/libs/utils/hooks/useTimer";
import { handleImageUpload } from "@/libs/utils/client/commonUtils";
import { useRouter } from "next/navigation";
import DomPurifiedText from "@/components/common/module/DOMPurifiedText";
import { MODAL_TYPE } from "@/libs/types/modalType";

import ColorPicker from "@/components/common/module/ColorPicker";
import { useModalStore } from "@/libs/store";
import { cn } from "@/libs/utils/client/ui";

const UserHeader = ({
  userProfile,
  userId,
}: {
  userProfile: UserType;
  userId?: string;
}) => {
  const queryClient = useQueryClient();
  const setModal = useModalStore((state) => state.setModal);

  const router = useRouter();

  const {
    nickname,
    profilePic,
    followers,
    following,
    bio,
    playedCount,
    id: targetId,
    bgColor,
    fontColor,
    createdPlaylists,
    isEditor,
  } = userProfile;

  const [isEdit, setIsEdit] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState<boolean | undefined>(
    undefined,
  );
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [customColorType, setCustomColorType] = useState<"font" | "bg">("font");
  const [customFontColor, setCustomFontColor] = useState(fontColor || "");
  const [customBgColor, setCustomBgColor] = useState(bgColor || "");

  const [editPayload, setEditPayload] = useState<EditProfilePayload>({
    userId: userId || "",
    nickname: userProfile.nickname,
    profilePic: userProfile?.profilePic,
    bio: userProfile?.bio,
    bgColor: customBgColor,
    fontColor: customFontColor,
  });

  const isProfileOwner = userId === targetId;
  const isFollowing = followers?.some((user) => user.follower.id === userId);

  const { mutate: followMutate } = useMutation({
    mutationFn: () => postUserFollow({ targetId, userId: userId || "" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ refetchType: "all" });
    },
  });

  const { mutate: nicknameDuplicateMutate, isPending: isDuplicateLoading } =
    useMutation({
      mutationFn: ({ nickname }: { nickname: string }) =>
        postNicknameDuplicate({ nickname }),
      onSuccess: (res) => {
        setIsDuplicated(res);
      },
    });

  const { mutate: editProfileMutate } = useMutation({
    mutationFn: (payload: EditProfilePayload) => postUserEdit(payload),
    onSuccess: (res) => {
      queryClient.refetchQueries({ type: "all" });
      router.push(`/user/${res.userNickname}`);
    },
  });

  const { timer, resetTimer } = useTimer(() => {
    if (!editPayload.nickname) {
      return;
    }
    if (editPayload.nickname === userProfile.nickname) {
      setIsDuplicated(undefined);
      return;
    }
    nicknameDuplicateMutate({ nickname: editPayload.nickname });
  }, 500);

  const handleNickNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPayload((prev) => ({
      ...prev,
      nickname: e.target.value,
    }));

    resetTimer(timer);
  };

  const handlePayloadImgUpload = (imgUrl: string) => {
    setEditPayload((prev) => ({
      ...prev,
      profilePic: imgUrl,
    }));
  };

  const handleFollow = () => {
    if (isProfileOwner) {
      return;
    }

    if (!userId) {
      setModal(MODAL_TYPE.LOGIN);
      return;
    }
    followMutate();
  };

  const handleEditProfile = () => {
    if (!editPayload.nickname || isDuplicated) {
      return;
    }
    editProfileMutate(editPayload);
  };

  useEffect(() => {
    if (customFontColor) {
      setEditPayload((prev) => ({
        ...prev,
        fontColor: customFontColor,
      }));
    }

    if (customBgColor) {
      setEditPayload((prev) => ({
        ...prev,
        bgColor: customBgColor,
      }));
    }
  }, [customFontColor, customBgColor]);

  return (
    <>
      <div
        className={`relative full-screen-div text-gray-700 dark:text-gray-50`}
        style={{
          backgroundColor: customBgColor,
          color: customFontColor,
        }}
      >
        <div
          className={cn(
            `flex  flex-col items-center justify-center gap-5`,
            `lg:items-start lg:justify-start `,
            `w-full my-3 pt-1 py-2 px-4`,
            `lg:pt-12 lg:pb-4`,
          )}
        >
          <div
            className={`profile-card relative flex flex-col items-center gap-y-3 z-10`}
          >
            <div className={`group relative`}>
              {!isProfileOwner && (
                <div
                  onClick={handleFollow}
                  className={cn(
                    `absolute flex items-center justify-center gap-2 w-full h-full top-0`,
                    `bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity`,
                    `lg:-top-8 lg:h-fit`,
                    `cursor-pointer z-20`,
                  )}
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
                {isEdit && (
                  <button
                    onClick={() => {
                      handleImageUpload(handlePayloadImgUpload);
                    }}
                    className={`absolute w-full h-full cursor-pointer z-10`}
                  >
                    <PhotoIcon
                      className={`absolute top-0 right-0 z-10 text-bg-difference`}
                      width={24}
                      height={24}
                    />
                  </button>
                )}
                <Image
                  className={`object-cover`}
                  src={
                    isEdit
                      ? editPayload?.profilePic ||
                        "/image/common/default_cover_image.svg"
                      : profilePic || "/image/common/default_cover_image.svg"
                  }
                  alt={nickname}
                  fill={true}
                />
              </div>
            </div>
            <div className={`flex flex-col items-center gap-1`}>
              <div className={`bg-transparent`}>
                <div className={`mb-1`}>
                  {isProfileOwner && (
                    <div className={`flex justify-between gap-2 my-3 text-sm`}>
                      <button
                        className={`w-full px-2 py-1  ${
                          isEdit
                            ? `text-primary rounded border border-primary hover:text-white hover:bg-primary disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-primary`
                            : ``
                        }`}
                        disabled={
                          isEdit && (isDuplicated || isDuplicateLoading)
                        }
                        onClick={() => {
                          if (isEdit) {
                            handleEditProfile();
                          }

                          if (!isEdit) {
                            setEditPayload((prev) => ({
                              ...prev,
                              nickname: userProfile.nickname,
                              profilePic: userProfile?.profilePic,
                              bio: userProfile?.bio,
                            }));
                          }
                          setIsEdit((prev) => !prev);
                        }}
                      >
                        {isEdit ? `Complete` : `Edit Profile`}
                      </button>
                      <button
                        className={`w-full px-2 py-1 ${
                          isEdit
                            ? `text-pink-700 rounded border border-pink-700 hover:text-white hover:bg-red-400`
                            : `hidden`
                        }`}
                        onClick={() => {
                          setIsEdit(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className={cn(
              `flex flex-col items-start gap-4 lg:items-center`,
              `w-full pt-1 lg:pt-12`,
            )}
          >
            <div
              className={`flex flex-col items-center lg:items-start justify-center gap-1`}
            >
              {isEditor && (
                <div className={`flex items-center justify-start gap-2 `}>
                  <div className={`relative w-5 h-5`}>
                    <Image
                      src={`/soullink_logo.png`}
                      alt={`author`}
                      fill={true}
                    />
                  </div>
                  <p className={`text-base text-primary font-medium`}>
                    {`Editor`}
                  </p>
                </div>
              )}
              {!isEdit && (
                <p className={`text-2xl font-semibold `}>{nickname}</p>
              )}
              {isEdit && (
                <div className={`relative`}>
                  <input
                    type="text"
                    className={`appearance-none text-center text-2xl font-semibold  bg-transparent border-b-2  focus:outline-none focus:border-primary`}
                    onChange={handleNickNameChange}
                    onKeyUp={() => resetTimer(timer)}
                    value={editPayload.nickname}
                  />
                  {isDuplicated !== undefined && (
                    <div className={`w-full mt-0.5`}>
                      {isDuplicated && (
                        <div
                          className={`flex items-center gap-1 text-pink-700`}
                        >
                          <XMarkIcon className={`w-4 h-4`} />
                          <p className={`text-xs`}>nickname already used</p>
                        </div>
                      )}
                      {isDuplicated === false && (
                        <div className={`flex items-center gap-1 text-primary`}>
                          <CheckIcon className={`w-4 h-4`} />
                          <p className={`text-xs`}>available</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {isEdit && (
                <div className={`flex items-center gap-3 w-full`}>
                  <div className={`flex flex-col gap-1`}>
                    <button
                      className={`flex items-center justify-between gap-1`}
                      onClick={() => {
                        setCustomColorType("font");
                        setIsColorPickerOpen((prev) => !prev);
                      }}
                    >
                      <PencilIcon className={`w-4 h-4 text-gray-400`} />
                      <span className={`text-xs text-gray-400`}>
                        Change font color
                      </span>
                    </button>
                    <div
                      className={`w-4 h-4 rounded`}
                      style={{ backgroundColor: customFontColor }}
                    />
                  </div>
                  <div className={`flex flex-col gap-1`}>
                    <button
                      className={`flex items-center justify-between gap-1`}
                      onClick={() => {
                        setCustomColorType("bg");
                        setIsColorPickerOpen((prev) => !prev);
                      }}
                    >
                      <ClipboardIcon className={`w-4 h-4 text-gray-400`} />
                      <span className={`text-xs text-gray-400`}>
                        Change Background color
                      </span>
                    </button>
                    <div
                      className={`w-4 h-4 rounded`}
                      style={{ backgroundColor: customBgColor }}
                    />
                  </div>
                  {customColorType === "font" && isColorPickerOpen && (
                    <ColorPicker
                      customFontColor={customFontColor}
                      setCustomFontColor={setCustomFontColor}
                      setIsColorPickerOpen={setIsColorPickerOpen}
                    />
                  )}
                  {customColorType === "bg" && isColorPickerOpen && (
                    <ColorPicker
                      customFontColor={customBgColor}
                      setCustomFontColor={setCustomBgColor}
                      setIsColorPickerOpen={setIsColorPickerOpen}
                    />
                  )}
                </div>
              )}
              <div
                className={`flex items-center justify-between max-w-full text-xs font-medium gap-3 `}
              >
                <button
                  onClick={() => {
                    setModal(MODAL_TYPE.FOLLOW, {
                      follows: following,
                      isFollower: false,
                      profileNickname: nickname,
                    });
                  }}
                >
                  following {following?.length}
                </button>
                <button
                  onClick={() => {
                    setModal(MODAL_TYPE.FOLLOW, {
                      follows: followers,
                      isFollower: true,
                      profileNickname: nickname,
                    });
                  }}
                >
                  follower {followers?.length}
                </button>
              </div>
            </div>
            <div className={`w-full line-clamp-[12] overflow-ellipsis`}>
              {!!bio && !isEdit && (
                <div className={`flex flex-col items-start gap-3`}>
                  <div className={`flex flex-col items-start gap-1`}>
                    {createdPlaylists && (
                      <p className={`text-center text-md font-normal `}>
                        created {createdPlaylists.length} playlists
                      </p>
                    )}
                    {playedCount && (
                      <p className={`text-center text-sm font-normal `}>
                        {playedCount} played
                      </p>
                    )}
                  </div>
                  <div className={`text-lg`}>
                    <p className={`font-semibold`}>Bio</p>
                    <DomPurifiedText text={bio} />
                  </div>
                </div>
              )}
              {isEdit && (
                <div className={`w-full`}>
                  <textarea
                    className={`appearance-none w-full p-2 font-normal bg-transparent border-2 focus:outline-none focus:border-primary resize-y`}
                    onChange={(e) =>
                      setEditPayload((prev) => ({
                        ...prev,
                        bio: e.target.value,
                      }))
                    }
                    value={editPayload.bio}
                    maxLength={120}
                  />
                  <p className={`text-sm`}>
                    {editPayload?.bio ? editPayload?.bio?.length : 0}/120
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHeader;
