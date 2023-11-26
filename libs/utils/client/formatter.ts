import {
  CommentAuthorInterface,
  EditProfilePayload,
} from "@/libs/types/userType";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { emptyRegex, titleRegex } from "@/libs/utils/client/commonValues";
import {
  PlaylistCreateRequestType,
  PlaylistMoodType,
  SongType,
} from "@/libs/types/song&playlistType";
import { sanitize } from "isomorphic-dompurify";

dayjs.extend(isBetween);

export const formatSecondsToString = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsString =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
  return `${minutesString}:${secondsString}`;
};

export const formatPathName = (title: string): string => {
  return encodeURIComponent(title);
};

export const formatSongNames = (title: string): string => {
  return title
    .replace("VEVO", "")
    .replace(titleRegex, "")
    .replace(emptyRegex, "")
    .replace(" - ", " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .trim();
};

export const formatDaysAgo = (date: Date | string) => {
  const today = dayjs();
  const targetDate = dayjs(date);

  const minuteDiff = today.diff(targetDate, "minutes");

  const anHourBefore = dayjs(targetDate).set("hour", targetDate.hour() + 1);
  const aDayBefore = dayjs(targetDate).set("day", targetDate.day() + 1);
  const aWeekBefore = dayjs(targetDate).set("date", targetDate.date() + 7);
  const isBetweenAnHour = today.isBetween(targetDate, anHourBefore);
  const isBetweenADay = today.isBetween(targetDate, aDayBefore);
  const isBetweenAWeek = today.isBetween(targetDate, aWeekBefore);

  if (minuteDiff < 1) {
    return "just now";
  }

  if (isBetweenAnHour) {
    return `${minuteDiff} ${10 <= minuteDiff ? "mins" : "min"} ago`;
  }

  if (isBetweenADay) {
    return (
      dayjs(today.diff(targetDate, "hours")).format("h").toString() +
      " hours ago"
    );
  }

  if (isBetweenAWeek) {
    return (
      dayjs(today.diff(targetDate, "days")).format("d").toString() + " days ago"
    );
  }

  return dayjs(date).format("YY.MM.DD");
};

export const formatIsMutualClient = (
  author: CommentAuthorInterface,
  userId?: string | null,
  postId?: string | null,
) => {
  if (!userId) {
    return false;
  }
  if (userId === author.id || postId === userId) {
    return true;
  }

  const { followers, following } = author;

  if (!followers || !following) {
    return false;
  }
  const isMutual =
    !!followers?.some((followerUser) => {
      return !!followerUser?.follower && followerUser?.follower?.id === userId;
    }) &&
    following?.some((followingUser) => {
      return (
        !!followingUser?.following && followingUser.following.id === userId
      );
    });
  return isMutual;
};

export const formatMoodBgColor = (
  mood: PlaylistMoodType,
  isHover?: boolean,
) => {
  switch (mood) {
    case "upbeat":
      return isHover ? "hover:bg-[#FF6F00]" : "bg-[#FF6F00]";
    case "chill":
      return isHover ? "hover:bg-[#9cf440]" : "bg-[#9cf440]";
    case "relaxed":
      return isHover ? "hover:bg-[#2e70ff]" : "bg-[#2e70ff]";
    case "melancholic":
      return isHover ? "hover:bg-[#6e00d0]" : "bg-[#6e00d0]";
    default:
      return isHover ? "hover:bg-[#01FF00]" : "bg-[#01FF00]";
  }
};

export const formatMoodFontColor = (
  mood: PlaylistMoodType,
  isHover?: boolean,
) => {
  switch (mood) {
    case "upbeat":
      return isHover ? "hover:text-[#FF6F00]" : "text-[#FF6F00]";
    case "chill":
      return isHover ? "hover:text-[#9cf440]" : "text-[#9cf440]";
    case "relaxed":
      return isHover ? "hover:text-[#2e70ff]" : "text-[#2e70ff]";
    case "melancholic":
      return isHover ? "hover:text-[#6e00d0]" : "text-[#6e00d0]";
    default:
      return isHover ? "hover:text-[#01FF00]" : "text-[#01FF00]";
  }
};

export const formatInputText = (text: string) => {
  const regex = /<br\s*[\/]?>/gi;
  const tagRegex = /<[^>]*>?/gm;
  const formatted = text.trim().replace(regex, "\n").replace(tagRegex, "");

  return sanitize(formatted);
};

export const formatIsSongCustomUrlValid = (
  customUrl: string,
  availDomain: string[],
) => {
  const urlRegex =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z0-9-]+)(\/[a-zA-Z0-9-]+)?$/;
  const splitUrl = customUrl.split(".");
  const isAvailDomain =
    splitUrl.filter(
      (url) =>
        availDomain.filter((availItem) => url.includes(availItem)).length > 0,
    ).length > 0;

  return isAvailDomain && urlRegex.test(customUrl);
};

export const formatEditUserPayload = (payload: EditProfilePayload) => {
  const formatted = { ...payload } as EditProfilePayload;

  for (const key in payload) {
    if (!formatted[key as keyof EditProfilePayload]) {
      delete formatted[key as keyof EditProfilePayload];
    }
    if (key === "bio" && formatted.bio) {
      formatted[key as keyof EditProfilePayload] = formatInputText(
        formatted.bio,
      );
    }

    if (key === "nickname" && formatted.nickname) {
      formatted[key as keyof EditProfilePayload] = formatInputText(
        formatted.nickname.trim(),
      );
    }
  }
  return formatted;
};

export const formatEditPlaylistValid = (
  payload: PlaylistCreateRequestType,
  songList: SongType[],
  userId?: string,
  playlistId?: string,
) => {
  return (
    payload?.title.length > 0 &&
    payload?.description.length > 0 &&
    payload?.songs.length > 0 &&
    !!payload?.title &&
    payload?.title.length <= 40 &&
    !!payload?.description &&
    payload?.description.length < 100 &&
    !!payload?.songs &&
    payload?.songs.length > 0 &&
    payload?.songs.length <= 20 &&
    songList.length > 0 &&
    !!userId &&
    !!playlistId
  );
};
