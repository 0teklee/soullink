"use client";

import React, { useEffect, useState } from "react";
import Title from "@/components/common/module/Title";
import Image from "next/image";
import SongTable from "@/components/common/song/table/SongTable";
import {
  PlaylistCreateRequestType,
  PlaylistMoodType,
  SongType,
} from "@/libs/types/song&playlistType";
import PlaylistCreateSubmit from "@/components/playlist/create/PlaylistCreateSubmit";
import { useSession } from "next-auth/react";
import { UserSessionType } from "@/libs/types/userType";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { getSingleUserProfile } from "@/libs/utils/client/fetchers";
import { useQuery } from "@tanstack/react-query";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { commonMoods } from "@/libs/utils/client/commonValues";
import { handleImageUpload } from "@/libs/utils/client/commonUtils";
import { formatMoodBgColor } from "@/libs/utils/client/formatter";
import { SongModalPropsState } from "@/libs/recoil/modalAtoms";
import useSetModal from "@/libs/utils/hooks/useSetModal";
import { MODAL_TYPE } from "@/libs/types/modalType";

const PlaylistCreateTemplate = () => {
  const { data: session } = useSession() as { data: UserSessionType };
  const userId = session?.userId;

  const router = useRouter();

  const [songList, setSongList] = useState<SongType[]>([]);
  const [payload, setPayload] = useState<PlaylistCreateRequestType>({
    title: "",
    description: "",
    coverImage: "",
    songs: songList,
    categories: [],
    mood: "" as PlaylistMoodType,
  });
  const [isMaxSongList, setIsMaxSongList] = useState(false);
  const [isMoodDropdownOpen, setIsMoodDropdownOpen] = useState(false);
  const [categoryInput, setCategoryInput] = useState("");

  const [songModalState, setSongModalProps] =
    useRecoilState(SongModalPropsState);
  const { setModal } = useSetModal();

  const { title, description, songs, mood: currentMood, categories } = payload;

  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return userId ? getSingleUserProfile(userId) : null;
    },
    enabled: !!userId,
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
    !!userId;

  const handlePayloadImgUpload = (imgUrl: string) => {
    setPayload((prev) => ({
      ...prev,
      coverImage: imgUrl,
    }));
  };

  const handleCategories = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (categories?.length === 3) {
      return;
    }

    if (e.key === "Enter") {
      setPayload((prev) => ({
        ...prev,
        categories: prev?.categories
          ? [...prev.categories, categoryInput]
          : [categoryInput],
      }));
      setCategoryInput("");
    }
  };

  const handleClickCategory = () => {
    if (categories?.length === 3) {
      return;
    }

    setPayload((prev) => ({
      ...prev,
      categories: prev?.categories
        ? [...prev.categories, categoryInput]
        : [categoryInput],
    }));
    setCategoryInput("");
  };

  useEffect(() => {
    if (!songModalState?.modalSong) {
      return;
    }

    setSongList((prev) => {
      if (prev.find((song) => song.url === songModalState?.modalSong?.url)) {
        return prev;
      }
      return [...prev, songModalState?.modalSong as SongType];
    });
    setSongModalProps(null);
  }, [songModalState?.modalSong]);

  useEffect(() => {
    setPayload((prev) => ({
      ...prev,
      songs: songList,
    }));
  }, [songList]);

  useEffect(() => {
    if (session && !userId) {
      router.push("/");
      setModal(MODAL_TYPE.LOGIN);
    }
  }, [userId]);

  return (
    <section
      className={`flex flex-col items-center justify-center gap-10 xs:h-screen dark:bg-gray-600 xs:overflow-y-scroll xs:py-5 py-12 xs:pt-6 xs:pb-24`}
    >
      <Title size={`h1`} text={`Create Playlist`} />
      <div
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
              <p>{currentMood ? currentMood : `select mood`}</p>
            </div>
            {isMoodDropdownOpen && (
              <div
                className={`absolute top-full left-0 flex flex-col items-center justify-center w-full bg-white border border-gray-300 rounded-lg z-10`}
              >
                {commonMoods.map((mood) => (
                  <div
                    key={mood}
                    onClick={() => {
                      setPayload((prev) => ({
                        ...prev,
                        mood,
                      }));
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
            className={`relative flex items-center justify-center w-[300px] h-[300px] bg-gray-100 border border-gray-300 rounded-xl`}
          >
            {!payload.coverImage && (
              <Image
                src={`/image/common/plus.svg`}
                width={36}
                height={36}
                alt={`add cover`}
              />
            )}
            {payload.coverImage && (
              <Image
                className={`object-cover`}
                src={`${payload.coverImage}`}
                fill={true}
                alt={`add cover`}
              />
            )}
          </div>
        </div>
        <div className={`flex flex-col gap-2 items-center w-full max-w-xs`}>
          <Title size={`h3`} text={`Categories`} />
          {categories && categories?.length > 0 && (
            <div className={`flex  gap-2`}>
              {categories.map((category, idx) => (
                <div
                  key={`${idx}_${category}`}
                  className={`flex items-center justify-center gap-1 w-full px-2 py-1 text-gray-400 text-sm border border-gray-300 rounded-lg`}
                >
                  <p>{category}</p>
                  <button
                    onClick={() => {
                      setPayload((prev) => ({
                        ...prev,
                        categories: prev?.categories?.filter(
                          (c) => c !== category,
                        ),
                      }));
                    }}
                  >
                    <XMarkIcon className={`w-4 h-4 text-gray-300`} />
                  </button>
                </div>
              ))}
            </div>
          )}
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
                setCategoryInput(e.currentTarget.value);
              }}
            />
            <button
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
            songList={songList}
            isCreate={true}
            setSongList={setSongList}
          />
          <p
            className={`${
              isMaxSongList ? "text-pink-600" : "text-gray-300"
            } text-xs font-medium`}
          >
            *You can add up to 20 songs to the list
          </p>
          <button
            className={`flex items-center gap-1`}
            onClick={() => {
              if (songList.length >= 20) {
                setIsMaxSongList(true);
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
              onChange={(e) => {
                setPayload((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
            <span
              className={`absolute bottom-2.5 right-2 text-xs text-gray-400`}
            >
              {payload.title.length} / 40
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
              onChange={(e) => {
                setPayload((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
            <span className={`absolute bottom-4 right-2 text-xs text-gray-400`}>
              {payload.description.length} / 300
            </span>
          </div>
        </div>
        <PlaylistCreateSubmit
          isPayloadValid={isPayloadValid}
          payload={payload}
          userId={userId}
        />
      </div>
    </section>
  );
};

export default PlaylistCreateTemplate;
