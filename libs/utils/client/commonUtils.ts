import dayjs, { Dayjs, QUnitType } from "dayjs";
import {
  PlaylistMoodType,
  PlaylistType,
} from "@/libs/types/common/Song&PlaylistType";
import { playlistDefault } from "@/libs/utils/client/commonValues";

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
  playlistArr?: PlaylistType[][],
) => {
  if (!playlistArr) return [];
  const moodPlaylists = playlistArr.filter((playlist) => {
    return (
      playlist.filter((playlist) => playlist.mood.name === moodType).length > 0
    );
  });
  return moodPlaylists.flat();
};

export const filterCategoryPlaylist = (
  category: string,
  playlistArr?: PlaylistType[],
) => {
  console.log("playlistArr: ", playlistArr);
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
