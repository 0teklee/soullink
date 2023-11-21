import dayjs, { Dayjs, QUnitType } from "dayjs";
import {
  PlayerProps,
  PlaylistMoodType,
  PlaylistType,
} from "@/libs/types/song&playlistType";
import { playlistDefault } from "@/libs/utils/client/commonValues";
import { fetcherImagePost } from "@/libs/utils/client/fetchers";
import React, { RefObject } from "react";
import { SetterOrUpdater } from "recoil";
import { PlayerType } from "@/libs/types/playerType";

export const isNowMoreThanTargetTime = (
  startedAt: Dayjs | null | Date,
  targetTime: number,
  unit: QUnitType = "seconds",
) => {
  const now = dayjs(new Date());
  const isMoreThanTargetTime =
    !!startedAt && now.diff(dayjs(startedAt), unit as QUnitType) > targetTime;
  return isMoreThanTargetTime;
};

export const setRecentPlaylistIdLocalStorage = (playlistId: string) => {
  const recentPlaylist = localStorage.getItem("recentPlaylist");
  if (!recentPlaylist) {
    localStorage.setItem("recentPlaylist", JSON.stringify([playlistId]));
    return;
  }
  const recentPlaylistsArr = JSON.parse(recentPlaylist) as Array<string>;
  localStorage.setItem(
    "recentPlaylist",
    JSON.stringify(recentPlaylistsArr.concat(playlistId)),
  );
};

export const filterMoodPlaylists = (
  moodType: PlaylistMoodType,
  playlistArr?: PlaylistType[],
) => {
  if (!playlistArr) return [];
  const moodPlaylists = playlistArr.filter((playlist) => {
    return playlist.mood.name === moodType;
  });
  return moodPlaylists;
};

export const filterCategoryPlaylist = (
  category: string,
  playlistArr?: PlaylistType[],
) => {
  if (!playlistArr) {
    return [];
  }

  if (category === "all" || category === "") {
    return playlistArr.filter((playlist) => playlist.category.length > 0);
  }
  const categoryPlaylists = playlistArr.filter((playlist) => {
    return (
      playlist.category.filter((categoryObj) => {
        return categoryObj.name === category;
      }).length > 0
    );
  });
  return categoryPlaylists;
};

export const fillEmptyPlaylist = (playlistArr?: PlaylistType[]) => {
  if (!playlistArr) {
    return Array(5).fill(playlistDefault);
  }

  if (playlistArr.length > 5) {
    return playlistArr;
  }

  const emptyPlaylist = Array(5 - playlistArr.length);
  const defaultPlaylistArr = emptyPlaylist.fill(playlistDefault);

  return playlistArr.concat(defaultPlaylistArr as PlaylistType[]);
};

const ImageUploadPost = async (data: FormData) => {
  const cloudName = process.env.NEXT_IMAGE_CLOUD_NAME;
  return fetcherImagePost(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    data,
  );
};

export const handleImageUpload = (callback: (imageVal: string) => void) => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.onchange = async () => {
    if (!input.files) return;
    const file = input.files[0];
    const formData = new FormData();

    if (file.size > 1024 * 1024) {
      alert("file size cannot exceed 1mb");
      return;
    }

    if (/^image\//.test(file.type)) {
      formData.append("file", file);
      formData.append("upload_preset", "soullink_user");

      const res = await ImageUploadPost(formData).then((res) => {
        return res.url;
      });
      callback(res);
    } else {
      alert("Image Upload Error");
      return null;
    }
  };
};

export const handlePlayerKeyPress = (
  e: React.KeyboardEvent<Document> | KeyboardEvent,
  targetRef: RefObject<PlayerProps>,
  setState?: SetterOrUpdater<PlayerType>,
) => {
  if (!setState) {
    return;
  }

  if (
    e.target instanceof Element &&
    (e?.target?.tagName === "INPUT" || e?.target?.tagName === "TEXTAREA")
  ) {
    return;
  }

  switch (e.key) {
    case " ":
      e.preventDefault();
      setState((prev) => ({ ...prev, playing: !prev.playing }));
      break;
    case "ArrowLeft":
      e.preventDefault();
      targetRef?.current?.seekTo(targetRef?.current?.getCurrentTime() - 3);
      break;
    case "ArrowRight":
      e.preventDefault();
      targetRef?.current?.seekTo(targetRef?.current?.getCurrentTime() + 3);
      break;
    case "ArrowUp":
      e.preventDefault();
      setState((prev) => ({ ...prev, volume: prev.volume + 0.1 }));
      break;
    case "ArrowDown":
      e.preventDefault();
      setState((prev) => ({ ...prev, volume: prev.volume - 0.1 }));
      break;
  }
};
