import { PlaylistMoodType } from "@/libs/types/common/Song&PlaylistType";

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
