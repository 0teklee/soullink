"use client";
import { useEffect } from "react";

const UseCustomizeStyle = (backgroundColor?: string, color?: string) => {
  useEffect(() => {
    if (backgroundColor) {
      document?.body
        ?.querySelector("main")
        ?.style.setProperty("background-color", backgroundColor, "important");
    }
    if (color) {
      document?.body
        ?.querySelector("main")
        ?.style.setProperty("color", color, "important");
    }

    return () => {
      document?.body
        ?.querySelector("main")
        ?.style.setProperty("background-color", "");

      document?.body?.querySelector("main")?.style.setProperty("color", "");
    };
  }, []);
  return;
};

export default UseCustomizeStyle;
