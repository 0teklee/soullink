"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/common/module/Title";
import Image from "next/image";
import SongTable from "@/components/common/song/table/SongTable";
import {
  PlaylistCreateRequestType,
  PlaylistInputValidationType,
  PlaylistMoodType,
  SongType,
} from "@/libs/types/song&playlistType";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import {
  getSingleUserProfile,
  postCreatePlaylist,
} from "@/libs/utils/client/fetchers";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { commonMoods } from "@/libs/utils/client/contants/commonValues";
import { handleImageUpload } from "@/libs/utils/client/commonUtils";
import {
  formatMoodBgColor,
  formatPathName,
} from "@/libs/utils/client/formatter";
import { SongModalPropsState } from "@/libs/recoil/modalAtoms";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE } from "@/libs/types/modalType";
import { useForm } from "react-hook-form";

const PlaylistCreateTemplate = () => {
  const [songModalState, setSongModalProps] =
    useRecoilState(SongModalPropsState);

  const { setModal } = useSetModal();

  const { data: session } = useSession() as { data: UserSessionType };
  const userId = session?.userId;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
  } = useForm<PlaylistInputValidationType>({
    defaultValues: {
      title: "",
      description: "",
      coverImage: "",
      songs: [],
      categories: [],
      mood: "" as PlaylistMoodType,
      categoryInput: "",
    },
  });

  const title = watch("title");
  const description = watch("description");
  const songs = watch("songs");
  const categories = watch("categories");
  const categoryInput = watch("categoryInput");
  const coverImage = watch("coverImage");
  const currentMood = watch("mood");

  const [isMoodDropdownOpen, setIsMoodDropdownOpen] = useState<boolean>(false);
  const [songList, setSongList] = useState<SongType[]>([]);

  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return userId ? getSingleUserProfile(userId) : null;
    },
    enabled: !!userId,
  });

  const { mutate } = useMutation({
    mutationFn: (payload: PlaylistCreateRequestType) => {
      if (!userId) {
        throw Error("need login");
      }
      return postCreatePlaylist(payload, userId);
    },
    onSuccess: (data) => {
      router.push(`/playlist/${formatPathName(data.playlistTitle)}`);
    },
  });

  const { likedSong } = userData || {};

  const isPayloadValid =
    !!title &&
    title.length <= 40 &&
    !!description &&
    description.length < 100 &&
    !!songs &&
    songs.length > 0 &&
    songs.length <= 20 &&
    !!userId &&
    !!currentMood;

  const handlePayload = ({
    categoryInput,
    ...payload
  }: PlaylistInputValidationType) => {
    if (!userId) {
      setModal(MODAL_TYPE.LOGIN);
      return;
    }
    mutate(payload);
  };

  const handleSongChange = (songList: SongType[]) => {
    if (songList.find((song) => song.url === songModalState?.modalSong?.url)) {
      return songList;
    }
    return [...songList, songModalState?.modalSong as SongType];
  };

  const handlePayloadImgUpload = (imgUrl: string) => {
    setValue("coverImage", imgUrl);
  };

  const handleCategories = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (categories?.length === 3 || !categoryInput) {
      return;
    }

    if (e.key === "Enter") {
      setValue("categories", categories.concat(categoryInput));
      setValue("categoryInput", "");
    }
  };

  const handleClickCategory = () => {
    if (categories?.length === 3 || !categoryInput) {
      return;
    }

    setValue(
      "categories",
      categories && categories.length > 0
        ? [...categories, categoryInput]
        : [categoryInput],
    );
    setValue("categoryInput", "");
  };

  useEffect(() => {
    if (!songModalState?.modalSong) {
      return;
    }
    setSongList(handleSongChange(songList));
    setSongModalProps(null);
  }, [songModalState?.modalSong]);

  useEffect(() => {
    if (songList?.length > 0) {
      setValue("songs", songList);
    }
  }, [songList]);

  useEffect(() => {
    if (session && !userId) {
      router.push("/");
      setModal(MODAL_TYPE.LOGIN);
    }
  }, [userId]);

  return (
    <section
      className={`flex flex-col items-center gap-12 py-6 xs:px-3 xs:overflow-y-scroll xs:gap-6 dark:bg-gray-600 xs:h-screen xs:pt-6 xs:pb-24`}
    >
      <Title size={`h1`} text={`Create Playlist`} />
      <form
        onSubmit={handleSubmit(handlePayload)}
        className={`flex flex-col items-center w-full max-w-lg gap-10 xs:gap-6`}
      >
        <div
          className={`flex flex-col items-center justify-center cursor-pointer`}
        >
          <div className={`relative w-full max-w-[140px]`}>
            <div
              onClick={() => {
                setIsMoodDropdownOpen((prev) => !prev);
              }}
              className={`flex items-center justify-between gap-2 mb-2 px-2 py-1 text-gray-400 border border-gray-300 rounded-lg ${
                currentMood && `${formatMoodBgColor(currentMood)} text-white`
              }`}
            >
              {isMoodDropdownOpen ? (
                <ChevronUpIcon className={`w-4 h-4`} />
              ) : (
                <ChevronDownIcon className={`w-4 h-4`} />
              )}
              <div>
                <p>{currentMood ? currentMood : `select mood`}</p>
                {currentMood ? null : (
                  <p className={`text-gray-300 text-xs font-medium`}>
                    *required
                  </p>
                )}
              </div>
            </div>
            {isMoodDropdownOpen && (
              <div
                className={`absolute top-full left-0 flex flex-col items-center justify-center w-full bg-white border border-gray-300 rounded-lg z-10`}
              >
                {commonMoods.map((mood) => (
                  <div
                    key={mood}
                    onClick={() => {
                      setValue("mood", mood);
                      setIsMoodDropdownOpen(false);
                    }}
                    className={`flex items-center justify-between w-full px-2 py-1 text-gray-400 text-sm border-b border-gray-300 hover:text-white ${formatMoodBgColor(
                      mood,
                      true,
                    )}`}
                  >
                    <div
                      className={`w-4 h-4 ${formatMoodBgColor(
                        mood,
                      )} mr-2 rounded-full`}
                    />
                    <p>{mood}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p
            className={`mb-3 text-gray-500 dark:text-warmGray-50 text-base font-normal`}
          >
            add cover
          </p>
          <div
            onClick={() => {
              handleImageUpload(handlePayloadImgUpload);
            }}
            className={`relative flex items-center justify-center w-[300px] h-[300px] bg-gray-100 border border-gray-300 rounded-xl overflow-hidden`}
          >
            {!coverImage && (
              <Image
                src={`/image/common/plus.svg`}
                width={36}
                height={36}
                alt={`add cover`}
              />
            )}
            {coverImage && (
              <Image
                className={`object-cover`}
                src={`${coverImage}`}
                fill={true}
                alt={`add cover`}
              />
            )}
          </div>
        </div>
        <div className={`flex flex-col gap-2 items-center w-full max-w-xs`}>
          <Title size={`h3`} text={`Categories`} />
          <div className={`flex gap-2`}>
            {categories?.map((category, idx) => (
              <div
                key={`${idx}_${category}`}
                className={`flex items-center justify-center gap-1 w-full px-2 py-1 text-gray-400 text-sm border border-gray-300 rounded-lg`}
              >
                <p>{category}</p>
                <button
                  type={`button`}
                  onClick={() => {
                    setValue(
                      "categories",
                      categories?.filter((c) => c !== category),
                    );
                  }}
                >
                  <XMarkIcon className={`w-4 h-4 text-gray-300`} />
                </button>
              </div>
            ))}
          </div>
          <p className={`text-gray-300 text-xs font-medium`}>
            *You can add up to 3 categories
          </p>
          <div className={`relative`}>
            <input
              className={`w-[300px] mt-3 p-2 text-gray-900 dark:text-warmGray-100 bg-white border border-gray-300 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              type={`text`}
              placeholder={`press enter to add category`}
              onKeyDown={handleCategories}
              value={categoryInput}
              onChange={(e) => {
                if (e.currentTarget.value.length > 30) {
                  return;
                }
                setValue("categoryInput", e.currentTarget.value);
              }}
            />
            <button
              type={`button`}
              onClick={handleClickCategory}
              className={`absolute right-[18px] top-8 -translate-y-1/2 text-gray-300 hover:text-primary`}
            >
              add
            </button>
          </div>
        </div>
        <div
          className={`flex flex-col items-center justify-center gap-4 w-full`}
        >
          <SongTable
            songList={songs}
            isCreate={true}
            setSongList={setSongList}
          />
          <p
            className={`${
              errors.songs?.message ? "text-pink-600" : "text-gray-300"
            } text-xs font-medium`}
          >
            *You can add up to 20 songs to the list
          </p>
          <button
            type={`button`}
            className={`flex items-center gap-1`}
            onClick={(e) => {
              e.stopPropagation();
              if (songs.length >= 20) {
                setError("songs", {
                  type: "manual",
                  message: "You can add up to 20 songs to the list",
                });
                return;
              }
              setModal(MODAL_TYPE.SONG, {
                isEdit: false,
              });
            }}
          >
            <Image
              src={`/image/common/plus.svg`}
              width={24}
              height={24}
              alt={`plus`}
            />
            <span className={`text-gray-400`}>add</span>
          </button>
        </div>
        {likedSong && likedSong?.songs && likedSong?.songs?.length > 0 && (
          <div className={`w-full`}>
            <Title size={`h3`} text={`Your Favorite Songs`} />
            <SongTable
              songList={(likedSong?.songs as SongType[]) || []}
              isCreate={true}
              isCreateFavorite={true}
              setSongList={setSongList}
            />
          </div>
        )}
        <div
          className={`flex flex-col items-start w-full pr-12 xs:pr-0 xs:w-[300px] xs:items-center xs:justify-center`}
        >
          <Title size={`h2`} text={`Playlist Title`} />
          <div className={`relative w-full max-w-4xl`}>
            <input
              placeholder={`playlist title`}
              className={`w-full h-full mt-3 px-5 py-2 text-gray-900 dark:text-warmGray-100 bg-white border border-gray-300 resize-none rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              maxLength={40}
              {...register("title", {
                required: "title is required",
                minLength: {
                  value: 1,
                  message: "title should be at least 1 character",
                },
                maxLength: {
                  value: 40,
                  message: "title should be less than 40 characters",
                },
              })}
            />
            <span
              className={`absolute bottom-2.5 right-2 text-xs text-gray-400`}
            >
              {title.length} / 40
            </span>
          </div>
        </div>
        <div
          className={`flex flex-col items-start w-full pr-12 xs:pr-0 xs:w-[300px] xs:items-center xs:justify-center`}
        >
          <Title size={`h2`} text={`Description`} />
          <div className={`relative w-full max-w-4xl`}>
            <textarea
              placeholder={`..for playlist`}
              className={`w-full h-full min-h-[200px] mt-3 px-5 pt-2 text-gray-900 dark:text-warmGray-100 bg-white border border-gray-300 resize-none rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              maxLength={300}
              {...register("description", {
                required: "description is required",
                minLength: {
                  value: 1,
                  message: "description should be at least 1 character",
                },
                maxLength: {
                  value: 300,
                  message: "description should be less than 300 characters",
                },
              })}
            />
            <span className={`absolute bottom-4 right-2 text-xs text-gray-400`}>
              {description.length} / 300
            </span>
          </div>
        </div>
        <button
          className={`px-5 py-2 rounded-xl text-white text-lg font-medium bg-primary disabled:bg-gray-300`}
          disabled={!isPayloadValid}
          type={`submit`}
        >
          submit
        </button>
      </form>
    </section>
  );
};

export default PlaylistCreateTemplate;
