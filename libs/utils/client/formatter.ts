import { CommentAuthorInterface, UserType } from "@/libs/types/common/userType";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export const secondsFormatter = (seconds: number): string => {
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
