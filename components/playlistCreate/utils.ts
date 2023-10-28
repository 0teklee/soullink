export const formatMoodColor = (mood: string, isHover?: boolean) => {
  switch (mood) {
    case "energetic":
      return isHover ? "hover:bg-[#ff3b29]" : "bg-[#ff3b29]";
    case "upbeat":
      return isHover ? "hover:bg-[#FF6F00]" : "bg-[#FF6F00]";
    case "chill":
      return isHover ? "hover:bg-[#9cf440]" : "bg-[#9cf440]";
    case "relaxed":
      return isHover ? "hover:bg-[#2e70ff]" : "bg-[#2e70ff]";
    case "melancholic":
      return isHover ? "hover:bg-[#6e00d0]" : "bg-[#6e00d0]";
    case "dark":
      return isHover ? "hover:bg-[#0e0a18]" : "bg-[#0e0a18]";
    default:
      return isHover ? "hover:bg-[#01FF00]" : "bg-[#01FF00]";
  }
};
